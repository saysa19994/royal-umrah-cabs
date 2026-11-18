import fs from 'fs';

const path = 'd:/royal-umrah-cabs/src/components/home/SaudiHospitalityHomepage.tsx';
let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

// 1. Update Booking Form State & add reviews state
const oldStateTarget = `  // Booking Form State
  const [pickup, setPickup] = useState('jeddah_airport_t1');
  const [destination, setDestination] = useState('makkah_hotel');
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('14:00');
  const [passengers, setPassengers] = useState('4');`;

const newStateReplacement = `  // Booking Form State - Clean unselected placeholders
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [passengers, setPassengers] = useState('');

  // Real Customer Reviews State
  const [customerReviews, setCustomerReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Fetch approved published reviews from the customer reviews system
  useEffect(() => {
    fetch('/api/reviews?limit=3&sort=newest')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.reviews)) {
          setCustomerReviews(data.reviews);
        }
      })
      .catch(() => {})
      .finally(() => setReviewsLoading(false));
  }, []);`;

if (content.includes(oldStateTarget)) {
  content = content.replace(oldStateTarget, newStateReplacement);
} else {
  console.error('Could not find oldStateTarget in SaudiHospitalityHomepage.tsx');
  process.exit(1);
}

// 2. Update handleBookingSubmit to validate empty inputs
const oldSubmitHandler = `  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pickup === destination) {
      setToastMessage(
        isAr
          ? 'يرجى اختيار وجهة مختلفة عن نقطة الانطلاق للمتابعة.'
          : 'Please select two different pickup and destination locations.'
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return;
    }

    // Connect to full booking flow with query parameters
    const query = new URLSearchParams({
      pickup,
      destination,
      date: travelDate,
      time: pickupTime,
      passengers,
    });

    router.push(\`/\${locale}/booking?\${query.toString()}\`);
  };`;

const newSubmitHandler = `  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickup || !destination || !travelDate || !pickupTime || !passengers) {
      setToastMessage(
        isAr
          ? 'يرجى اختيار وتعبئة جميع تفاصيل الحجز للمتابعة.'
          : 'Please select all journey details to proceed with your booking request.'
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return;
    }

    if (pickup === destination) {
      setToastMessage(
        isAr
          ? 'يرجى اختيار وجهة مختلفة عن نقطة الانطلاق للمتابعة.'
          : 'Please select two different pickup and destination locations.'
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return;
    }

    // Connect to full booking flow with query parameters
    const query = new URLSearchParams({
      pickup,
      destination,
      date: travelDate,
      time: pickupTime,
      passengers,
    });

    router.push(\`/\${locale}/booking?\${query.toString()}\`);
  };`;

if (content.includes(oldSubmitHandler)) {
  content = content.replace(oldSubmitHandler, newSubmitHandler);
}

// 3. Update translations for submit button, placeholders, and route titles
content = content.replace(
  "submitBtn: isAr ? 'استعراض السيارات والأسعار' : 'Find vehicles & prices',",
  `submitBtn: isAr ? 'إرسال طلب الحجز' : 'Submit Booking Request',
      placeholderPickup: isAr ? 'اختر نقطة الانطلاق...' : 'Select pickup location...',
      placeholderDest: isAr ? 'اختر الوجهة المقصودة...' : 'Select destination...',
      placeholderDate: isAr ? 'اختر تاريخ السفر' : 'Select travel date',
      placeholderTime: isAr ? 'وقت الوصول / الرحلة' : 'Pickup time',
      placeholderPax: isAr ? 'اختر عدد الركاب...' : 'Select passengers...',`
);

content = content.replace(
  "r1Title: isAr ? 'مطار جدة (KAIA) ← مكة المكرمة' : 'Jeddah Airport → Makkah',",
  "r1Title: isAr ? 'من مطار جدة (KAIA) إلى مكة المكرمة' : 'From Jeddah Airport (KAIA) to Makkah',"
);

content = content.replace(
  "r2Title: isAr ? 'مكة المكرمة ← المدينة المنورة' : 'Makkah → Madinah',",
  "r2Title: isAr ? 'من مكة المكرمة إلى المدينة المنورة' : 'From Makkah to Madinah',"
);

content = content.replace(
  "r3Title: isAr ? 'مطار المدينة المنورة ← الفندق' : 'Madinah Airport → Hotel',",
  "r3Title: isAr ? 'من مطار المدينة المنورة إلى فنادق المدينة' : 'From Madinah Airport to Madinah Hotels',"
);

