#!/usr/bin/env python3
"""Capture and verify the Royal Immersion experience in a real Chromium browser.

Install using `python -m pip install playwright`, then run
`python -m playwright install chromium`. Start the application in Preview
mode, then set the server URL and output directory on the command line.
The booking walkthrough stops before submission.
"""

import argparse
import json
import os
import re
import shutil
import time
from collections import Counter
from datetime import datetime, timedelta
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
from zoneinfo import ZoneInfo

from playwright.sync_api import Error, TimeoutError, sync_playwright

RIYADH = ZoneInfo("Asia/Riyadh")
LOCALES = ("ar", "en", "ms", "id", "ur", "fr", "es", "de", "tr", "hi")
VIEWPORTS = ((375, 844), (390, 844), (430, 932), (768, 1024), (1024, 768), (1440, 900))
MEDIA = "#fusion-top video, main video[poster]"
PERFORMANCE_OBSERVER = """
(() => {
  window.__royalTiming = { lcp: null, cls: 0, longTasks: 0, maxLongTask: 0 };
  const observe = (type, callback) => {
    if (PerformanceObserver.supportedEntryTypes.includes(type)) {
      new PerformanceObserver((list) => list.getEntries().forEach(callback)).observe({ type, buffered: true });
    }
  };
  observe('largest-contentful-paint', (entry) => {
    window.__royalTiming.lcp = { ms: Math.round(entry.startTime), tag: entry.element?.tagName };
  });
  observe('layout-shift', (entry) => {
    if (!entry.hadRecentInput) window.__royalTiming.cls += entry.value;
  });
  observe('longtask', (entry) => {
    window.__royalTiming.longTasks += 1;
    window.__royalTiming.maxLongTask = Math.max(window.__royalTiming.maxLongTask, Math.round(entry.duration));
  });
})();
"""
PAGE_STATE = """
() => {
  const hero = document.getElementById('fusion-top') || document.querySelector('main video')?.closest('section');
  const booking = document.getElementById('fusion-book');
  const viewWidth = document.documentElement.clientWidth;
  const overflow = document.documentElement.scrollWidth - viewWidth;
  const box = (el) => el ? Math.round(el.getBoundingClientRect().height) : null;
  return {
    lang: document.documentElement.lang,
    direction: document.documentElement.dir || getComputedStyle(document.documentElement).direction,
    heading: document.querySelector('main h1, h1')?.textContent.trim(),
    title: document.title,
    h1Count: document.querySelectorAll('h1').length,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    alternates: Object.fromEntries(Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]'), (el) => [el.hreflang, el.href])),
    structuredDataTypes: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap((el) => {
      try {
        const data = JSON.parse(el.textContent);
        return (data['@graph'] || [data]).flatMap((item) => item['@type'] || []);
      } catch {
        return ['INVALID_JSON_LD'];
      }
    }),
    robots: document.querySelector('meta[name="robots"]')?.content,
    redesigned: Boolean(document.querySelector('[data-signature-fusion], [data-royal-immersion]')),
    viewportWidth: viewWidth,
    overflowPx: overflow,
    overflowingElements: overflow <= 1 ? [] : Array.from(document.querySelectorAll('main *')).filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.right > viewWidth + 2 && getComputedStyle(el).position !== 'fixed';
    }).slice(0, 8).map((el) => el.tagName + (typeof el.className === 'string' ? ' ' + el.className : '')),
    documentHeight: document.documentElement.scrollHeight,
    heroHeight: box(hero),
    heroHeadingColor: hero?.querySelector('h1') ? getComputedStyle(hero.querySelector('h1')).color : null,
    bookingTop: booking ? Math.round(booking.getBoundingClientRect().top + window.scrollY) : null,
    headings: Array.from(document.querySelectorAll('main h2')).map((el) => el.textContent.trim()),
    brokenImages: Array.from(document.images).filter((el) => el.complete && el.currentSrc && !el.naturalWidth)
      .map((el) => new URL(el.currentSrc).pathname),
  };
}
"""
VIDEO_STATE = """
(video) => ({
  source: video.currentSrc ? new URL(video.currentSrc).pathname : null,
  poster: video.poster ? new URL(video.poster).pathname : null,
  ready: video.readyState,
  playing: !video.paused && video.currentTime > 0,
  muted: video.muted,
  inline: video.playsInline,
  mediaSize: [video.videoWidth, video.videoHeight],
  frameSize: [Math.round(video.getBoundingClientRect().width), Math.round(video.getBoundingClientRect().height)],
  objectPosition: getComputedStyle(video).objectPosition,
  error: video.error?.code,
})
"""
PERFORMANCE_STATE = """
() => {
  const entry = performance.getEntriesByType('navigation')[0];
  const toMs = (value) => Number.isFinite(value) ? Math.round(value) : null;
  const resources = performance.getEntriesByType('resource');
  const raw = window.__royalTiming;
  return {
    ttfb: toMs(entry?.responseStart),
    domContentLoaded: toMs(entry?.domContentLoadedEventEnd),
    load: toMs(entry?.loadEventEnd),
    fcp: toMs(performance.getEntriesByName('first-contentful-paint')[0]?.startTime),
    lcp: raw?.lcp,
    clsObserved: Number(raw?.cls.toFixed(4)),
    longTasks: raw?.longTasks,
    longestTask: raw?.maxLongTask,
    declaredTransferredBytes: resources.reduce((sum, resource) => sum + resource.transferSize, 0),
    resourceCount: resources.length,
  };
}
"""


