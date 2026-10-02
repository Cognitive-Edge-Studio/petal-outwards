import source from '../../docs/case-studies/eudora.md?raw'

const [introduction, ...chapters] = source.trim().split(/^## /m)
const [, ...introLines] = introduction.trim().split(/\r?\n/)

// Keep the narrative source; draft metadata and discussion prompts stay in the document.
export const eudoraIntroduction = introLines.join('\n').trim().split(/\n\s*\n/).slice(1, 3).join('\n\n')
export const eudoraSections = chapters.map(chapter => {
  const [title, ...lines] = chapter.trim().split(/\r?\n/)
  return {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''),
    title,
    markdown: lines.join('\n').trim(),
  }
}).filter(section => section.title !== 'Questions for the next discussion')