content = content.replace(
  "step2Title: isAr ? 'تأكيد الحجز الفوري' : 'Receive instant confirmation',",
  "step2Title: isAr ? 'مراجعة وتأكيد الحجز' : 'Review & Confirm Journey',"
);

content = content.replace(
  "step2Desc: isAr ? 'يتم تأكيد تفاصيل رحلتك وسائقك مباشرة بدون أي دفع إلكتروني مسبق أو بطاقة بنكية.' : 'Trip and driver details confirmed instantly with zero advance deposit or credit card.',",
  "step2Desc: isAr ? 'يقوم فريق العمليات بمراجعة تفاصيل رحلتكم وتأكيد الحجز وتعيين السائق الخاص بدون أي دفع مسبق أو بطاقة بنكية.' : 'Our operations team reviews your request, confirms vehicle allocation and assigns your chauffeur with zero advance payment.',"
);

// 4. Update Booking Form inputs with disabled placeholders
const oldFormTarget = `        <form className="booking-panel" id="quickBooking" onSubmit={handleBookingSubmit} noValidate>
          <div className="field">
            <label htmlFor="pickup">{t.pickupLabel}</label>
            <select
              id="pickup"
              name="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            >
              <option value="jeddah_airport_t1">{t.locJeddahAirport}</option>
              <option value="makkah_hotel">{t.locMakkahHotel}</option>
              <option value="madinah_airport">{t.locMadinahAirport}</option>
              <option value="madinah_hotel">{t.locMadinahHotel}</option>
              <option value="taif">{t.locTaif}</option>
              <option value="riyadh">{t.locRiyadh}</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="destination">{t.destLabel}</label>
            <select
              id="destination"
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option value="makkah_hotel">{t.locMakkahHotel}</option>
              <option value="madinah_hotel">{t.locMadinahHotel}</option>
              <option value="jeddah_airport_t1">{t.locJeddahAirport}</option>
              <option value="madinah_airport">{t.locMadinahAirport}</option>
              <option value="makkah_ziyarat">{t.locMakkahZiyarat}</option>
              <option value="madinah_ziyarat">{t.locMadinahZiyarat}</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="travelDate">{t.dateLabel}</label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={travelDate}
              min={minDate}
              onChange={(e) => setTravelDate(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="pickupTime">{t.timeLabel}</label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="passengers">{t.paxLabel}</label>
            <select
              id="passengers"
              name="passengers"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              required
            >
              <option value="1">{t.pax1}</option>
              <option value="4">{t.pax2}</option>
              <option value="6">{t.pax3}</option>
              <option value="8">{t.pax4}</option>
              <option value="15">{t.pax5}</option>
            </select>
          </div>`;

const newFormReplacement = `        <form className="booking-panel" id="quickBooking" onSubmit={handleBookingSubmit} noValidate>
          <div className="field">
            <label htmlFor="pickup">{t.pickupLabel}</label>
            <select
              id="pickup"
              name="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            >
              <option value="" disabled>{t.placeholderPickup}</option>
              <option value="jeddah_airport_t1">{t.locJeddahAirport}</option>
              <option value="makkah_hotel">{t.locMakkahHotel}</option>
              <option value="madinah_airport">{t.locMadinahAirport}</option>
              <option value="madinah_hotel">{t.locMadinahHotel}</option>
              <option value="taif">{t.locTaif}</option>
              <option value="riyadh">{t.locRiyadh}</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="destination">{t.destLabel}</label>
            <select
              id="destination"
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option value="" disabled>{t.placeholderDest}</option>
              <option value="makkah_hotel">{t.locMakkahHotel}</option>
              <option value="madinah_hotel">{t.locMadinahHotel}</option>
              <option value="jeddah_airport_t1">{t.locJeddahAirport}</option>
              <option value="madinah_airport">{t.locMadinahAirport}</option>
              <option value="makkah_ziyarat">{t.locMakkahZiyarat}</option>
              <option value="madinah_ziyarat">{t.locMadinahZiyarat}</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="travelDate">{t.dateLabel}</label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={travelDate}
              min={minDate}
              onChange={(e) => setTravelDate(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="pickupTime">{t.timeLabel}</label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="passengers">{t.paxLabel}</label>
            <select
              id="passengers"
              name="passengers"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              required
            >
              <option value="" disabled>{t.placeholderPax}</option>
              <option value="1">{t.pax1}</option>
              <option value="4">{t.pax2}</option>
              <option value="6">{t.pax3}</option>
              <option value="8">{t.pax4}</option>
              <option value="15">{t.pax5}</option>
            </select>
          </div>`;

