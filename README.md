# Duyuf Alrahman VIP | ضيوف الرحمن VIP
## Executive VIP Chauffeur Transport Portal & Operations System
### المملكة العربية السعودية (Jeddah • Makkah • Madinah)

منظومة متكاملة لخدمات النقل الفاخر والضيافة التنفيذية لضيوف الرحمن، مبنية بأحدث معايير الأمان والحماية السحابية باستخدام Next.js 14، TypeScript، Tailwind CSS، Supabase Auth & PostgreSQL، ونشر مباشر على Vercel.

---

## 1. الهوية الرسمية والنطاق المعتمد / Brand & Production Domain

- **الاسم بالعربية:** ضيوف الرحمن VIP
- **الاسم بالإنجليزية:** Duyuf Alrahman VIP
- **النطاق الرسمي للإنتاج:** `https://duyufalrahmanvip.com`
- **البريد الإلكتروني المعتمد:** `info@duyufalrahmanvip.com`
- **أرقام الواتساب المعتمدة:**
  - **الخط الأول (العمليات والمتابعة):** `+966567588261` (`966567588261`)
  - **الخط الثاني (التنسيق والترحيل):** `+966505316971` (`966505316971`)
- **رقم الاتصال المباشر:** `+966505316971`

---

## 2. مصفوفة الصلاحيات والحماية / RBAC Matrix

تعتمد المنصة مصفوفة صلاحيات صارمة قائمة على مبدأ الامتياز الأدنى (Least Privilege) يتم التحقق منها على مستوى الخادم (`server-side role checks`) وقاعدة البيانات (`Row Level Security - RLS`):

| الرتبة / Role | الصلاحيات والمسؤوليات | التحقق الثنائي (MFA/AAL2) |
| :--- | :--- | :--- |
| **مالك المنصة (`owner`)** | الصلاحية المطلقة لإدارة إعدادات النظام، تغيير بيانات الاعتماد، إدارة وتعيين صلاحيات المديرين والمشغلين، ولا يمكن تعديله أو إيقافه من أي رتبة أخرى. | **إلزامي (AAL2 Strict)** |
| **المدير التنفيذي (`admin`)** | إدارة الحجوزات، العملاء المحتملين، الأسعار والمواسم، الأسطول، وتوجيه الواتساب. لا يمتلك صلاحية تعديل حساب المالك أو إعدادات الأمان الجذرية. | **إلزامي (AAL2 Strict)** |
| **المشغل الميداني (`operator`)** | إدارة الحجوزات اليومية واستقبال العملاء وتعيين السائقين فقط، مع حجب كامل لصفحات الإعدادات المالية والأسعار والأدوار وسجلات التدقيق. | اختياري / موصى به |

---

## 3. حماية حساب المالك في قاعدة البيانات / Owner Database Protection

تم تفعيل قفل أمني على مستوى PostgreSQL لمنع أي محاولة تلاعب بحساب المالك حتى لو حصل مستخدم على صلاحية `admin`:
- لا يمكن تعديل بريد أو صلاحية المالك إلا بواسطة المالك نفسه عبر جلسة مصادقة ثنائية نشطة.
- يمنع تفريغ أو إلغاء رتبة `owner` تلقائياً عبر مشغل قاعدة البيانات `check_owner_protection`.
- يمنع إيقاف حساب المالك (`is_suspended = true`).

---

## 4. إعدادات النظام والميزات الديناميكية / Dynamic Feature Flags

يتم التحكم بكافة الميزات والإعلانات مباشرة من لوحة الإعدادات `/admin/settings` دون الحاجة لتعديل الكود المصدري:
- تتبع الرحلات المباشر (`flight_tracking_enabled`)
- عبوات المياه المبردة (`complimentary_water`)
- مياه زمزم المباركة (`zamzam_water`)
- مقاعد الأطفال المجانية (`complimentary_child_seat`)
- السائق المتحدث بالمالاوية (`malay_speaking_chauffeur`)
- التوقف المجاني عند الميقات للإحرام (`free_miqat_stop`)
- بوابات الدفع الإلكتروني (`online_card_payment_enabled`)
- التحويل البنكي السعودي (`bank_transfer_payment_enabled`)
- أسطول باصات كوستر (`coaster_enabled`)
- تفعيل خدمات منطقة الرياض (`riyadh_enabled`)
- شريط الإعلانات الذهبي العلوي (`promo_banner_enabled` & `promo_banner_text`)
- وقت الانتظار المجاني في المطار (محدد بـ 60 دقيقة في الإعدادات)
- أرقام الواتساب الأساسية والفرعية

---