def open_page(context, base_url, path, diagnostics):
    page = context.new_page()
    origins = {urlsplit(base_url).netloc}
    page.on("pageerror", lambda error: diagnostics["pageErrors"].append(str(error)))
    page.on("console", lambda message: diagnostics["console"].append(
        {"type": message.type, "message": message.text[:720], "source": message.location.get("url", "")}
    ) if message.type in ("warning", "error") else None)
    page.on("response", lambda response: diagnostics["httpErrors"].append(
        {"status": response.status, "path": urlsplit(response.url).path, "type": response.request.resource_type}
    ) if response.status >= 400 and urlsplit(response.url).netloc in origins else None)
    page.on("requestfailed", lambda request: diagnostics["requestFailures"].append(
        {"path": urlsplit(request.url).path, "type": request.resource_type, "reason": request.failure}
    ) if urlsplit(request.url).netloc in origins and request.failure != "net::ERR_ABORTED" else None)
    response = page.goto(base_url + path, wait_until="domcontentloaded", timeout=90_000)
    return page, response


def make_context(browser, width, height, output=None, reduced_motion="no-preference", diagnostics=None):
    small_touch_device = width < 500
    viewport = {"width": width, "height": height}
    options = {
        "viewport": viewport, "device_scale_factor": 1, "is_mobile": small_touch_device,
        "has_touch": small_touch_device, "reduced_motion": reduced_motion, "timezone_id": "Asia/Riyadh",
        "bypass_csp": os.environ.get("ROYAL_QA_DEV_BYPASS_CSP") == "1",
    }
    if output:
        options["record_video_dir"] = str(output / ".recording")
        options["record_video_size"] = viewport
    context = browser.new_context(**options)
    context.add_init_script(PERFORMANCE_OBSERVER)
    if diagnostics is not None:
        context.route("**/api/**", lambda route: guard_api_write(route, diagnostics))
    return context


def guard_api_write(route, diagnostics):
    path = urlsplit(route.request.url).path
    is_read_only_fare = route.request.method == "POST" and path == "/api/bookings/quote"
    if route.request.method not in ("GET", "HEAD", "OPTIONS") and not is_read_only_fare:
        diagnostics["blockedWrites"].append({"method": route.request.method, "path": path})
        route.abort()
        return
    route.continue_()


def empty_diagnostics():
    return {name: [] for name in ("pageErrors", "console", "httpErrors", "requestFailures", "blockedWrites")}