if (content.includes(oldFormTarget)) {
  content = content.replace(oldFormTarget, newFormReplacement);
} else {
  console.error('Could not find oldFormTarget in SaudiHospitalityHomepage.tsx');
  process.exit(1);
}

// 5. Update Reviews Section to display actual reviews if present or clean empty state
const oldReviewsSection = `      {/* Verified Reviews Section (Zero Fabricated Data) */}
      <section className="section" id="reviews">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.reviewsEyebrow}</p>
              <h2 className="serif">{t.reviewsTitle}</h2>
            </div>
            <p className="lead">{t.reviewsLead}</p>
          </div>
          <div className="reviews-panel">
            <div>
              <span className="review-mark" aria-hidden="true">“</span>
              <h3 className="serif whitespace-pre-line">{t.reviewsHeading}</h3>
              <p>{t.reviewsDesc}</p>
            </div>
            <div className="review-source">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#A97B27]" />
                <strong className="text-base font-bold text-[#101827]">
                  {isAr ? 'نظام التحقق الصارم من التقييمات' : 'Strict Review Verification'}
                </strong>
              </div>
              <span className="text-sm leading-relaxed text-[#687386]">
                {isAr
                  ? 'جميع التقييمات المعروضة على المنصة هي آراء حقيقية تم التحقق من رقم حجزها وبيانات سائقها الفعلي. لا نعتمد التقييمات المجهولة أو الآلية.'
                  : 'All reviews on this platform are authentic and tied to completed guest booking references. We never display anonymous or synthetic ratings.'}
              </span>
              <div className="mt-4 pt-3 border-t border-[#E7E3DA]">
                <Link
                  href={\`/\${locale}/reviews\`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#A97B27] hover:text-[#101827] transition-colors"
                >
                  <span>{t.reviewsViewAll}</span>
                  <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>`;

const newReviewsSection = `      {/* Customer Reviews Section (Connected to Real Review System) */}
      <section className="section" id="reviews">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.reviewsEyebrow}</p>
              <h2 className="serif">{t.reviewsTitle}</h2>
            </div>
            <p className="lead">{t.reviewsLead}</p>
          </div>

          {customerReviews && customerReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {customerReviews.map((rev: any, idx: number) => (
                <div key={rev.id || idx} className="p-6 rounded-2xl bg-[#FBFAF7] border border-[#E7E2D9] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-3 text-[#A97B27]">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <span key={sIdx} className={sIdx < (rev.rating || 5) ? 'text-[#A97B27]' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                    <p className="text-sm text-[#101827] leading-relaxed mb-4 italic">“{rev.comment}”</p>
                  </div>
                  <div className="pt-3 border-t border-[#E7E2D9] flex items-center justify-between text-xs text-[#687386]">
                    <strong className="text-[#101827] font-semibold">{rev.customer_name}</strong>
                    <span>{rev.route || (isAr ? 'رحلة عمرة معتمدة' : 'Verified Umrah Transfer')}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="reviews-panel">
              <div>
                <span className="review-mark" aria-hidden="true">“</span>
                <h3 className="serif whitespace-pre-line">{t.reviewsHeading}</h3>
                <p>{t.reviewsDesc}</p>
              </div>
              <div className="review-source">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#A97B27]" />
                  <strong className="text-base font-bold text-[#101827]">
                    {isAr ? 'نظام المراجعات الموثقة' : 'Verified Review System'}
                  </strong>
                </div>
                <span className="text-sm leading-relaxed text-[#687386]">
                  {isAr
                    ? 'يتم نشر التقييمات حصرياً من قِبل ضيوف الرحمن الذين أتموا رحلاتهم بنجاح مع سائقينا المعتمدين. نرحب بمشاركتكم لتجربتكم المباركة معنا.'
                    : 'Reviews are exclusively published by guests who have completed their sacred journeys with our vetted chauffeurs. We welcome you to share your feedback.'}
                </span>
                <div className="mt-4 pt-3 border-t border-[#E7E3DA]">
                  <Link
                    href={\`/\${locale}/reviews\`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#A97B27] hover:text-[#101827] transition-colors"
                  >
                    <span>{t.reviewsViewAll}</span>
                    <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>`;

if (content.includes(oldReviewsSection)) {
  content = content.replace(oldReviewsSection, newReviewsSection);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated SaudiHospitalityHomepage.tsx with form placeholders, reviews, and route wording');
