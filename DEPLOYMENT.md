# دليل النشر والتشغيل على Cloudflare Pages وحل أخطاء البناء

هذا المشروع مهيأ ومضبوط بالكامل ليعمل كـ **Single Page Application (Vite SPA)** فائق السرعة والأداء، وقابل للنشر التلقائي بنقرة واحدة عبر **Cloudflare Pages** و **GitHub Pages** على النطاق الخاص **`hajj.ly`**.

---

## 🛠️ تحليل وحل خطأ البناء الأخير في Cloudflare Pages:

### 1. خطأ `npm error Cannot read properties of null (reading 'edgesOut')`:
- **سبب الخطأ:** هذا الخطأ شهير في مديري حزم `npm v9` و `npm v10` في بيئات البناء السحابية (CI)؛ وكان سببه وجود خاصية `"overrides"` متعارضة في `package.json` مع غياب ملف قفل الحزم الموحد `package-lock.json` في المستودع، مما جعل npm يفشل أثناء تحليل شجرة الاعتماديات.
- **الحل المطبق:**
  1. تمت إزالة خاصية `"overrides"` المتعارضة من `package.json`.
  2. تم توليد ملف قفل حزم نظيف ومحدث ومعتمد `package-lock.json` في جذر المشروع.
  3. بوجود `package-lock.json`، ستقوم Cloudflare بتثبيت الحزم فورياً وبأمان تام دون أي تعارض.

### 2. تحذير `Found wrangler.toml file... does not appear to be valid`:
- **سبب التحذير:** كانت خاصية `pages_build_output_dir` موضوعة تحت تصنيف فرعي `[env.production]` بينما تتطلب Cloudflare Pages وضعها في المستوى الرئيسي للملف.
- **الحل المطبق:**
  تم تصحيح ملف `wrangler.toml` ليصبح:
  ```toml
  name = "hajj-ly"
  pages_build_output_dir = "dist"
  compatibility_date = "2024-11-01"
  ```

### 3. إصدار بيئة Node.js المستقر (LTS):
- تم ضبط ملفي `.nvmrc` و `.node-version` على الإصدار المستقر `20.18.0` لتفادي رسائل التحذير الخاصة بالإصدارات غير المدعومة.

---

## 📋 الإعدادات المعتمدة في لوحة تحكم Cloudflare Pages:

في **Cloudflare Dashboard ➔ Workers & Pages ➔ hajj-ly ➔ Settings ➔ Builds & deployments**:

| الإعداد (Setting) | القيمة المعتمدة (Approved Value) |
| :--- | :--- |
| **Framework preset** | `Vite` (أو `None`) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (اتركه فارغاً) |
| **Node.js Version** | `20.18.0` (يتم قراءتها تلقائياً من `.node-version`) |

---

## 🚀 أوامر الرفع على GitHub لتشغيل البناء الناجح:

قم بتنفيذ الأوامر التالية في مجلد مشروعك المحلي لرفع التعديلات:

```bash
git add .
git commit -m "fix: resolve npm edgesOut error, add package-lock.json and valid wrangler.toml"
git push origin main
```

بمجرد عمل `git push`، ستسحب منصة Cloudflare Pages الكود الجديد وتبنيه تلقائياً في أقل من دقيقة، وسيتحول المؤشر إلى **Success (أخضر)**.

---

## 🌐 ربط نطاقك المخصص `hajj.ly`:

1. ادخل إلى مشروعك في **Cloudflare Pages**.
2. افتح تبويب **Custom domains**.
3. اضغط على **Set up a custom domain**.
4. اكتب نطاقك: **`hajj.ly`**.
5. ستتولى Cloudflare ربط الـ DNS وتفعيل شهادة الأمان (SSL) تلقائياً ومجاناً.
