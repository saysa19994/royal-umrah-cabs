import fs from 'fs';

// 1. UPDATE FloatingUI.tsx
const floatingPath = 'd:/royal-umrah-cabs/src/components/layout/FloatingUI.tsx';
let floatingContent = fs.readFileSync(floatingPath, 'utf8').replace(/\r\n/g, '\n');

const oldObserverTarget = `  // Observe if on-page booking form is currently in view
  useEffect(() => {
    const target =
      document.querySelector('#booking-card-form') ||
      document.querySelector('[data-booking-form="true"]');
    if (!target) {
      setIsBookingFormVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBookingFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);`;

const newObserverTarget = `  const [isInputFocused, setIsInputFocused] = useState(false);

  // Focus listener to hide floating buttons whenever an input is being used
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('#booking') ||
          target.closest('#quickBooking'))
      ) {
        setIsInputFocused(true);
      }
    };
    const handleFocusOut = () => {
      setIsInputFocused(false);
    };
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Observe if on-page booking form is currently in view
  useEffect(() => {
    const targets = document.querySelectorAll(
      '#booking, #quickBooking, #booking-card-form, [data-booking-form="true"]'
    );
    if (!targets.length) {
      setIsBookingFormVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setIsBookingFormVisible(anyVisible);
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);`;

if (floatingContent.includes(oldObserverTarget)) {
  floatingContent = floatingContent.replace(oldObserverTarget, newObserverTarget);
} else {
  console.error('Could not find oldObserverTarget in FloatingUI.tsx');
  process.exit(1);
}

// Update the <aside>
const oldAside = `      <aside
        aria-label="Quick Actions"
        className="fixed bottom-6 right-4 rtl:right-auto rtl:left-4 z-40 flex flex-col items-center gap-3 pointer-events-auto"
      >`;

const newAside = `      <aside
        aria-label="Quick Actions"
        style={{
          bottom: 'max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))',
        }}
        className={\`fixed right-4 rtl:right-auto rtl:left-4 z-40 flex flex-col items-center gap-3 transition-all duration-300 \${
          (isBookingFormVisible || isInputFocused)
            ? 'opacity-0 pointer-events-none translate-y-12'
            : 'opacity-100 pointer-events-auto translate-y-0'
        }\`}
      >`;

if (floatingContent.includes(oldAside)) {
  floatingContent = floatingContent.replace(oldAside, newAside);
} else {
  console.error('Could not find oldAside in FloatingUI.tsx');
  process.exit(1);
}

// Update mobile dock condition to check shouldHideFloating
floatingContent = floatingContent.replace(
  '{!(isExcludedPage || isMobileMenuOpen || isBookingFormVisible) && (',
  '{!(isExcludedPage || isMobileMenuOpen || isBookingFormVisible || isInputFocused) && ('
);

fs.writeFileSync(floatingPath, floatingContent, 'utf8');
console.log('Successfully updated FloatingUI.tsx');

// 2. UPDATE AiChatWidget.tsx
const chatPath = 'd:/royal-umrah-cabs/src/components/chat/AiChatWidget.tsx';
let chatContent = fs.readFileSync(chatPath, 'utf8').replace(/\r\n/g, '\n');

const stateAnchor = '  const [isOpen, setIsOpen] = useState(false);';
const chatStateAdditions = `  const [isOpen, setIsOpen] = useState(false);
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('#booking') ||
          target.closest('#quickBooking'))
      ) {
        setIsInputFocused(true);
      }
    };
    const handleFocusOut = () => {
      setIsInputFocused(false);
    };
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(
      '#booking, #quickBooking, #booking-card-form, [data-booking-form="true"]'
    );
    if (!targets.length) {
      setIsBookingFormVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setIsBookingFormVisible(anyVisible);
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);`;

if (chatContent.includes(stateAnchor)) {
  chatContent = chatContent.replace(stateAnchor, chatStateAdditions);
} else {
  console.error('Could not find stateAnchor in AiChatWidget.tsx');
  process.exit(1);
}

const oldChatBtn = `      {/* Floating Trigger Button - Positioned opposite to WhatsApp button to avoid overlapping */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="hidden sm:flex fixed bottom-6 left-4 rtl:left-auto rtl:right-4 z-40 h-14 px-4 rounded-full bg-gradient-to-r from-[#D9A031] via-[#E5B24E] to-[#D9A031] text-[#0D0F12] font-bold shadow-2xl border-2 border-[#E5B24E]/80 hover:scale-105 active:scale-95 transition-all items-center gap-2.5 group pointer-events-auto"
        aria-label="Open AI Chauffeur Assistant"
      >`;

const newChatBtn = `      {/* Floating Trigger Button - Positioned opposite to WhatsApp button to avoid overlapping */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          bottom: 'max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))',
        }}
        className={\`hidden sm:flex fixed left-4 rtl:left-auto rtl:right-4 z-40 h-14 px-4 rounded-full bg-gradient-to-r from-[#D9A031] via-[#E5B24E] to-[#D9A031] text-[#0D0F12] font-bold shadow-2xl border-2 border-[#E5B24E]/80 hover:scale-105 active:scale-95 transition-all items-center gap-2.5 group \${
          (isBookingFormVisible || isInputFocused)
            ? 'opacity-0 pointer-events-none translate-y-12'
            : 'opacity-100 pointer-events-auto translate-y-0'
        }\`}
        aria-label="Open AI Chauffeur Assistant"
      >`;

if (chatContent.includes(oldChatBtn)) {
  chatContent = chatContent.replace(oldChatBtn, newChatBtn);
  fs.writeFileSync(chatPath, chatContent, 'utf8');
  console.log('Successfully updated AiChatWidget.tsx');
} else {
  console.error('Could not find oldChatBtn in AiChatWidget.tsx');
  process.exit(1);
}
