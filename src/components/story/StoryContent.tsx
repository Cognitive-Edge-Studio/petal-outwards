import ReactMarkdown from 'react-markdown'
import { storyImageUrl } from '@/content/story'

type StoryContentProps = {
  markdown: string
  className?: string
  eager?: boolean
}

export function StoryContent({ markdown, className = '', eager = false }: StoryContentProps) {
  return (
    <div className={`story-content ${className}`}>
      <ReactMarkdown
        urlTransform={storyImageUrlOrOriginal}
        components={{
          p: ({ children }) => <p data-story-copy>{children}</p>,
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              width={1536}
              height={1024}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={eager ? 'high' : 'auto'}
              data-story-image
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

function storyImageUrlOrOriginal(url: string, key: string) {
  return key === 'src' ? storyImageUrl(url) : url
}
