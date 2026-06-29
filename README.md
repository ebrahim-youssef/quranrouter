# Quran Router | موجه بيانات القرآن الكريم

[![itqan: ناقش](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSIyMCI+PGcgZmlsbD0iI2ZmZiI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMTBiOTgxIi8+PHJlY3QgeD0iNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzFlMjkzYiIvPjx0ZXh0IHg9IjIwIiB5PSIxNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiPml0cWFuPC90ZXh0Pjx0ZXh0IHg9IjYwIiB5PSIxNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2Y4ZmFmYyI+2YbYp9mC2LQ8L3RleHQ+PC9nPjwvc3ZnPg==)](https://community.itqan.dev/d/399)

هذه الفكرة مستوحاة من نقاش تقني ثري دار في [مجتمع إتقان](https://community.itqan.dev/d/399) بدأه الأستاذ @iphoneislam حول "الهشاشة التقنية" لمصادر الصوتيات القرآنية، وحاجة المطورين إلى بنية تحتية مشتركة تشبه **OpenRouter** ولكن لبيانات وصوتيات القرآن الكريم.

## ⚠️ المشكلة: التشتت والتبعية
أحد أكبر التحديات التي تواجه المطورين عند بناء تطبيقات القرآن الكريم هو **تشتت البيانات**. فمثلاً، تجد واجهة برمجة (API) "أ" يرسل لك الآيات في مصفوفة باسم `verses` بينما API "ب" يرسلها باسم `ayahs` وببنية مختلفة تماماً.

هذا التشتت يجعل تطبيقك "رهينة" لمصدر بيانات واحد. إذا توقف هذا المصدر (كما يحدث أحياناً في مواسم الذروة مثل رمضان)، ستضطر لإعادة كتابة أجزاء كبيرة من كود الواجهة الأمامية لتتوافق مع المصدر الجديد.

## ✅ الحل: طبقة التوجيه (Router Layer)
تعمل كمترجم فوري يجلس بين تطبيقك وبين كل الـ APIs المتاحة. مهمتها أن تأخذ البيانات "الخام" من أي مصدر وتخرجها لتطبيقك بتنسيق واحد ثابت (**Unified Schema**) أنت من يحدده.

### كيف يمكن بناء هذه الطبقة؟ هناك طريقتان:

#### 1. بناء الطبقة كوسيط برمجي (Middleware) داخل التطبيق
هذا الخيار مثالي للمشاريع التي تريد بساطة التنفيذ دون سيرفرات إضافية. تقوم ببناء وظيفة (Function) تتعامل مع جلب البيانات وتحويلها. (هذا ما تم تطبيقه في هذا المستودع كنموذج أولي).

#### 2. توفير الطبقة كواجهة برمجة خارجية (External API Router)
هنا نقوم ببناء محوّل صغير (Node.js أو Serverless) يكون هو "النقطة الوحيدة" (Single Endpoint) التي يتحدث معها تطبيقك، تماماً كما اقترح الأستاذ طارق في فكرة **Quran Audio Router**.

**كيف تعمل؟**
1. يرسل تطبيقك طلباً للسيرفر الخاص بك: `my-router.com/get?surah=1`.
2. السيرفر يقرر أي API هو الأسرع أو الأكثر استقراراً حالياً.
3. السيرفر يجلب البيانات، يوحدها، ويرسلها جاهزة لتطبيقك.

## 🚀 لماذا يجب أن نتبنى هذا الأسلوب؟
* **إنهاء التبعية (No Vendor Lock-in):** التبديل بين المصادر (Quran.com, AlQuran.cloud, MP3Quran) يتم في الخلفية دون لمس كود الواجهة الرسومية (UI).
* **استقرار عالي:** إذا سقط مصدر في رمضان، يتحول الـ Router تلقائياً للمصدر البديل.
* **كود أنظف:** تطبيقك يتوقع دائماً نفس المفاتيح (`id`, `text`, `audio`) مهما تغير المصدر.
* **قابلية التوسع:** سهولة إضافة مصادر جديدة (أفراد، جمعيات، أو جامعات) بمجرد كتابة "مترجم" (Adapter) صغير لها داخل الـ Router.

---

## 🛠️ تفاصيل التجربة الحالية
هذا المستودع يمثل تجربة حية (POC) لتطبيق فكرة الـ Middleware. يقوم بجلب البيانات من عدة مصادر وتوحيدها في هيكلية واحدة:

```javascript
// الهيكلية الموحدة الناتجة (Unified Schema)
{
  "key": "1:1",
  "id": 1,
  "source": "Al-Quran.cloud",
  "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  "meta": {
    "juz": 1,
    "page": 1
  }
}
```

### المصادر المدعومة حالياً في التجربة:
- **Quran Foundation (api.quran.com)**
- **Al-Quran Cloud (api.alquran.cloud)**
- **Quran Data Edge (Vercel Edge)**
- **Quran Hub**
- **Quran Explorer (Static Files)**

---

## 🛠️ التقنيات المستخدمة
- **React.js**: لبناء الواجهة البرمجية.
- **Vite**: كأداة بناء سريعة.
- **Tailwind CSS**: للتنسيق الجمالي.
- **Shadcn/UI**: لمكونات الواجهة الجاهزة والاحترافية.

---

## 💻 التشغيل المحلي
إذا كنت ترغب في تجربة المشروع محلياً:

1. قم بتحميل المستودع:
   ```bash
   git clone https://github.com/hadealahmad/quranrouter.git
   ```
2. تثبيت المكتبات:
   ```bash
   npm install
   ```
3. تشغيل وضع التطوير:
   ```bash
   npm run dev
   ```

---

## 💬 خاتمة
كما ذكرتُ سابقاً في نقاشي مع الأستاذ طارق، البداية قد تكون بسيطة عبر توحيد معايير الوصول للبيانات (Routing)، مما يفتح الباب مستقبلاً لبناء شبكات تخزين مؤقت (Caching) وخدمات CDN عالمية تخدم كافة التطبيقات الإسلامية.

*للاطلاع على النقاش الأصلي: [مجتمع إتقان - مشكلة مصادر الصوتيات](https://community.itqan.dev/d/399)*

---
**رابط التجربة الحية:** [https://hadealahmad.github.io/quranrouter/](https://hadealahmad.github.io/quranrouter/)