def load_home(page):
    page.locator("h1").first.wait_for(state="visible", timeout=20_000)
    page.evaluate("document.fonts.ready")
    video = page.locator(MEDIA).first
    if video.count() and not page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches"):
        try:
            page.wait_for_function(
                "selector => document.querySelector(selector)?.readyState >= 2",
                arg=MEDIA, timeout=4_500,
            )
        except TimeoutError:
            pass
    page.wait_for_timeout(600)


def record_step(result, name, operation):
    try:
        result[name] = operation()
    except (Error, AssertionError) as error:
        result[name] = {"error": str(error).splitlines()[0]}


def test_film(page):
    film = page.locator("[data-royal-hero-film]")
    if not film.count():
        return {"controlPresent": False}
    video = film.locator("video")
    control = film.get_by_role("button")
    scene = video.evaluate(VIDEO_STATE)
    was_paused = video.evaluate("node => node.paused")
    control.click(timeout=6000)
    page.wait_for_function(
        "paused => document.querySelector('[data-royal-hero-film] video').paused !== paused",
        arg=was_paused, timeout=6000,
    )
    control.click(timeout=6000)
    page.wait_for_function(
        "paused => document.querySelector('[data-royal-hero-film] video').paused === paused",
        arg=was_paused, timeout=6000,
    )
    return {"controlPresent": True, "startedPlaying": not was_paused, "source": scene["source"],
            "toggleRestored": True}


def test_story(page):
    story = page.locator("#fusion-story")
    photo = story.locator("img").first
    chapter = story.locator("button[aria-pressed]").nth(1)
    initial = photo.get_attribute("src")
    chapter.click(timeout=6000)
    changed = photo.get_attribute("src")
    assert changed != initial and chapter.get_attribute("aria-pressed") == "true", "The arrival story did not advance"
    return {"chapter": chapter.locator("strong").inner_text(), "selected": True}


def test_fleet(page, locale):
    fleet = page.locator("#fusion-fleet, [data-royal-fleet]").first
    fleet.scroll_into_view_if_needed()
    vehicle = fleet.get_by_role("button", name="تويوتا كامري" if locale == "ar" else "Toyota Camry", exact=False).first
    vehicle.click()
    image = fleet.locator("img").first
    exterior = image.get_attribute("alt")
    interior = fleet.get_by_role("button", name=re.compile("المقصورة|Interior", re.I)).last
    interior.click()
    selected = interior.get_attribute("aria-pressed") == "true"
    assert selected, "Interior toggle did not become selected"
    assert exterior != image.get_attribute("alt"), "The fleet image did not change"
    return {"vehicle": vehicle.inner_text(), "exterior": exterior, "interior": image.get_attribute("alt")}


def test_faq(page):
    toggle = page.locator("#royal-faq button[aria-expanded], [aria-labelledby='royal-faq-title'] button[aria-expanded]").first
    toggle.scroll_into_view_if_needed()
    initial = toggle.get_attribute("aria-expanded")
    toggle.press("Enter")
    opened = toggle.get_attribute("aria-expanded")
    toggle.press("Space")
    closed = toggle.get_attribute("aria-expanded")
    assert initial != opened and initial == closed, "FAQ failed keyboard toggle"
    return {"question": toggle.inner_text(), "ariaExpanded": [initial, opened, closed]}


def test_route(page):
    routes = page.locator("#fusion-routes, [data-royal-routes]").first
    routes.scroll_into_view_if_needed()
    madinah = routes.get_by_role("button", name=re.compile("Makkah.*Madinah|مكة.*المدينة", re.I))
    if not madinah.count():
        madinah = routes.locator("button[aria-pressed]").nth(1)
    photo = routes.locator("img").first
    initial = photo.get_attribute("src")
    madinah.first.click()
    changed = photo.get_attribute("src")
    assert initial != changed, "Changing route did not update the route photo"
    return {"initial": initial, "changed": changed, "selected": madinah.first.get_attribute("aria-pressed"),
            "label": madinah.first.inner_text()}


