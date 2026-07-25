import { useState, useEffect, useCallback, useRef } from 'react'
import { client } from '../lib/quranClient'

export const useQuranRouter = ({ surah, ayah, include, sources, reciter, edition, tafsirId }) => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [durationMs, setDurationMs] = useState(null)
  const requestIdRef = useRef(0)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const thisReq = ++requestIdRef.current

    const sourceOpt = {}
    for (const cap of include) {
      if (sources[cap] && sources[cap] !== 'auto') {
        sourceOpt[cap] = { id: sources[cap] }
      }
    }

    const params = {
      ref: { surah: Number(surah), ayah: Number(ayah) },
      include,
      includeRaw: true,
      ...(Object.keys(sourceOpt).length ? { source: sourceOpt } : {}),
      ...(include.includes('audio') && reciter ? { reciter } : {}),
      ...(include.includes('translation') && edition ? { edition } : {}),
      ...(include.includes('tafsir') && tafsirId ? { tafsirId } : {}),
    }

    const start = performance.now()
    try {
      const res = await client.get(params)
      const elapsed = performance.now() - start
      if (requestIdRef.current !== thisReq) return
      setResult(res)
      setDurationMs(elapsed)
    } catch (err) {
      if (requestIdRef.current !== thisReq) return
      setResult({
        ok: false,
        error: { code: 'client_error', message: err.message || String(err) },
        attempts: [],
      })
      setDurationMs(performance.now() - start)
    } finally {
      if (requestIdRef.current === thisReq) {
        setLoading(false)
      }
    }
  }, [surah, ayah, include, sources, reciter, edition, tafsirId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { result, loading, durationMs, refetch: fetchData }
}
