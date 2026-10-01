import { useEffect, useRef } from 'react'
import { ArrowUp, BookOpen, ChevronDown, Flower2 } from 'lucide-react'

export type DocumentEntry = { id: string; title: string }

function Contents({ entries, label }: { entries: DocumentEntry[]; label: string }) {
  const details = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !details.current?.contains(event.target)) {
        details.current?.removeAttribute('open')
      }
    }
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && details.current?.open) {
        details.current.removeAttribute('open')
        details.current.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeEscape)
    }
  }, [])

  return (
    <details className="contents" ref={details}>
      <summary><BookOpen size={16} aria-hidden="true" /><span>Contents</span><ChevronDown size={14} className="contents-chevron" aria-hidden="true" /></summary>
      <nav className="contents-panel" aria-label={label}>
        <ol>
          {entries.map((entry, index) => (
            <li key={entry.id}>
              <a href={`#${entry.id}`} onClick={() => details.current?.removeAttribute('open')}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{entry.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  )
}

export function DocumentHeader({ active, entries }: { active: 'story' | 'scope' | 'petal' | 'architecture' | 'roadmap' | 'system-design' | 'improvement'; entries: DocumentEntry[] }) {
  return (
    <header className="site-header">
      <div className="reading-progress" aria-hidden="true" />
      <div className="page-width header-inner">
        <a href="/" className="wordmark" aria-label="Petal, the story"><Flower2 size={30} strokeWidth={1.4} aria-hidden="true" /><span>petal<span className="wordmark-dot">.</span></span></a>
        <nav className="document-nav" aria-label="Documents">
          <a href="/" aria-current={active === 'story' ? 'page' : undefined}><span aria-hidden="true">01</span>The story</a>
          <a href="/maya-mvp-scope" aria-current={active === 'scope' ? 'page' : undefined}><span aria-hidden="true">02</span>Maya MVP</a>
          <a href="/petal-mvp-scope" aria-current={active === 'petal' ? 'page' : undefined}><span aria-hidden="true">03</span>Petal MVP</a>
          <a href="/technical-architecture" aria-current={active === 'architecture' ? 'page' : undefined}><span aria-hidden="true">04</span>Architecture</a>
          <a href="/implementation-roadmap" aria-current={active === 'roadmap' ? 'page' : undefined}><span aria-hidden="true">05</span>Roadmap</a>
          <a href="/system-design" aria-current={active === 'system-design' ? 'page' : undefined}><span aria-hidden="true">06</span>System design</a>
          <a href="/self-improving-loop" aria-current={active === 'improvement' ? 'page' : undefined}><span aria-hidden="true">07</span>Improvement</a>
        </nav>
        <Contents entries={entries} label={active === 'story' ? 'Story chapters' : 'Document sections'} />
      </div>
    </header>
  )
}

export function DocumentFooter() {
  return (
    <footer className="site-footer dark-chapter">
      <div className="page-width footer-inner"><a href="/" className="wordmark" aria-label="Petal, the story"><Flower2 size={26} strokeWidth={1.4} aria-hidden="true" /><span>petal<span className="wordmark-dot">.</span></span></a><a href="#top" className="back-top">Back to top<ArrowUp size={16} aria-hidden="true" /></a></div>
    </footer>
  )
}
