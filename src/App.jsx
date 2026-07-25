import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import DisplayCard from './components/DisplayCard'
import CodeViewer from './components/CodeViewer'
import { useQuranRouter } from './hooks/useQuranRouter'
import { Github, MessageSquare, Layers } from 'lucide-react'

const App = () => {
  const [surah, setSurah] = useState(1)
  const [ayah, setAyah] = useState(1)
  const [include, setInclude] = useState(['text', 'audio', 'translation', 'tafsir'])
  const [sources, setSources] = useState({})
  const [reciter, setReciter] = useState('ar.alafasy')
  const [edition, setEdition] = useState('en.sahih')
  const [tafsirId, setTafsirId] = useState('ar-tafsir-ibn-kathir')

  const { result, loading, durationMs, refetch } = useQuranRouter({
    surah, ayah, include, sources, reciter, edition, tafsirId,
  })

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-6 py-10 md:py-16 space-y-8">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/40 text-[11px] font-bold text-muted-foreground">
            <Layers size={13} className="text-primary" />
            quran-api-unified — طبقة توجيه موحّدة بأربعة محتويات
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            موجّه بيانات القرآن الكريم
            <span className="block text-base md:text-lg font-medium text-muted-foreground mt-2">
              Quran Router v2 — يعمل بواسطة quran-api-unified v0.2.0
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
            اختر السورة والآية وأنواع المحتوى المطلوبة. قارن بين البيانات الخام القادمة من كل مزوّد
            (قبل) والهيكلية الموحّدة التي يخرجها الموجّه (بعد) للنص، والصوت، والترجمة، والتفسير.
            التحميل مرّة واحدة — جميع المحتويات تُجلَب بالتوازي مع تتبّع مسار التتابع التلقائي.
          </p>
          {durationMs != null && (
            <p className="text-xs text-muted-foreground font-mono">
              آخر تحميل: {Math.round(durationMs)}ms
            </p>
          )}
        </header>

        <Sidebar
          surah={surah} setSurah={setSurah}
          ayah={ayah} setAyah={setAyah}
          include={include} setInclude={setInclude}
          sources={sources} setSources={setSources}
          reciter={reciter} setReciter={setReciter}
          edition={edition} setEdition={setEdition}
          tafsirId={tafsirId} setTafsirId={setTafsirId}
          loading={loading}
          refetch={refetch}
        />

        <div className="space-y-6">
          <DisplayCard
            result={result}
            loading={loading}
            include={include}
            refetch={refetch}
          />

          <CodeViewer
            result={result}
            include={include}
          />
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 border-t border-border py-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <nav className="flex items-center gap-6" aria-label="روابط المشروع">
            <a
              href="https://github.com/hadealahmad/quranrouter"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="مستودع المشروع على GitHub"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs font-medium"
            >
              <Github size={16} />
              المستودع
            </a>
            <a
              href="https://community.itqan.dev/d/399"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="النقاش الأصلي في مجتمع إتقان"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs font-medium"
            >
              <MessageSquare size={16} />
              نقاش إتقان
            </a>
          </nav>
          <a href="https://community.itqan.dev/d/399" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', borderRadius: '3px', overflow: 'hidden', fontSize: '11px', fontFamily: 'monospace', height: '20px', lineHeight: '20px', textDecoration: 'none' }}><span style={{ background: '#10b981', color: '#fff', padding: '0 8px', fontWeight: 'bold' }}>itqan</span><span style={{ background: '#f1f5f9', color: '#0f172a', padding: '0 8px' }}>ناقش</span></a>
        </div>
      </footer>
    </div>
  )
}

export default App
