import source from '../../docs/case-studies/buzybuzz.md?raw'

const [introduction, ...chapters] = source.trim().split(/^## /m)
export const buzyBuzzIntroduction = introduction.trim().split(/\r?\n/).slice(1).join('\n').trim()
export const buzyBuzzSections = chapters.map(chapter => {
  const [title, ...lines] = chapter.trim().split(/\r?\n/)
  return {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''),
    title,
    markdown: lines.join('\n').trim(),
  }
})
