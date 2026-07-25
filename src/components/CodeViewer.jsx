import React, { useState, useEffect } from 'react'
import { Braces, Database, FileJson, ArrowLeftRight, Copy, Check } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CAPABILITIES } from '@/configs/providers'

const CopyButton = ({ value, label }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      console.error('Clipboard copy failed', e)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!value}
      aria-label={copied ? 'تم النسخ' : `نسخ ${label}`}
      className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {copied ? <Check size={11} className="text-primary" /> : <Copy size={11} />}
      {copied ? 'تم النسخ' : 'نسخ'}
    </button>
  )
}

function formatRaw(raw) {
  if (raw === undefined || raw === null) return '// غير متوفر'
  if (typeof raw === 'string') return raw
  return JSON.stringify(raw, null, 2)
}

function rawSize(raw) {
  if (raw === undefined || raw === null) return 0
  if (typeof raw === 'string') return raw.length
  return JSON.stringify(raw).length
}

const CodeViewer = ({ result, include }) => {
  const capIds = include.length > 0 ? include : ['text']
  const [activeTab, setActiveTab] = useState(capIds[0])

  useEffect(() => {
    if (!capIds.includes(activeTab)) {
      setActiveTab(capIds[0])
    }
  }, [include, activeTab])

  const composed = result?.value

  return (
    <Card className="shadow-none border-border overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b py-4 px-6 flex flex-row items-center justify-between space-y-0 bg-muted/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileJson className="text-primary" size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm">مقارنة البيانات والتحويل</h3>
            <p className="text-[11px] text-muted-foreground">تتبع تحويل البيانات من المصدر إلى الهيكلية الموحدة لكل محتوى</p>
          </div>
        </div>
        <ArrowLeftRight className="text-muted-foreground/30" size={20} />
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 pt-3">
          <TabsList>
            {capIds.map((cap) => {
              const meta = CAPABILITIES.find((c) => c.id === cap)
              return (
                <TabsTrigger key={cap} value={cap}>
                  {meta?.label || cap}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {capIds.map((cap) => {
          const part = composed?.[cap]
          const rawDisplay = formatRaw(part?.raw)
          const unifiedDisplay = part?.value ? JSON.stringify(part.value, null, 2) : '// غير متوفر'
          const rSize = rawSize(part?.raw)
          const uSize = part?.value ? JSON.stringify(part.value).length : 0

          return (
            <TabsContent key={cap} value={cap} className="mt-0">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse min-h-[500px]">
                  {/* Raw Data Column — "BEFORE" */}
                  <div className="flex flex-col h-full overflow-hidden border-l md:border-l-0">
                    <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b">
                      <div className="flex items-center gap-2">
                        <Database className="text-muted-foreground" size={14} />
                        <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">البيانات الخام (قبل)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {rSize > 0 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                            {rSize} حرف
                          </span>
                        )}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">Raw</span>
                        <CopyButton value={rawDisplay} label="البيانات الخام" />
                      </div>
                    </div>
                    <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-transparent code-font text-[13px] leading-relaxed">
                      <pre className="text-muted-foreground/70 whitespace-pre-wrap break-words">
                        {rawDisplay}
                      </pre>
                    </div>
                  </div>

                  {/* Unified Structure Column — "AFTER" */}
                  <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-primary/5 border-b border-primary/10">
                      <div className="flex items-center gap-2">
                        <Braces className="text-primary" size={14} />
                        <span className="text-[12px] font-bold text-primary uppercase tracking-wider">الهيكلية الموحدة (بعد)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {uSize > 0 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono">
                            {uSize} حرف
                          </span>
                        )}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold">Unified</span>
                        <CopyButton value={unifiedDisplay} label="الهيكلية الموحدة" />
                      </div>
                    </div>
                    <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-primary/[0.02] code-font text-[13px] leading-relaxed">
                      <pre className="text-primary whitespace-pre-wrap break-words">
                        {unifiedDisplay}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          )
        })}
      </Tabs>
    </Card>
  )
}

export default CodeViewer
