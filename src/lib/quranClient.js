import { createQuranClient } from 'quran-api-unified'

export const client = createQuranClient({
  timeoutMs: 15000,
  proxy: (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
})

export const adapters = client.listAdapters()
