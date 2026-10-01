import source from '../../docs/01-the-story.md?raw'
import cover from '../../docs/assets/the-story-cover-v3.png'
import faces from '../../docs/assets/maya-one-self-many-faces.png'
import presence from '../../docs/assets/professional-extending-presence-kurzgesagt.png'
import evolving from '../../docs/assets/maya-evolving-presence.png'

export type StorySection = {
  id: string
  title: string
  blocks: string[]
}

const imageUrls: Record<string, string> = {
  'assets/the-story-cover-v3.png': cover,
  'assets/maya-one-self-many-faces.png': faces,
  'assets/professional-extending-presence-kurzgesagt.png': presence,
  'assets/maya-evolving-presence.png': evolving,
}

// The source stays in docs. Only the explicitly excluded preface is omitted.
const storyStart = source.search(/^# The Story\s*$/m)
if (storyStart < 0) throw new Error('The story title was not found in the source document.')

export const storyTitle = source.slice(storyStart).split(/\r?\n/)[0].replace(/^# /, '').trim()
export const coverMarkdown = source.split(/\r?\n/)[0]

export const sections: StorySection[] = source
  .slice(storyStart)
  .split(/^## /m)
  .slice(1)
  .map((section, index) => {
    const [title, ...lines] = section.split(/\r?\n/)
    // Separate image lines even when the Markdown has no blank line before them.
    const body = lines.join('\n').replace(/\n(?=!\[)/g, '\n\n')
    return {
      id: `chapter-${index + 1}`,
      title: title.trim(),
      blocks: body.trim().split(/\n\s*\n/).filter(Boolean),
    }
  })

export function storyImageUrl(url: string) {
  if (!(url in imageUrls)) throw new Error(`Unknown story illustration: ${url}`)
  return imageUrls[url]
}