## 5. الحماية ضد الروبوتات والتحقق الآلي / Cloudflare Turnstile

تستخدم المنصة أداة Cloudflare Turnstile لحماية نماذج الحجز والاستعلام.
- **في بيئة الإنتاج:** في حال عدم توفر المفاتيح الرسمية `NEXT_PUBLIC_TURNSTILE_SITE_KEY` و `TURNSTILE_SECRET_KEY`، تعتمد الخوادم وضع الإغلاق الآمن (`Fail-Closed 503`) وتمنع استقبال أي حجوزات عشوائية أو مكالمات سبام لحين إدخال المفاتيح الرسمية من لوحة تحكم Cloudflare.
- يمنع منعاً باتاً استخدام مفاتيح الاختبار (`1x00...AA`) في بيئة الإنتاج الحقيقية.

---

## 6. إجراءات استعادة الوصول في حالات الطوارئ / Emergency Recovery Procedures

في حال فقدان المالك للهاتف أو تطبيق المصادقة الثنائية (TOTP)، يمكن استعادة الوصول بطريقتين آمنتين:

### الطريقة الأولى: رموز الاسترداد الخاصة بـ Supabase MFA (Recovery Codes)
عند تفعيل المصادقة الثنائية للمرة الأولى، يقوم Supabase بإنشاء مجموعة من الرموز الاحتياطية المخصصة للاستخدام لمرة واحدة. يمكن إدخال أحد هذه الرموز لتجاوز تحدي الـ TOTP والدخول إلى `/admin/account` لإعادة ربط جهاز جديد.

### الطريقة الثانية: الاسترداد الطارئ عبر محرر SQL في لوحة Supabase
في حال تعذر الوصول للرموز الاحتياطية، يستطيع المسؤول صاحب الوصول للوحة تحكم [Supabase Dashboard](https://supabase.com/dashboard) تشغيل الاستعلام التالي لإلغاء ربط العامل المفقود وإعادة تمكين الدخول:

```sql
-- 1) حذف العامل المسجل للمالك في جدول عوامل الأمان:
DELETE FROM auth.mfa_factors 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'YOUR_OWNER_EMAIL@DUYUFALRAHMANVIP.COM');

-- 2) إعادة تعيين قفل الحساب وإيقاف إلزام الـ 2FA مؤقتاً:
UPDATE public.user_profiles
SET totp_enabled = FALSE,
    is_suspended = FALSE,
    failed_login_attempts = 0,
    locked_until = NULL,
    updated_at = now()
WHERE email = 'YOUR_OWNER_EMAIL@DUYUFALRAHMANVIP.COM';
```

*بعد تنفيذ الاستعلام، توجه فوراً إلى `/admin/login` وسجل الدخول، ثم انتقل إلى `/admin/account` لمسح رمز QR جديد وتفعيل المصادقة الثنائية لضمان استمرار الحماية بنسبة 100%.*

---

## 7. متغيرات البيئة الأساسية / Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Production Domain & Base URL
NEXT_PUBLIC_SITE_URL=https://duyufalrahmanvip.com

# Cloudflare Turnstile (Production Keys)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
TURNSTILE_SECRET_KEY=your-turnstile-secret-key

# Optional: Resend API for Security Email Alerts
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM="Duyuf Alrahman VIP Security <security@duyufalrahmanvip.com>"
```

---

## 8. إغلاق التسجيل المفتوح في Supabase / Disabling Open Signups

1. ادخل إلى لوحة تحكم مشروعك في [Supabase Dashboard](https://supabase.com/dashboard).
2. انتقل إلى **Authentication** -> **Providers** -> **Email**.
3. قم بتعطيل الخيار:
   - **`Allow new users to sign up` (إيقاف / Set to OFF)**.
4. اضغط **Save**.

---

## 9. أوامر الفحص والبناء والنشر / Verification & Deployment

```bash
# 1. تثبيت الحزم / Install dependencies
npm install

# 2. فحص تطابق قواميس اللغات التسع / Strict i18n dictionary verification
npm run check-i18n

# 3. فحص الأنماط والأنواع / TypeScript Type Checking
npx tsc --noEmit

# 4. تشغيل كافة الاختبارات المؤتمتة / Unit & Security Test Suite
npm test

# 5. بناء تطبيق الإنتاج / Production Build
npm run build

# 6. النشر المباشر على خوادم Vercel للإنتاج / Production Deployment
npx vercel --prod --yes
```

---

*Duyuf Alrahman VIP | ضيوف الرحمن VIP • المملكة العربية السعودية • كافة الحقوق محفوظة للمالك.*  
*Ultra-Luxury Umrah & Chauffeur Ground Transportation Services.*
