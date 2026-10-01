import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { documentImageDimensions, documentUrl } from '@/content/documents'

function Markdown({ markdown }: { markdown: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}
    urlTransform={(url, key) => documentUrl(url, key === 'src')}
    components={{
      p: ({ node, children }) => {
        if (node?.children.some(child => child.type === 'element' && child.tagName === 'img')) {
          return <div className="scope-figure" data-reveal>{children}</div>
        }
        const caption = node?.children.length === 1 && node.children[0].type === 'element' && node.children[0].tagName === 'em'
        return <p className={caption ? 'scope-caption' : undefined} data-document-copy>{children}</p>
      },
      img: ({ src, alt }) => <a className="scope-figure-link" href={src} target="_blank" rel="noreferrer" aria-label={'View full-size illustration: ' + alt}>
        <img src={src} alt={alt} {...documentImageDimensions[src ?? '']} loading="lazy" decoding="async" data-document-image />
        <span className="figure-expand" aria-hidden="true">View full size ↗</span>
      </a>,
      table: ({ children }) => <div className="document-table-scroll" tabIndex={0} role="region" aria-label="Document table"><table>{children}</table></div>,
      h3: ({ children }) => <h3 data-document-copy>{children}</h3>,
    }}
  >{markdown}</ReactMarkdown>
}

export function DocumentContent({ markdown }: { markdown: string }) {
  // The source has a single known disclosure pattern. Keep its source editable
  // without enabling arbitrary HTML in the public document renderer.
  const parts = markdown.split(/(<details>[\s\S]*?<\/details>)/g)
  return <div className="scope-content document-content">{parts.map((part, index) => {
    const disclosure = part.match(/^<details>\s*<summary>(.*?)<\/summary>([\s\S]*?)<\/details>$/)
    return disclosure
      ? <details className="document-source" key={index}><summary>{disclosure[1]}</summary><Markdown markdown={disclosure[2]} /></details>
      : <Markdown key={index} markdown={part} />
  })}</div>
}
