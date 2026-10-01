import { useEffect, useRef } from 'react'
import { ArrowUp, BookOpen, Check, ChevronDown, Files, Flower2 } from 'lucide-react'

export type DocumentEntry = { id: string; title: string }

const documentLinks = [
  { id: 'story', href: '/', number: '01', label: 'The story' },
  { id: 'scope', href: '/maya-mvp-scope', number: '02', label: 'Maya MVP' },
  { id: 'petal', href: '/petal-mvp-scope', number: '03', label: 'Petal MVP' },
  { id: 'architecture', href: '/technical-architecture', number: '04', label: 'Architecture' },
  { id: 'roadmap', href: '/implementation-roadmap', number: '05', label: 'Roadmap' },
  { id: 'system-design', href: '/system-design', number: '06', label: 'System design' },
  { id: 'improvement', href: '/self-improving-loop', number: '07', label: 'Self Improving Mechanism' },
  { id: 'developer', href: '/developer-docs', number: '08', label: 'Developer docs' },
] as const

type ActiveDocument = typeof documentLinks[number]['id']

function useMenuDismissal() {
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
    const closeOtherMenus = () => {
      if (details.current?.open) {
        details.current.closest('header')?.querySelectorAll('details[open]').forEach(menu => {
          if (menu !== details.current) menu.removeAttribute('open')
        })
      }
    }
    const menu = details.current
    menu?.addEventListener('toggle', closeOtherMenus)
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeEscape)
    return () => {
      menu?.removeEventListener('toggle', closeOtherMenus)
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeEscape)
    }
  }, [])

  return details
}

function Documents({ active }: { active: ActiveDocument }) {
  const details = useMenuDismissal()
  const current = documentLinks.find(document => document.id === active)!

  return <details className="document-switcher" ref={details}>
    <summary aria-label={'Documents, current document: ' + current.label}>
      <Files size={16} aria-hidden="true" />
      <span className="document-menu-current"><span className="document-menu-number">{current.number}</span>{current.label}</span>
      <span className="document-menu-label">Documents</span>
      <ChevronDown size={14} className="contents-chevron" aria-hidden="true" />
    </summary>
    <nav className="document-menu-panel" aria-label="Documents">
      <span className="document-menu-heading">Project documents</span>
      <ol>{documentLinks.map(document => <li key={document.id}>
        <a href={document.href} aria-current={active === document.id ? 'page' : undefined} onClick={() => details.current?.removeAttribute('open')}>
          <span className="document-menu-number" aria-hidden="true">{document.number}</span>
          <span>{document.label}</span>
          {active === document.id && <Check size={16} aria-hidden="true" />}
        </a>
      </li>)}</ol>
    </nav>
  </details>
}

function Contents({ entries, label }: { entries: DocumentEntry[]; label: string }) {
  const details = useMenuDismissal()

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

export function DocumentHeader({ active, entries }: { active: ActiveDocument; entries: DocumentEntry[] }) {
  return (
    <header className="site-header">
      <div className="reading-progress" aria-hidden="true" />
      <div className="page-width header-inner">
        <a href="/" className="wordmark" aria-label="Petal, the story"><Flower2 size={30} strokeWidth={1.4} aria-hidden="true" /><span>petal<span className="wordmark-dot">.</span></span></a>
        <div className="header-menus">
          <Documents active={active} />
          <Contents entries={entries} label={active === 'story' ? 'Story chapters' : 'Document sections'} />
        </div>
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
