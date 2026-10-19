# Royal Umrah Cabs | Production Architecture & Administration Guide
# دليل الإدارة الشامل والتوثيق التشغيلي لشركة رويال عمرة كابز

> **Enterprise Chauffeur Transport & VIP Pilgrimage Operations System (Jeddah, Makkah, Madinah, Riyadh optional).**  
> Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, RLS), deployed on Vercel.  
> **Production URL:** [royal-umrah-cabs.vercel.app](https://royal-umrah-cabs.vercel.app)

---

## 📌 جدول المحتويات / Table of Contents
1. [إلزامية ملكية الحسابات / Mandatory Account Ownership](#1-إلزامية-ملكية-الحسابات--mandatory-account-ownership)
2. [الأدوار والصلاحيات وعزل المشغلين / Roles, Permissions & Scoped Operators](#2-الأدوار-والصلاحيات-وعزل-المشغلين--roles-permissions--scoped-operators)
3. [نظام توجيه الواتساب وتتبع الطلبات / WhatsApp Routing & Lead Tracking](#3-نظام-توجيه-الواتساب-وتتبع-الطلبات--whatsapp-routing--lead-tracking)
4. [مواصفات الأسطول المعتمدة / Certified Fleet Capacities](#4-مواصفات-الأسطول-المعتمدة--certified-fleet-capacities)
5. [لوحة التحكم والإدارة الشاملة / Admin Features & Operations](#5-لوحة-التحكم-والإدارة-الشاملة--admin-features--operations)
6. [إجراءات الطوارئ واستعادة الحساب للمالك / Emergency Owner Recovery Protocol](#6-إجراءات-الطوارئ-واستعادة-الحساب-للمالك--emergency-owner-recovery-protocol)
7. [متغيرات البيئة والتهيئة / Environment Variables](#7-متغيرات-البيئة-والتهيئة--environment-variables)
8. [أوامر البناء والنشر / Build & Deployment Commands](#8-أوامر-البناء-والنشر--build--deployment-commands)

---

## 1. إلزامية ملكية الحسابات / Mandatory Account Ownership

### ⚠️ قاعدة أمان سيادية / Sovereign Security Rule:
**يجب أن تكون جميع الحسابات التقنية والتشغيلية مسجلة حصراً باسم وبريد المالك الأساسي:**
All service and infrastructure accounts **MUST** be registered and owned exclusively by the Owner's primary email address:
- **Vercel** (استضافة التطبيق والنطاق / Hosting & DNS)
- **Supabase** (قاعدة البيانات والمصادقة وسياسات الأمان / Database & Auth)
- **GitHub Repository** (المستودع البرمجي المصدري / Source Code Repository)
- **Domain Registrar** (مسجل النطاق / Domain Nameservers)
- **Primary Google Business Profile** (الملف التجاري على خرائط جوجل)
- **Google Search Console & Google Analytics 4** (أدوات المشرفين والإحصاءات)
- **Transactional Email Provider** (مزود إرسال البريد الإلكتروني مثل Resend / SendGrid)

> **تنبيه:** لا يجوز إعطاء صلاحية "Owner" لأي مطور أو طرف ثالث. المالك فقط هو من يمتلك مفاتيح الوصول الأساسية.

---

## 2. الأدوار والصلاحيات وعزل المشغلين / Roles, Permissions & Scoped Operators

تم بناء النظام وفق نموذج التحكم في الوصول القائم على الأدوار (Granular RBAC) مع حماية مضاعفة على مستوى خادم التطبيق ومستوى قاعدة البيانات عبر (PostgreSQL Row Level Security):

| الدور / Role | الصلاحيات / Permissions | العزل والحدود / Scope & Boundaries |
| :--- | :--- | :--- |
| **Owner (المالك)** | تحكم مطلق غير مقيد في كافة البيانات، الحسابات، الأسعار، الصلاحيات، سجل التدقيق، واستعادة البيانات. | رقم الواتساب الرئيسي: `966567588261`. لا يمكن حذفه أو تخفيضه أو تجميده بأي شكل. |
| **Admin (المدير)** | إدارة الحجوزات، السائقين، المركبات، والأسعار. | لا يمكنه تعديل صلاحيات المالك أو حذف حسابات المدراء أو تغيير إعدادات الأمان الحساسة. |
| **Operator (المنسق/المشغل)** | متابعة وتحديث حالات الطلبات والحجوزات المسندة إليه فقط. | **معزول تماماً:** الصديق المنسق على رقم `966505316971` يرى حصراً الطلبات المحولة إلى هذا الرقم، ولا يرى بيانات القنوات الأخرى. |
| **Driver (السائق)** | عرض بيانات الرحلات المسندة إليه والتواصل مع المعتمر. | يرى فقط تفاصيل مسار الرحلة المسندة إليه وتاريخها واسم العميل. |
| **Content Editor** | تعديل المقالات، أدلة الميقات، والأسئلة الشائعة. | لا يملك صلاحية الاطلاع على الحجوزات أو البيانات المالية أو أسعار التوصيل. |
| **Translator (المترجم)** | ترجمة وتعديل القواميس اللغوية في اللغات الـ 9. | صلاحية حصرية على محتوى اللغات فقط. |
| **Partner (وكيل السفر)** | إنشاء حجوزات المجموعات ومتابعة عمولاته. | وصول مخصص لبوابة الوكلاء والأسعار الخاصة بالشركاء. |

> 🔒 **ملاحظة أمنية أساسية للمطورين والمدققين / Critical Security Architecture Note:**  
> تضمن سياسات أمان صفوف قاعدة البيانات (PostgreSQL RLS) حماية الاستعلامات المباشرة الصادرة من المتصفح والعملاء الخارجيين. ومع ذلك، نظراً لأن خادم التطبيق (Next.js API Routes) يستخدم مفتاح الخدمة الداخلي (`SUPABASE_SERVICE_ROLE_KEY`) الذي يتجاوز سياسات الـ RLS تلقائياً، فإن **الفحص البرمجي الصارم على مستوى الـ API (عبر Zod Schemas ودوال `requireRole` و `calculateServerPrice`) هو خط الدفاع الحقيقي والسيادي ضد محاولات تصعيد الصلاحيات والتلاعب بالأسعار أو البيانات.**
> 
> *In Supabase architecture, service-role keys bypass RLS by design. Therefore, application-level guards (strict Zod parsing, RBAC validation via requireRole, and server-side price computation) are the authoritative perimeter protecting data integrity and access control.*

---

## 3. نظام توجيه الواتساب وتتبع الطلبات / WhatsApp Routing & Lead Tracking

1. **الرمز المرجعي الفوري (Unique Ref Code):**  
   عند نقر الزائر على زر "تأكيد عبر واتساب" أو "حجز سريع"، يقوم النظام بحفظ الطلب كـ `Lead` في قاعدة البيانات أولاً وتوليد كود مرجعي مثل `RUC-48213`، ثم يفتح الواتساب مع رسالة جاهزة ومترجمة بلغة الزائر تحتوي على الكود وتفاصيل المسار والسيارة المختارة.
2. **أرقام الواتساب المعتمدة:**
   - **الرقم الرئيسي (المالك):** `+966567588261` (يستقبل جميع الطلبات العامة وتنبيهات الإدارة).
   - **رقم التشغيل والتنسيق:** `+966505316971` (يستقبل الحجوزات الموجهة للمشغل).
3. **توجيه ساعات العمل بتوقيت مكة المكرمة (KSA UTC+3):**  
   يعمل محرك `whatsapp-routing.ts` على التوجيه الذكي بين الأرقام حسب ساعات التغطية وجدول المناوبات.
4. **نظام مراقبة التأخير (Unattended Leads Alert):**  
   إذا بقي أي طلب جديد لأكثر من 15 دقيقة دون رد أو تحديث، يظهر تنبيه فوري باللون الكهرماني/الأحمر في شاشة الإدارة مع إمكانية تحويله لحجز مؤكد بنقرة واحدة.

---

## 4. مواصفات الأسطول المعتمدة / Certified Fleet Capacities

تلتزم المنصة بالمصداقية التامة، ولا يتم إدراج سعات وهمية؛ تم تثبيت القيود برمجياً في محرك الحجز لمنع اختيار سيارة لا تتسع للركاب أو الحقائب:

- 🚗 **Toyota Camry Executive:**  
  **4 ركاب / 4 Passengers** | **3 حقائب / 3 Luggage Bags**  
  سيدان تنفيذية مريحة ومثالية للأفراد والأزواج والعائلات الصغيرة.
- 🚐 **Hyundai Staria VIP:**  
  **7 ركاب / 7 Passengers** | **6 حقائب / 6 Luggage Bags**  
  ميني فان فارهة ومكيفة بمقاعد كابتن مريحة للرحلات الطويلة بين مكة والمدينة.
- 🚙 **GMC Yukon XL VIP:**  
  **7 ركاب / 7 Passengers** | **8 حقائب / 8 Luggage Bags**  
  دفع رباعي أمريكي فاخر وقوي يوفر أقصى سعة للأمتعة وراحة فائقة لكبار الشخصيات.
- 🚐 **Toyota HiAce VIP:**  
  **10 ركاب / 10 Passengers** | **10 حقائب / 10 Luggage Bags**  
  حافلة عائلية صغيرة مجهزة للمجموعات المتوسطة وحمل أمتعة المعتمرين مع مياه زمزم.
- 🚌 **Toyota Coaster VIP Bus:**  
  **21 راكب / 21 Passengers** | **20 حقيبة / 20 Luggage Bags**  
  حافلة سياحية معتمدة ومكيفة للوفود وحملات العمرة والزيارات الجماعية.

---

## 5. لوحة التحكم والإدارة الشاملة / Admin Features & Operations

توجد لوحة التحكم في المسار المحمي `/admin` (محمية بتسجيل الدخول والـ 2FA ومحجوبة عن محركات البحث عبر `noindex`):

1. **Dashboard (لوحة الإحصاءات):**  
   عرض الحجوزات اليومية، الإيرادات التقديرية، قمع التحويل (Conversion Funnel)، والطلبات غير المردود عليها فورياً.
2. **Bookings (إدارة الحجوزات):**  
   جدول فلترة، تقويم تفاعلي، تعيين السائق، تحديث الحالات (`new` -> `confirmed` -> `driver_assigned` -> `completed`)، إصدار سندات الحجز (Voucher PDF)، وتصدير البيانات CSV.
3. **Leads (الطلبات الفورية):**  
   سجل كافة نقرات الواتساب مع رقم الرمز المرجعي، ومصدر الحركة (UTM)، والدولة، وإمكانية التحويل بنقرة واحدة إلى حجز رسمي.
4. **Catalog & Pricing (الأسعار والمسارات):**  
   إدارة أسعار المسارات لكل مركبة، وتطبيق المضاعفات الموسمية (موسم العمرة، العشر الأواخر من رمضان، موسم الحج) دون الحاجة لأي تعديل برمجي.
5. **Settings & Feature Flags (الإعدادات العامة):**  
   التحكم في تشغيل مسار الرياض، نصوص تتبع الرحلات الجوية، تفعيل/تعطيل مياه زمزم المجانية، وإدارة أرقام الواتساب النشطة.
6. **Content & Translations (المحتوى واللغات):**  
   التحكم في نشر ومراجعة النصوص عبر اللغات التسع (`en`, `ar`, `ms`, `id`, `ur`, `fr`, `es`, `de`, `hi`). لا يتم عرض أي لغة إلا بعد اعتمادها من الإدارة.
7. **Audit Log (سجل الرقابة والأمان):**  
   توثيق كل حركة بالثانية، مع عنوان الـ IP والبيانات قبل وبعد التعديل، مع ميزة التصدير لملفات CSV.

---

## 6. إجراءات الطوارئ واستعادة الحساب للمالك / Emergency Owner Recovery Protocol

في حال فقدان جهاز التحقق بخطوتين (2FA) أو نسيان كلمة المرور للمالك، يمكن استعادة السيطرة فورياً بالدخول المباشر إلى لوحة تحكم **Supabase SQL Editor** وتنفيذ الأوامر التالية:

### أ) إعادة تعيين كلمة مرور المالك وتفعيل الحساب:
```sql
UPDATE auth.users
SET encrypted_password = crypt('YourNewStrongPassword2026!', gen_salt('bf')),
    email_confirmed_at = now(),
    updated_at = now()
WHERE email = 'YOUR_OWNER_EMAIL@DOMAIN.COM';
```

### ب) إلغاء قفل الحساب وإعادة تعيين التحقق الثنائي (2FA/TOTP):
```sql
UPDATE public.user_profiles
SET totp_enabled = FALSE,
    totp_secret = NULL,
    is_suspended = FALSE,
    failed_login_attempts = 0,
    locked_until = NULL,
    updated_at = now()
WHERE email = 'YOUR_OWNER_EMAIL@DOMAIN.COM';
```
*بعد تشغيل هذا الاستعلام، سجل الدخول عبر الرابط `/admin/login` بكلمة المرور الجديدة ثم توجه إلى `/admin/users` لإعادة تفعيل 2FA وحفظ الرمز السري الجديد.*

### ج) تأكيد صلاحية المالك وحمايته من التخفيض:
```sql
UPDATE public.user_profiles
SET role = 'owner',
    is_suspended = FALSE
WHERE email = 'YOUR_OWNER_EMAIL@DOMAIN.COM';
```

### د) فحص آخر النشاطات الأمنية:
```sql
SELECT performed_by, entity_type, action, details, ip_address, created_at
FROM public.audit_log
ORDER BY created_at DESC
LIMIT 25;
```

---

## 7. متغيرات البيئة والتهيئة / Environment Variables

يجب التأكد من وجود المتغيرات التالية في ملف `.env.local` ولوحة تحكم Vercel:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Anti-Bot Protection (Cloudflare Turnstile - Required in Production)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
TURNSTILE_SECRET_KEY=your-turnstile-secret-key

# Rate Limiting Store (Upstash Redis - Required for fail-closed protection in Production)
UPSTASH_REDIS_REST_URL=https://your-upstash-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-rest-token

# Transactional Email Dispatcher (Resend - Optional / Recommended for ownership transfer emails)
RESEND_API_KEY=your-resend-api-key
RESEND_FROM="Royal Umrah Cabs Security <security@royalumrahcabs.com>"

# Production Domain & App Metadata
NEXT_PUBLIC_SITE_URL=https://royal-umrah-cabs.vercel.app

# WhatsApp Routing (Default Primary Numbers)
NEXT_PUBLIC_WHATSAPP_OWNER=966567588261
NEXT_PUBLIC_WHATSAPP_OPERATOR=966505316971
```

---

## 8. إغلاق التسجيل المفتوح في Supabase / Disabling Open Signups

لضمان عدم تمكن أي طرف خارجي أو حساب عام من التسجيل، يجب إيقاف التسجيل المفتوح في مشروع Supabase:

1. ادخل إلى لوحة تحكم مشروعك في [Supabase Dashboard](https://supabase.com/dashboard).
2. انتقل إلى قائمة **Authentication** من الشريط الجانبي، ثم اختر **Providers** -> **Email**.
3. قم بتعطيل الخيار:
   - **`Allow new users to sign up` (إلغاء التفعيل / Set to OFF)**.
4. اضغط **Save**.
5. وبذلك:
   - يُمنع إنشاء أي حساب عبر واجهات التسجيل العامة (`signUp`).
   - تنحصر إضافة أعضاء الفريق حصراً في دعوة الإدارة عبر لوحة التحكم من خلال دالة الخادم الآمنة `serviceClient.auth.admin.inviteUserByEmail`.
   - يتطلب تفعيل أي حساب إداري أن يكون البريد الإلكتروني مؤكداً (`email_confirmed_at IS NOT NULL`).

---

## 9. قائمة التحقق لتفعيل المصادقة الثنائية (2FA / TOTP) / First-Time 2FA Setup Checklist

تفرض المنصة سياسة أمان إلزامية (Zero-Trust MFA) على حسابات **المالك (Owner)** و**المدير (Admin)** تمنع الوصول للوحة التحكم دون إكمال ربط تطبيق المصادقة (Google Authenticator أو 1Password):

### خطوات التفعيل للمرة الأولى / Setup Checklist:
1. **تسجيل الدخول الأولي:**  
   - توجه إلى الرابط المحمي `/admin/login`.
   - أدخل البريد الإلكتروني وكلمة المرور المسندة إليك.
2. **التحويل التلقائي لخطوة التفعيل (Forced Enrollment):**  
   - سيتعرف النظام تلقائياً على أن الحساب يمتلك صلاحية `owner` أو `admin` ولم يقم بربط الـ 2FA بعد (`isEnrolled: false`).
   - تُعرض شاشة التفعيل الفوري مع الرمز السري ومفتاح الـ URI الخاص بالمصادقة الثنائية.
3. **مسح الرمز عبر تطبيق المصادقة:**  
   - افتح تطبيق Google Authenticator أو ما شابهه في هاتفك وامسح الرمز أو أدخل المفتاح السري يدوياً.
4. **تأكيد الرمز المكون من 6 أرقام:**  
   - أدخل رمز التحقق اللحظي في الخانة المخصصة واضغط "تأكيد وتفعيل".
   - يتم تفعيل العامل في Supabase MFA ورفع مستوى الجلسة تلقائياً إلى المستوى الثاني المعزول (`AAL2`).
5. **تسجيل الدخول في المرات القادمة:**  
   - في كل جلسة جديدة، يُطلب الرمز السري من التطبيق للوصول للوحة التحكم أو واجهات برمجة التطبيقات المحمية (`requireRole`).

---

## 10. أوامر البناء والنشر / Build & Deployment Commands

```bash
# 1. تثبيت الحزم / Install dependencies
npm install

# 2. فحص تطابق مفاتيح الترجمة لكافة اللغات التسع / Strict i18n dictionary verification
npm run check-i18n

# 3. بناء تطبيق الإنتاج واختبار الـ SSR / Production Build
npm run build

# 4. النشر المباشر على خوادم Vercel للإنتاج / Production Deployment
npx vercel --prod --yes
```

---

*Royal Umrah Cabs • المملكة العربية السعودية • كافة الحقوق محفوظة للمالك.*  
*Enterprise Chauffeur & VIP Pilgrimage Ground Transportation.*