def test_booking(page, base_url, airport=False):
    book = page.locator("#fusion-book, [data-royal-booking]").first
    book.scroll_into_view_if_needed()
    fields = book.locator("select")
    pickup, destination, guests = fields.nth(0), fields.nth(1), fields.nth(2)
    pickup_key = "jed-airport" if airport else "makkah"
    pickup.select_option(pickup_key, timeout=5000)
    offered = destination.locator("option").evaluate_all("nodes => nodes.map(node => node.value)")
    preferred_route = "jeddah-airport-to-makkah" if airport else "makkah-to-taif"
    expected_route = preferred_route if preferred_route in offered else offered[0]
    destination.select_option(expected_route, timeout=5000)
    guests.select_option("2")
    date = (datetime.now(RIYADH).date() + timedelta(days=8)).isoformat()
    book.locator("input[type='date']").fill(date)
    book.locator("input[type='time']").fill("12:30")
    camry = book.get_by_role("button", name=re.compile("Toyota Camry|تويوتا كامري", re.I)).first
    has_camry = camry.count() > 0 and camry.is_enabled()
    if has_camry:
        camry.click()
    button = book.locator("button").last
    fare = book.locator("strong").last.inner_text()
    if not button.is_enabled():
        return {"route": expected_route, "fare": fare, "buttonEnabled": False, "camryAvailable": has_camry,
                "note": "Browser had no eligible fare, so no booking handoff was attempted."}
    button.click()
    page.wait_for_url("**/booking?**", timeout=45_000)
    query = parse_qs(urlsplit(page.url).query)
    wizard = page.locator(".duyuf-booking-wizard, [data-booking-wizard]").first
    wizard.wait_for(state="visible", timeout=15_000)
    assert query.get("route") == [expected_route], "Booking route was not passed through"
    assert query.get("passengers") == ["2"], "Passenger count was not passed through"
    assert query.get("date") == [date] and query.get("time") == ["12:30"], "Date or time was not passed through"
    if has_camry:
        assert query.get("vehicle") == ["toyota-camry"], "Vehicle was not passed through"
    return {"route": expected_route, "fare": fare, "buttonEnabled": True, "camryAvailable": has_camry,
            "path": page.url.removeprefix(base_url), "query": query, "wizardVisible": True}


def test_booking_steps(page, locale, airport):
    wizard = page.locator(".duyuf-booking-wizard")
    for pattern in (
        "Continue to Select Vehicle|المتابعة لاختيار السيارة",
        "Continue to Passenger Details|المتابعة لبيانات الراكب",
    ):
        wizard.get_by_role("button", name=re.compile(pattern, re.I)).first.click(timeout=8000)
    schedule = wizard.locator("#pickup-date-input")
    schedule.wait_for(state="visible", timeout=8000)
    flight = wizard.locator("#flight-input")
    visible = flight.count() > 0 and flight.is_visible()
    assert visible == airport, "Flight details appear on the wrong booking type"
    result = {"schedulePrefill": {
        "date": schedule.input_value(),
        "time": wizard.locator("#pickup-time-input").input_value(),
    }, "flightFieldsVisible": visible}

    if airport:
        fieldset = flight.locator("xpath=ancestor::fieldset").first
        airport_display = fieldset.locator("bdi").first.inner_text()
        assert "JED" in airport_display, "The airport was not derived from the pickup"
        fieldset.locator("input").first.fill("Saudia")
        flight.fill("sv 124")
        assert flight.input_value() == "SV 124", "Flight number did not preserve its normalized value"
        fieldset.locator("input[type=date]").fill(schedule.input_value())
        fieldset.locator("input[type=time]").fill("11:30")
        result["airport"] = airport_display
        result["flightNumber"] = flight.input_value()

    next_step = re.compile("Confirm Booking Request|تأكيد طلب الحجز", re.I)
    quote_responses = []

    def track_quote(response):
        if urlsplit(response.url).path == "/api/bookings/quote":
            quote_responses.append(response)

    page.on("response", track_quote)
    wizard.get_by_role("button", name=next_step).first.click(timeout=8000)
    wizard.locator("#customer-name-input").wait_for(state="visible", timeout=8000)
    for _ in range(30):
        if quote_responses:
            break
        page.wait_for_timeout(200)
    page.remove_listener("response", track_quote)
    if quote_responses:
        fare = quote_responses[-1]
        quote = fare.json()
        result["authoritativeFare"] = {"http": fare.status, "success": quote.get("success"),
                                       "sar": quote.get("finalPriceSAR")}
    else:
        result["authoritativeFare"] = {"http": None, "note": "No quote response observed within six seconds"}
    result["guestFields"] = {
        name: wizard.locator("#" + selector).count() > 0 for name, selector in {
            "name": "customer-name-input", "phone": "customer-phone-input", "countryCode": "phone-country-select",
            "email": "customer-email-input", "notes": "customer-notes-input",
        }.items()
    }
    assert all(result["guestFields"].values()), "The guest details form is incomplete"
    return result


