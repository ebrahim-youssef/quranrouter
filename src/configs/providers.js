export const PROVIDER_META = {
  quran_foundation: {
    fontFamily: "'Amiri', serif",
    fontName: 'Amiri',
    badge: 'رسمي',
    description: 'المصحف الرسمي مع دعم حسابات المستخدمين.',
  },
  alquran_cloud: {
    fontFamily: "'Scheherazade New', serif",
    fontName: 'Scheherazade',
    badge: 'قياسي',
    description: 'أكثر من 430 نص وصوت عبر شبكة توصيل عالمية.',
  },
  quran_api_edge: {
    fontFamily: "'Noto Naskh Arabic', serif",
    fontName: 'Noto Naskh',
    badge: 'حافة',
    description: 'توصيل عالي الأداء عبر حافة Vercel.',
  },
  quran_hub: {
    fontFamily: "'Lateef', cursive",
    fontName: 'Lateef',
    badge: 'صرف',
    description: '2.5 مليون ارتباط صرفي للكلمات.',
  },
  quran_finder: {
    fontFamily: "'Amiri', serif",
    fontName: 'Amiri',
    badge: 'ثابت',
    description: 'سرعة وأمان نموذج التوصيل الثابت.',
  },
  spa5k_tafsir: {
    fontFamily: "'Amiri', serif",
    fontName: 'Amiri',
    badge: 'تفسير',
    description: 'تفاسير متعددة من مكتبة spa5k.',
  },
}

export const CAPABILITIES = [
  { id: 'text', label: 'النص', description: 'توحيد شكل النص القرآني من مصادر متعددة.' },
  { id: 'audio', label: 'الصوت', description: 'توحيد رابط التلاوة مع معلومات القارئ.' },
  { id: 'translation', label: 'الترجمة', description: 'توحيد الترجمة مع اللغة والطبعة.' },
  { id: 'tafsir', label: 'التفسير', description: 'توحيد نص التفسير مع معرّف المفسّر.' },
]

export const RECITERS = [
  { id: 'ar.alafasy', label: 'مشاري العفاسي' },
  { id: 'ar.abdurrahmaansudais', label: 'عبدالرحمن السديس' },
  { id: 'ar.husary', label: 'محمود خليل الحصري' },
  { id: 'ar.minshawi', label: 'محمد صديق المنشاوي' },
]

export const EDITIONS = [
  { id: 'en.sahih', label: 'Sahih International' },
  { id: 'en.pickthall', label: 'Pickthall' },
  { id: 'fr.hamidullah', label: 'Hamidullah' },
  { id: 'ur.jalandhry', label: 'Jalandhry' },
]

export const TAFSIRS = [
  { id: 'ar-tafsir-ibn-kathir', label: 'ابن كثير' },
  { id: 'ar-tafsir-al-tabari', label: 'الطبري' },
  { id: 'ar-tafsir-al-qurtubi', label: 'القرطبي' },
  { id: 'en-tafsir-ibn-kathir', label: 'Ibn Kathir - EN' },
]
