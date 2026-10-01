import petalSource from '../../docs/03-petal-product-requirements-and-mvp-scope.md?raw'
import architectureSource from '../../docs/04-technical-architecture-and-engineering-guidelines.md?raw'
import roadmapSource from '../../docs/05-implementation-roadmap-pilot-plan-and-launch-criteria.md?raw'
import systemDesignSource from '../../docs/06-system-design-document.md?raw'
import improvementSource from '../../docs/07-self-improving-loop-design-and-mvp-scope.md?raw'
import developerSource from '../../docs/08-maya-developer-docs.md?raw'

export type DocumentId = 'petal' | 'architecture' | 'roadmap' | 'system-design' | 'improvement'
export const documentRoutes: Record<string, string> = {
  '01-the-story.md': '/',
  '02-product-requirements-and-mvp-scope.md': '/maya-mvp-scope',
  '03-petal-product-requirements-and-mvp-scope.md': '/petal-mvp-scope',
  '04-technical-architecture-and-engineering-guidelines.md': '/technical-architecture',
  '05-implementation-roadmap-pilot-plan-and-launch-criteria.md': '/implementation-roadmap',
  '06-system-design-document.md': '/system-design',
  '07-self-improving-loop-design-and-mvp-scope.md': '/self-improving-loop',
  '08-maya-developer-docs.md': '/developer-docs',
}
const files = import.meta.glob('../../docs/**/*.md', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const documentSourceAliases: Record<string, string> = {
  '../conversation-notes.md': 'references/conversation-notes.md',
}
const images = import.meta.glob([
  '../../docs/assets/petal-mvp-*.png',
  '../../docs/assets/technical-architecture-*.png',
  '../../docs/assets/implementation-roadmap-*.png',
  '../../docs/assets/system-design-*.png',
  '../../docs/assets/self-improving-loop-*.png',
  '../../docs/assets/maya-petal-system-context.png',
  '../../docs/assets/client-message-to-maya-reply.png',
  '../../docs/assets/deployment-and-operations.png',
], { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const systemDesignImageDimensions: Record<string, { width: number; height: number }> = {
  'maya-petal-system-context.png': { width: 1586, height: 992 },
  'client-message-to-maya-reply.png': { width: 1355, height: 1161 },
  'deployment-and-operations.png': { width: 1477, height: 1065 },
}

export const documentImageDimensions: Record<string, { width: number; height: number }> = Object.fromEntries(
  Object.entries(images).map(([path, url]) => [url, systemDesignImageDimensions[path.split('/').at(-1) ?? ''] ?? (path.includes('petal-mvp-')
    ? { width: path.includes('continuity') ? 1575 : 1576, height: path.includes('continuity') ? 999 : 998 }
    : { width: 1536, height: 1024 })]),
)

export function documentUrl(url: string, image = false) {
  if (image) {
    const asset = images['../../docs/' + url]
    if (!asset) throw new Error('Missing document illustration: ' + url)
    return asset
  }
  return documentRoutes[url] ?? files['../../docs/' + (documentSourceAliases[url] ?? url)] ?? url
}

function parseDocument(source: string) {
  const [introduction, ...chapters] = source.trim().split(/^## /m)
  const [heading, ...introLines] = introduction.trim().split(/\r?\n/)
  return {
    title: heading.replace(/^# /, ''),
    status: introLines.join('\n').trim(),
    sections: chapters.map(chapter => {
      const [title, ...lines] = chapter.trim().split(/\r?\n/)
      return {
        id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''),
        title,
        markdown: lines.join('\n').trim(),
      }
    }),
  }
}

export const developerDocument = parseDocument(developerSource)

export const documents = {
  petal: { ...parseDocument(petalSource), number: '03', label: 'THE CLIENT EXPERIENCE', file: '03-petal-product-requirements-and-mvp-scope.md' },
  architecture: { ...parseDocument(architectureSource), number: '04', label: 'THE ENGINEERING FOUNDATION', file: '04-technical-architecture-and-engineering-guidelines.md' },
  roadmap: { ...parseDocument(roadmapSource), number: '05', label: 'THE PATH TO LAUNCH', file: '05-implementation-roadmap-pilot-plan-and-launch-criteria.md' },
  'system-design': { ...parseDocument(systemDesignSource), number: '06', label: 'THE IMPLEMENTABLE DESIGN', file: '06-system-design-document.md' },
  improvement: { ...parseDocument(improvementSource), number: '07', label: 'THE BOUNDED LEARNING LOOP', file: '07-self-improving-loop-design-and-mvp-scope.md' },
}