def test_mobile_menu(page):
    header = page.locator("header").first
    options = header.locator('button[aria-controls="mobile-nav-fullscreen"]')
    if not options.count():
        options = header.get_by_role("button", name=re.compile("Open.*Menu|فتح.*القائمة", re.I))
    if not options.count():
        options = header.locator('button[aria-expanded="false"]').last
    opener = options.first
    label = opener.get_attribute("aria-label", timeout=6000)
    control_id = opener.get_attribute("aria-controls")
    opener.click(timeout=6000)
    if control_id:
        page.locator("#" + control_id).wait_for(state="visible", timeout=6000)
    open_state = opener.get_attribute("aria-expanded", timeout=6000)
    page.wait_for_timeout(500)
    page.keyboard.press("Escape")
    if control_id:
        page.locator("#" + control_id).wait_for(state="hidden", timeout=6000)
    page.wait_for_timeout(400)
    closed_state = opener.get_attribute("aria-expanded", timeout=6000)
    assert (open_state, closed_state) == ("true", "false"), "Mobile menu did not open and close correctly"
    return {"ariaExpanded": [open_state, closed_state], "menuButton": label}


def scan_page(page):
    before = page.evaluate(PAGE_STATE)
    video = page.locator(MEDIA).first
    if video.count():
        before["video"] = video.evaluate(VIDEO_STATE)
    return before


def visit_home(browser, base_url, width, height, locale, home_cache, reduced_motion="no-preference"):
    key = (width, height, locale, reduced_motion)
    if key in home_cache:
        return home_cache[key]
    diagnostics = empty_diagnostics()
    context = make_context(browser, width, height, reduced_motion=reduced_motion)
    try:
        page, response = open_page(context, base_url, "/" + locale, diagnostics)
        load_home(page)
        summary = scan_page(page)
        summary.update({"status": response.status if response else None,
                        "xRobotsTag": response.headers.get("x-robots-tag") if response else None,
                        "labTiming": page.evaluate(PERFORMANCE_STATE),
                        "diagnostics": diagnostics})
        home_cache[key] = summary
        return summary
    finally:
        context.close()


def scroll_over_home(page):
    viewport_height = page.viewport_size["height"]
    max_y = page.evaluate("document.documentElement.scrollHeight")
    for y in range(0, max_y, round(viewport_height * 0.78)):
        page.evaluate("y => window.scrollTo({ top: y, behavior: 'instant' })", y)
        page.wait_for_timeout(45)
    try:
        page.wait_for_function(
            "Array.from(document.images).every(image => image.complete || !image.currentSrc)",
            timeout=4500,
        )
    except TimeoutError:
        pass
    page.evaluate("window.scrollTo({ top: 0, behavior: 'instant' })")
    page.wait_for_timeout(600)


def timed_section(page, selector, delay=750):
    section = page.locator(selector).first
    if section.count():
        section.evaluate("node => node.scrollIntoView({ behavior: 'smooth', block: 'start' })")
        page.wait_for_timeout(delay)


