import source from '../../docs/02-product-requirements-and-mvp-scope.md?raw'
import relationships from '../../docs/assets/maya-mvp-relationships.png'
import publication from '../../docs/assets/maya-mvp-publication.png'
import handoff from '../../docs/assets/maya-mvp-handoff.png'

const [introduction, ...chapters] = source.trim().split(/^## /m)
const [heading, ...introLines] = introduction.trim().split(/\r?\n/)

export const scopeTitle = heading.replace(/^# /, '')
export const scopeStatus = introLines.join('\n').trim()
export const scopeSections = chapters.map((chapter) => {
  const [title, ...lines] = chapter.trim().split(/\r?\n/)
  return {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''),
    title,
    markdown: lines.join('\n').trim(),
  }
})

const images: Record<string, string> = {
  'assets/maya-mvp-relationships.png': relationships,
  'assets/maya-mvp-publication.png': publication,
  'assets/maya-mvp-handoff.png': handoff,
}

export const scopeImageDimensions: Record<string, { width: number; height: number }> = {
  [relationships]: { width: 1611, height: 976 },
  [publication]: { width: 1685, height: 933 },
  [handoff]: { width: 1586, height: 992 },
}

export function scopeImageUrl(url: string) {
  if (!(url in images)) throw new Error(`Unknown Maya scope illustration: ${url}`)
  return images[url]
}
