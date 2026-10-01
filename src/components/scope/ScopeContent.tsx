import ReactMarkdown from 'react-markdown'
import { scopeImageDimensions, scopeImageUrl } from '@/content/scope'

export function ScopeContent({ markdown }: { markdown: string }) {
  return (
    <div className="scope-content">
      <ReactMarkdown
        urlTransform={(url, key) => key === 'src' ? scopeImageUrl(url) : url}
        components={{
          p: ({ node, children }) => {
            if (node?.children.some((child) => child.type === 'element' && child.tagName === 'img')) {
              return <div className="scope-figure" data-reveal>{children}</div>
            }
            const caption = node?.children.length === 1 && node.children[0].type === 'element' && node.children[0].tagName === 'em'
            return <p className={caption ? 'scope-caption' : undefined} data-scope-copy data-reveal>{children}</p>
          },
          li: ({ children }) => <li data-scope-copy data-reveal>{children}</li>,
          img: ({ src, alt }) => (
            <a href={src} target="_blank" rel="noreferrer" aria-label={`View full-size illustration: ${alt}`} className="scope-figure-link">
              <img src={src} alt={alt} {...scopeImageDimensions[src ?? '']} loading="lazy" decoding="async" data-scope-image />
              <span className="figure-expand" aria-hidden="true">View full size ↗</span>
            </a>
          ),
        }}
      >{markdown}</ReactMarkdown>
    </div>
  )
}