def capture_journey(browser, base_url, output, width, height, mobile, quick, locale):
    name = "mobile" if mobile else "desktop"
    diagnostics = empty_diagnostics()
    context = make_context(browser, width, height, output=output if not quick else None, diagnostics=diagnostics)
    page = None
    result = {"viewport": [width, height], "locale": locale, "diagnostics": diagnostics}

    try:
        page, response = open_page(context, base_url, "/" + locale, diagnostics)
        load_home(page)
        result["homeStatus"] = response.status if response else None
        record_step(result, "heroFilm", lambda: test_film(page))
        if mobile:
            record_step(result, "mobileMenu", lambda: test_mobile_menu(page))
        if not quick:
            page.screenshot(path=output / f"{name}-hero.jpg", type="jpeg", quality=88, timeout=40_000)
            scroll_over_home(page)
            page.screenshot(path=output / f"{name}-full-page.jpg", type="jpeg", quality=83, full_page=True,
                            timeout=60_000)
        timed_section(page, "#fusion-book")
        timed_section(page, "#fusion-story")
        record_step(result, "arrivalStory", lambda: test_story(page))
        if not quick:
            timed_section(page, "#fusion-routes")
        record_step(result, "routeExplorer", lambda: test_route(page))
        record_step(result, "fleetSelector", lambda: test_fleet(page, locale))
        if not quick and not mobile:
            fleet = page.locator("#fusion-fleet, [data-royal-fleet]").first
            if fleet.count():
                exterior = fleet.get_by_role("button", name=re.compile("Exterior|الخارج", re.I)).last
                if exterior.count():
                    exterior.click(timeout=6000)
                fleet.screenshot(path=output / "fleet.jpg", type="jpeg", quality=89, timeout=45_000)
        record_step(result, "faqKeyboard", lambda: test_faq(page))
        if not quick:
            timed_section(page, "footer")
            timed_section(page, "#fusion-book")
        record_step(result, "bookingHandoff", lambda: test_booking(page, base_url, airport=mobile))
        if result["bookingHandoff"].get("wizardVisible"):
            if not quick and not mobile:
                page.locator(".duyuf-booking-wizard").evaluate(
                    "node => window.scrollTo({top: window.scrollY + node.getBoundingClientRect().top - 110, behavior: 'instant'})"
                )
                page.wait_for_timeout(450)
                page.screenshot(path=output / "booking.jpg", type="jpeg", quality=88, timeout=40_000)
            record_step(result, "bookingWizard", lambda: test_booking_steps(page, locale, mobile))
        if not quick:
            page.wait_for_timeout(800)
        return result
    finally:
        video = page.video if page else None
        context.close()
        if video:
            video.save_as(output / f"{name}-walkthrough.webm")


def retrieve_endpoints(browser, base_url):
    paths = (
        "/robots.txt", "/sitemap.xml", "/api/reviews", "/en/fleet", "/en/fleet/toyota-camry",
        "/en/routes", "/en/routes/jeddah-airport-to-makkah", "/en/services", "/en/ziyarat",
        "/en/pricing", "/en/about", "/en/reviews", "/en/guides", "/en/blog", "/en/booking",
        "/en/faq", "/en/contact", "/en/cancellation", "/en/terms", "/en/privacy",
        "/fr/flotte", "/ur/booking", "/tr/guzergahlar",
    )
    results = {}
    context = browser.new_context()
    request = context.request
    for path in paths:
        try:
            response = request.get(base_url + path, timeout=30_000)
        except Error as error:
            results[path] = {"error": str(error).splitlines()[0]}
            continue
        row = {"status": response.status, "finalPath": urlsplit(response.url).path}
        if path == "/robots.txt":
            row["indexRules"] = [line for line in response.text().splitlines()
                                 if line.startswith(("Disallow:", "Allow:", "Sitemap:"))]
        if path == "/sitemap.xml":
            body = response.text()
            row["xmlLocations"] = body.count("<loc>")
            row["officialDomain"] = "duyufalrahmanvip.com" in body
        if path == "/api/reviews" and response.ok:
            body = response.json()
            row["success"] = body.get("success")
            reviews = body.get("reviews") or body.get("data")
            if isinstance(reviews, list):
                row["returnedPublishedReviews"] = len(reviews)
        results[path] = row
    context.close()
    return results


