import React from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PROVIDER_META, CAPABILITIES } from '@/configs/providers'

const labelClass = 'text-[10px] font-bold text-muted-foreground uppercase tracking-widest'

function AttemptTrail({ attempts }) {
  if (!attempts || attempts.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-1">
      {attempts.map((a, i) => (
        <span
          key={i}
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[9px] font-mono leading-none ${
            a.ok
              ? 'border-emerald-500/30 text-emerald-600 bg-emerald-500/10'
              : 'border-red-500/30 text-red-600 bg-red-500/10'
          }`}
        >
          <span className="font-bold">{a.adapterId}</span>
          {a.durationMs != null && <span>{Math.round(a.durationMs)}ms</span>}
          <span>{a.ok ? '✓' : '✗'}</span>
        </span>
      ))}
    </div>
  )
}

function TextPanel({ part }) {
  const meta = PROVIDER_META[part.source] || {}
  return (
    <div className="space-y-4 p-6 text-center">
      <h2
        className="text-4xl md:text-5xl font-bold text-foreground leading-[1.8] max-w-3xl mx-auto"
        style={{ fontFamily: meta.fontFamily || 'inherit' }}
      >
        {part.value.text}
      </h2>
      {part.value.meta && (
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          {Object.entries(part.value.meta).filter(([, v]) => v != null && v !== '').slice(0, 4).map(([k, v]) => (
            <span key={k} className="px-2 py-1 rounded bg-muted/50 border border-border/50">
              {k}: {String(v)}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function AudioPanel({ part }) {
  return (
    <div className="space-y-4 p-6 text-center">
      <p className="text-sm text-muted-foreground">
        القارئ: <span className="font-bold text-foreground">{part.value.reciter}</span>
      </p>
      <audio controls src={part.value.url} className="mx-auto w-full max-w-md" />
      <p className="text-xs text-muted-foreground">
        الصيغة: {part.value.format} | النطاق: {part.value.scope}
      </p>
    </div>
  )
}

const RTL_LANGUAGES = new Set(['ar', 'ur', 'fa', 'he', 'ps', 'sd'])

function TranslationPanel({ part }) {
  const isRtl = RTL_LANGUAGES.has(part.value.language)
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
        <span className="font-bold text-foreground">{part.value.edition}</span>
        <span className="px-1.5 py-0.5 rounded bg-muted/50 border border-border/50">
          {part.value.language}
        </span>
      </div>
      <p
        dir={isRtl ? 'rtl' : 'ltr'}
        className="text-lg md:text-xl leading-relaxed text-foreground max-w-3xl mx-auto text-center"
      >
        {part.value.text}
      </p>
    </div>
  )
}

function TafsirPanel({ part }) {
  return (
    <div className="space-y-4 p-6">
      <p className="text-xs text-muted-foreground text-center">
        التفسير: <span className="font-bold text-foreground">{part.value.tafsirId}</span>
      </p>
      <div className="max-h-80 overflow-y-auto text-base leading-relaxed text-foreground px-2">
        {part.value.text}
      </div>
    </div>
  )
}

function PartError({ error }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
      <AlertCircle className="text-destructive" size={28} />
      <p className="text-sm font-bold text-destructive">{error.code}</p>
      <p className="text-xs text-muted-foreground max-w-md">{error.message}</p>
    </div>
  )
}

function PartPanel({ capability, part, loading }) {
  const capMeta = CAPABILITIES.find((c) => c.id === capability)

  if (loading && !part) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-muted-foreground" size={24} />
      </div>
    )
  }

  if (part && !part.ok) {
    return (
      <div>
        <PartError error={part.error} />
        <div className="px-4 pb-4">
          <AttemptTrail attempts={part.attempts} />
        </div>
      </div>
    )
  }

  if (!part || !part.value) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-xs text-muted-foreground">غير متوفر</p>
      </div>
    )
  }

  return (
    <div>
      {capability === 'text' && <TextPanel part={part} />}
      {capability === 'audio' && <AudioPanel part={part} />}
      {capability === 'translation' && <TranslationPanel part={part} />}
      {capability === 'tafsir' && <TafsirPanel part={part} />}
      <div className="border-t border-border/50 px-4 py-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {part.source && (
            <span className="text-[9px] font-mono text-muted-foreground">
              المصدر: <span className="font-bold">{part.source}</span>
            </span>
          )}
          <AttemptTrail attempts={part.attempts} />
        </div>
      </div>
    </div>
  )
}

const DisplayCard = ({ result, loading, include, refetch }) => {
  if (loading && !result) {
    return (
      <Card className="min-h-[450px] flex flex-col justify-center items-center text-center shadow-none">
        <CardContent className="flex flex-col items-center gap-8">
          <div className="w-16 h-16 border-[3px] border-primary/10 border-t-primary rounded-full animate-spin" />
          <p className="text-xl font-bold">جاري جلب الآية...</p>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card className="min-h-[200px] flex flex-col justify-center items-center text-center shadow-none">
        <CardContent>
          <p className="text-sm text-muted-foreground">اختر الآية والمحتويات لعرض النتائج</p>
        </CardContent>
      </Card>
    )
  }

  if (!result.ok && !result.value) {
    return (
      <Card className="min-h-[450px] flex flex-col justify-center items-center text-center shadow-none">
        <CardContent>
          <AlertCircle className="text-destructive mx-auto mb-6" size={48} />
          <h3 className="text-2xl font-bold mb-3">فشل الاتصال</h3>
          <p className="text-muted-foreground text-sm mb-3">
            {result.error?.code}: {result.error?.message}
          </p>
          <Button variant="outline" className="mt-4" onClick={refetch}>
            إعادة المحاولة
          </Button>
        </CardContent>
      </Card>
    )
  }

  const composed = result.value
  const shownCaps = CAPABILITIES.filter((cap) => include.includes(cap.id))

  return (
    <Card className="shadow-none border-border overflow-hidden relative">
      {loading && (
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-center gap-2 bg-primary/10 border-b border-primary/20 py-1.5 text-[10px] font-bold text-primary">
          <Loader2 className="animate-spin" size={12} />
          جارٍ التحديث — النتائج المعروضة من الطلب السابق
        </div>
      )}
      <CardContent
        className={`p-0 divide-y divide-border/50 transition-opacity ${loading ? 'opacity-40' : ''}`}
      >
        {shownCaps.map((cap) => {
          const part = composed[cap.id]
          return (
            <div key={cap.id}>
              <div className={`px-4 py-2 ${labelClass} text-[9px] bg-muted/20 border-b border-border/50`}>
                {cap.label} — {cap.description}
              </div>
              <PartPanel capability={cap.id} part={part} loading={loading} />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default DisplayCard
