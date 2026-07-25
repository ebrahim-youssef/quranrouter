import { RefreshCw } from 'lucide-react'
import { adapters } from '@/lib/quranClient'
import { CAPABILITIES, RECITERS, EDITIONS, TAFSIRS } from '@/configs/providers'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const labelClass = 'text-[10px] font-bold text-muted-foreground uppercase tracking-widest'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const Sidebar = ({
  surah, setSurah,
  ayah, setAyah,
  include, setInclude,
  sources, setSources,
  reciter, setReciter,
  edition, setEdition,
  tafsirId, setTafsirId,
  loading,
  refetch,
}) => {
  const toggleCapability = (capId) => {
    if (include.includes(capId) && include.length <= 1) return
    setInclude((prev) =>
      prev.includes(capId)
        ? prev.filter((c) => c !== capId)
        : [...prev, capId]
    )
  }

  return (
    <div className="w-full">
      <Card className="shadow-none border-border overflow-visible">
        <CardContent className="p-2 md:p-3">
          <div className="flex flex-col gap-4">
            {/* Row 1: Reference + Capability toggles */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 bg-muted/30 p-1.5 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 px-2">
                  <Label htmlFor="surah-input" className={labelClass}>السورة</Label>
                  <Input
                    id="surah-input"
                    type="number" min="1" max="114"
                    value={surah}
                    onChange={(e) => setSurah(Math.max(1, Math.min(114, parseInt(e.target.value) || 1)))}
                    className="w-14 text-center font-bold h-7 px-1 bg-background"
                  />
                </div>

                <div className="w-px h-4 bg-border/60" />

                <div className="flex items-center gap-2 px-2">
                  <Label htmlFor="ayah-input" className={labelClass}>الآية</Label>
                  <Input
                    id="ayah-input"
                    type="number" min="1"
                    value={ayah}
                    onChange={(e) => setAyah(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center font-bold h-7 px-1 bg-background"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1 pr-2">
                <span className={`${labelClass} ml-2 whitespace-nowrap text-[9px]`}>المحتويات</span>
                {CAPABILITIES.map((cap) => (
                  <Button
                    key={cap.id}
                    variant={include.includes(cap.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleCapability(cap.id)}
                    className="h-7 px-2.5 text-[11px] font-bold"
                  >
                    {cap.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Row 2: Per-capability source selects */}
            {include.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {CAPABILITIES.filter((cap) => include.includes(cap.id)).map((cap) => {
                  const capAdapters = adapters.filter((a) => a.capabilities.includes(cap.id))
                  return (
                    <div key={cap.id} className="flex items-center gap-2">
                      <Label className={`${labelClass} whitespace-nowrap`}>{cap.label}</Label>
                      <Select
                        value={sources[cap.id] || 'auto'}
                        onValueChange={(val) =>
                          setSources((prev) => ({ ...prev, [cap.id]: val }))
                        }
                      >
                        <SelectTrigger className="h-7 text-xs bg-background min-w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">تلقائي</SelectItem>
                          {capAdapters.map((a) => {
                            const needsCreds = a.auth !== 'none'
                            return (
                              <SelectItem key={a.id} value={a.id} disabled={needsCreds}>
                                <span className={needsCreds ? 'opacity-50' : ''}>
                                  {a.name}
                                  {needsCreds ? ' (يتطلب مفاتيح)' : ''}
                                </span>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Row 3: Reciter / Edition / Tafsir selects + Refresh */}
            <div className="flex flex-wrap items-center gap-3">
              {include.includes('audio') && (
                <div className="flex items-center gap-2">
                  <Label className={`${labelClass} whitespace-nowrap`}>القارئ</Label>
                  <Select value={reciter} onValueChange={setReciter}>
                    <SelectTrigger className="h-7 text-xs bg-background min-w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RECITERS.map((r) => (
                        <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {include.includes('translation') && (
                <div className="flex items-center gap-2">
                  <Label className={`${labelClass} whitespace-nowrap`}>الترجمة</Label>
                  <Select value={edition} onValueChange={setEdition}>
                    <SelectTrigger className="h-7 text-xs bg-background min-w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EDITIONS.map((e) => (
                        <SelectItem key={e.id} value={e.id}>{e.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {include.includes('tafsir') && (
                <div className="flex items-center gap-2">
                  <Label className={`${labelClass} whitespace-nowrap`}>التفسير</Label>
                  <Select value={tafsirId} onValueChange={setTafsirId}>
                    <SelectTrigger className="h-7 text-xs bg-background min-w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TAFSIRS.map((t) => (
                        <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="mr-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refetch}
                  className="h-7 px-3 gap-2 font-bold text-xs"
                >
                  <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                  تحديث
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Sidebar