def safe_check(operation):
    try:
        return operation()
    except (Error, AssertionError) as error:
        return {"error": str(error).splitlines()[0]}


def diagnostics_summary(data):
    counters = Counter()
    for section in data:
        for kind, values in section.get("diagnostics", {}).items():
            counters[kind] += len(values)
    return dict(counters)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://localhost:3122")
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--quick", action="store_true", help="Skip evidence capture and non-homepage route checks")
    parser.add_argument("--journeys-only", action="store_true", help="Skip repeated viewport, locale and endpoint checks")
    parser.add_argument("--dev-bypass-csp", action="store_true", help="Diagnose Next development eval failures locally")
    parser.add_argument("--port-ready-timeout", type=int, default=75)
    args = parser.parse_args()
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    browser_cache = Path(__file__).parent / "playwright-browsers"
    if not args.quick and browser_cache.is_dir():
        os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", str(browser_cache))
    base_url = args.url.rstrip("/")
    if args.dev_bypass_csp:
        if urlsplit(base_url).hostname not in ("localhost", "127.0.0.1"):
            parser.error("--dev-bypass-csp is only available on localhost")
        os.environ["ROYAL_QA_DEV_BYPASS_CSP"] = "1"
    now = datetime.now(RIYADH)
    result = {"baseUrl": base_url, "timeRiyadh": now.isoformat(), "labOnly": True,
              "browserEngine": "Chromium", "realBookingSubmissions": 0, "devCspOverride": args.dev_bypass_csp}

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=shutil.which("chromium"), args=["--no-sandbox"])
        result["browserVersion"] = browser.version

        probe = playwright.request.new_context()
        deadline = time.monotonic() + args.port_ready_timeout
        while True:
            try:
                response = probe.get(base_url + "/en", timeout=25_000)
                if response.status != 503:
                    if urlsplit(response.url).netloc != urlsplit(base_url).netloc:
                        raise RuntimeError(f"Site redirected to another origin: {urlsplit(response.url).netloc}")
                    break
            except Error:
                if time.monotonic() >= deadline:
                    raise
            if time.monotonic() >= deadline:
                raise RuntimeError(f"Site did not become available at {base_url}")
            time.sleep(1.5)
        probe.dispose()

        cache = {}
        result["responsive"] = {}
        result["locales"] = {}
        result["reducedMotion"] = {}
        if not args.journeys_only:
            result["responsive"] = {str(width): safe_check(
                lambda: visit_home(browser, base_url, width, height, "ar", cache)
            ) for width, height in VIEWPORTS}
            result["locales"] = {locale: safe_check(
                lambda: visit_home(browser, base_url, 390, 844, locale, cache)
            ) for locale in LOCALES}
            result["reducedMotion"] = safe_check(
                lambda: visit_home(browser, base_url, 390, 844, "ar", cache, "reduce")
            )
        result["journeys"] = {
            "desktop": safe_check(lambda: capture_journey(browser, base_url, output, 1440, 900, False, args.quick, "en")),
            "mobile": safe_check(lambda: capture_journey(browser, base_url, output, 390, 844, True, args.quick, "ar")),
        }
        if not args.quick and not args.journeys_only:
            result["endpoints"] = retrieve_endpoints(browser, base_url)
        result["observations"] = diagnostics_summary([
            *result["responsive"].values(), *[entry for locale, entry in result["locales"].items() if locale != "ar"],
            result["reducedMotion"], *result["journeys"].values(),
        ])
        browser.close()

    (output / "browser-qa.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if (output / ".recording").exists():
        shutil.rmtree(output / ".recording")
    clear = {width: page.get("overflowPx") for width, page in result["responsive"].items()}
    print(json.dumps({"output": str(output), "observations": result["observations"], "overflowPx": clear,
                      "journeys": {k: {a: b for a, b in v.items() if a != "diagnostics"} for k, v in result["journeys"].items()}},
                     ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
