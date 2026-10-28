# دليل النشر والتشغيل على Cloudflare Pages ومستودعات GitHub

هذا المشروع مهيأ ومضبوط بالكامل ليعمل كـ **Single Page Application (Vite SPA)** فائق السرعة والأداء، وقابل للنشر التلقائي بنقرة واحدة عبر **Cloudflare Pages** و **GitHub Pages**.

---

## 1. أسباب فشل البناء السابق في Cloudflare Pages وكيف تم حلها جذرياً:

1. **إصدار بيئة Node.js:** 
   - محركات البناء السحابية في Cloudflare قد تختار افتراضياً إصدار Node قديم.
   - **الحل المطبق:** تمت إضافة ملفي `.nvmrc` و `.node-version` بالقيمة `20`، مما يوجّه Cloudflare تلقائياً لاستخدام Node.js 20+.
2. **نظام التوجيه ومنع أخطاء (404 Not Found) عند التحديث:**
   - تطبيقات Vite SPA تحتاج لإعادة توجيه كافة الطلبات إلى `index.html`.
   - **الحل المطبق:** تمت إضافة ملف `public/_redirects` بالقاعدة القياسية:
     ```text
     /*    /index.html   200
     ```
     حيث يتم نسخه تلقائياً إلى مجلد `dist/` أثناء البناء.
3. **المسارات النسبية للأصول (Assets & Fonts):**
   - تم ضبط `base: './'` في `vite.config.ts` لضمان عمل كافة الخطوط وملفات الـ CSS والأصول بشكل مثالي على كل من:
     - النطاق الفرعي المجاني لـ Cloudflare (`your-project.pages.dev`)
     - النطاقات المخصصة المدفوعة (`yourdomain.com`)
     - مسارات GitHub Pages الفرعية (`username.github.io/repo/`)
4. **الاعتماد على الخادم والتدبر:**
   - تم بناء محرك تدبر وبحث دلالي محلي متكامل (`src/utils/localTadabburEngine.ts`) يعمل 100% في جانب العميل دون الحاجة لأي خادم Node.js خلفي، مما يلغي تماماً أي خطأ من نوع `Failed to fetch from server`.

---

## 2. الإعدادات المعتمدة في لوحة تحكم Cloudflare Pages:

عند ربط مستودع GitHub الخاص بك في **Cloudflare Dashboard ➔ Workers & Pages ➔ Create Application ➔ Pages ➔ Connect to Git**:

| الإعداد (Setting) | القيمة المعتمدة (Approved Value) |
| :--- | :--- |
| **Framework preset** | `Vite` (أو `None`) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (اتركه فارغاً) |
| **Node.js Version** | `20` (يتم قراءتها تلقائياً من `.nvmrc`) |

> [!TIP]
> إذا رغبت في إضافة متغير بيئة احتياطي في Cloudflare Pages:
> اذهب إلى **Settings ➔ Environment variables ➔ Production** وأضف:
> `NODE_VERSION` = `20`

---

## 3. خطوات الرفع على GitHub والنشر التلقائي:

قم بتنفيذ الأوامر التالية في مجلد المشروع لرفع التحديثات إلى مستودعك:

```bash
git add .
git commit -m "feat: Hafs 'an 'Asim Tajweed documentation and Cloudflare Pages deployment ready"
git push origin main
```

بمجرد عمل `git push`، ستقوم منصة Cloudflare Pages بسحب الكود وبنائه تلقائياً خلال أقل من 60 ثانية، وستحصل على رابط حي دائم يعمل مجاناً مدى الحياة.

---

## 4. ربط نطاق مخصص مدفوع (Custom Domain):

بعد نجاح البناء في Cloudflare Pages:
1. افتح مشروعك في Cloudflare Pages.
2. اضغط على تبويب **Custom domains**.
3. اضغط **Set up a custom domain**.
4. اكتب اسم نطاقك: `hajj.ly`.
5. ستقوم Cloudflare بإعداد سجلات الـ DNS وإصدار شهادة SSL مشفرة تلقائياً ومجاناً.

---

## 5. الاعتماد والتوثيق الشرعي للنص والتجويد:

- **الرواية:** رواية حفص عن عاصم بن أبي النَّجود الكوفي من طريق الشاطبية.
- **الرسم العثماني:** مطابق لمصحف المدينة النبوية الصادر عن مجمع الملك فهد لطباعة المصحف الشريف.
- **المصادر والتراخيص:** Tanzil.net بموجب CC BY 3.0، وخطوط مجمع الملك فهد وأميري بموجب SIL Open Font License 1.1.
