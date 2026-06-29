import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DisplayCard from './components/DisplayCard';
import CodeViewer from './components/CodeViewer';
import { useQuranRouter } from './hooks/useQuranRouter';
import { API_CONFIGS } from './configs/providers';
import { Search, Globe, ExternalLink } from 'lucide-react';

const App = () => {
  const [surah, setSurah] = useState(1);
  const [ayah, setAyah] = useState(1);
  const [sourceId, setSourceId] = useState('quran_foundation');

  const { data, loading, error, refetch } = useQuranRouter(surah, ayah, sourceId);

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-8">
        <Sidebar
          sourceId={sourceId}
          setSourceId={setSourceId}
          surah={surah}
          setSurah={setSurah}
          ayah={ayah}
          setAyah={setAyah}
          loading={loading}
          refetch={refetch}
        />

        <div className="space-y-6">
          <DisplayCard
            data={data}
            loading={loading}
            error={error}
            refetch={refetch}
            config={API_CONFIGS[sourceId]}
          />

          <CodeViewer data={data} />
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 border-t border-border py-16 text-center">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-12">
            <Search className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" size={18} />
            <Globe className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" size={18} />
            <ExternalLink className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" size={18} />
          </div>
          <div className="flex justify-center">
            <a href="https://community.itqan.dev/d/399" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', borderRadius: '3px', overflow: 'hidden', fontSize: '11px', fontFamily: 'monospace', height: '20px', lineHeight: '20px', textDecoration: 'none' }}><span style={{ background: '#10b981', color: '#fff', padding: '0 8px', fontWeight: 'bold' }}>itqan</span><span style={{ background: '#f1f5f9', color: '#0f172a', padding: '0 8px' }}>ناقش</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
