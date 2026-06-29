export const API_CONFIGS = {
  quran_foundation: {
    id: 'quran_foundation',
    name: 'Quran Foundation',
    url: 'https://quran.com',
    fontFamily: "'Amiri', serif",
    fontName: 'Amiri QMS',
    provider: 'Official (v4)',
    badge: 'Official',
    color: 'emerald',
    description: 'Official Mushaf layouts and user sync capabilities.',
    endpoint: (s, a) => `https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=${s}:${a}`,
    transform: (data) => {
      const verse = data.verses[0];
      return {
        key: verse.verse_key,
        id: verse.id,
        source: 'Quran Foundation',
        text: verse.text_uthmani,
        meta: {
          juz: verse.juz_number,
          page: verse.page_number
        }
      };
    }
  },
  alquran_cloud: {
    id: 'alquran_cloud',
    name: 'Al-Quran Cloud',
    url: 'https://alquran.cloud',
    fontFamily: "'Scheherazade New', serif",
    fontName: 'Scheherazade',
    provider: 'REST / CDN',
    badge: 'Standard',
    color: 'blue',
    description: '430+ text and audio editions with global CDN delivery.',
    endpoint: (s, a) => `https://api.alquran.cloud/v1/ayah/${s}:${a}`,
    transform: (data) => ({
      key: `${data.data.surah.number}:${data.data.numberInSurah}`,
      id: data.data.number,
      source: 'Al-Quran.cloud',
      text: data.data.text,
      meta: {
        juz: data.data.juz,
        page: data.data.page
      }
    })
  },
  quran_api_edge: {
    id: 'quran_api_edge',
    name: 'Quran Data (Edge)',
    url: 'https://quranapi.pages.dev',
    fontFamily: "'Noto Naskh Arabic', serif",
    fontName: 'Noto Naskh',
    provider: 'Vercel Edge',
    badge: 'Edge-Fast',
    color: 'indigo',
    description: 'High performance delivery via Vercel Edge runtime.',
    endpoint: (s, a) => `https://quranapi.pages.dev/api/${s}/${a}.json`,
    transform: (data) => ({
      key: `${data.surahNo}:${data.ayahNo}`,
      id: data.ayahNo, 
      source: 'Al-Quran API (Edge)',
      text: data.arabic1,
      meta: {
        surah: data.surahNameArabic,
        english: data.english
      }
    })
  },
  quran_hub: {
    id: 'quran_hub',
    name: 'Quran Hub',
    url: 'https://quranhub.app',
    fontFamily: "'Lateef', cursive",
    fontName: 'Lateef',
    provider: 'REST / MCP',
    badge: 'Morphology',
    color: 'amber',
    description: '2.5 million word-tag morphological associations.',
    endpoint: (s, a) => `https://api.quranhub.com/v1/ayah/${s}:${a}`,
    transform: (data) => ({
      key: `${data.data.surah.number}:${data.data.numberInSurah}`,
      id: data.data.number,
      source: 'Quran Hub',
      text: data.data.text,
      meta: {
        juz: data.data.juz,
        surah: data.data.surah.name
      }
    }),
    useProxy: true
  },
  quran_finder: {
    id: 'quran_finder',
    name: 'Quran Explorer',
    url: 'https://quran-finder.com',
    fontFamily: "'Amiri', serif",
    fontName: 'Amiri Classic',
    provider: 'Static Files',
    badge: 'Static',
    color: 'rose',
    description: 'Speed and inherent security of static delivery model.',
    endpoint: (s, a) => `https://api.quran-finder.com/text/ar/${s}/${a}/`,
    transform: (data) => ({
      key: `Static`,
      id: 'N/A',
      source: 'Quran Finder',
      text: data,
      meta: {
        type: 'Raw Text'
      }
    }),
    isRawText: true,
    useProxy: true
  }
};
