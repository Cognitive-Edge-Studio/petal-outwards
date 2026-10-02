import { useEffect, useRef, useState } from 'react'
import { Menu } from '@base-ui/react/menu'
import { ArrowUp, BookOpen, ChevronDown, ChevronLeft, ChevronRight, Flower2, Search } from 'lucide-react'
import { caseStudies, type CaseStudyId } from '@/content/case-studies'

export type DocumentEntry = { id: string; title: string; markdown?: string }

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

type ActiveDocument = typeof documentLinks[number]['id'] | CaseStudyId

function CaseStudies({ active }: { active: ActiveDocument }) {
  const current = caseStudies.find(study => study.id === active)
  return <nav className="case-studies-nav" aria-label="Case studies">
    <Menu.Root>
      <Menu.Trigger className="case-studies-trigger" data-active={!!current} aria-label={current ? `Case studies, ${current.label} selected` : 'Case studies'}>
        Case studies<ChevronDown size={14} aria-hidden="true" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="case-studies-positioner" sideOffset={10} align="end">
          <Menu.Popup className="case-studies-menu" data-case-study={current?.id}>
            <Menu.Group>
              <Menu.GroupLabel className="case-studies-label">Maya in practice</Menu.GroupLabel>
              {caseStudies.map(study => <Menu.LinkItem key={study.id} href={study.href} closeOnClick className="case-studies-item" aria-current={active === study.id ? 'page' : undefined}>
                <span><strong>{study.label}</strong><small>{study.description}</small></span><ChevronRight size={16} aria-hidden="true" />
              </Menu.LinkItem>)}
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  </nav>
}

function Documents({ active }: { active: ActiveDocument }) {
  const nav = useRef<HTMLElement>(null)
  const [scroll, setScroll] = useState({ overflow: false, previous: false, next: false })

  useEffect(() => {
    const element = nav.current!
    const update = () => {
      const overflow = element.scrollWidth > element.clientWidth + 1
      const previous = element.scrollLeft > 1
      const next = element.scrollLeft + element.clientWidth < element.scrollWidth - 1
      setScroll(current => current.overflow === overflow && current.previous === previous && current.next === next ? current : { overflow, previous, next })
    }
    const revealCurrent = () => {
      const link = element.querySelector<HTMLElement>('[aria-current="page"]')
      if (link) element.scrollLeft = link.offsetLeft - (element.clientWidth - link.offsetWidth) / 2
      update()
    }
    const observer = new ResizeObserver(revealCurrent)
    observer.observe(element)
    element.addEventListener('scroll', update, { passive: true })
    let mounted = true
    document.fonts.ready.then(() => { if (mounted) revealCurrent() })
    revealCurrent()
    return () => {
      mounted = false
      observer.disconnect()
      element.removeEventListener('scroll', update)
    }
  }, [active])

  const move = (direction: number) => nav.current?.scrollBy({ left: direction * nav.current.clientWidth * .7, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })

  return <div className="document-nav-shell">
    <button className="route-scroll" hidden={!scroll.overflow} disabled={!scroll.previous} onClick={() => move(-1)} aria-label="Show previous documents"><ChevronLeft size={16} aria-hidden="true" /></button>
    <nav className="document-nav" aria-label="Documents" ref={nav}>
      {documentLinks.map(document => (
        <a key={document.id} href={document.href} aria-current={active === document.id ? 'page' : undefined}>
          <span aria-hidden="true">{document.number}</span>{document.label}
        </a>
      ))}
    </nav>
    <button className="route-scroll" hidden={!scroll.overflow} disabled={!scroll.next} onClick={() => move(1)} aria-label="Show next documents"><ChevronRight size={16} aria-hidden="true" /></button>
  </div>
}

function ReadingContents({ entries, searchable }: { entries: DocumentEntry[]; searchable: boolean }) {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(entries[0]?.id)
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 1100px)').matches)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const list = useRef<HTMLOListElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const activeIndex = Math.max(0, entries.findIndex(entry => entry.id === current))
  const normalizedQuery = query.trim().toLowerCase()
  const matches = entries.filter(entry => `${entry.title} ${entry.markdown ?? ''}`.toLowerCase().includes(normalizedQuery))

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('main > .scope-hero, main > .hero, main > .developer-hero')
    const main = document.querySelector('main')
    const sections = entries.map(entry => document.getElementById(entry.id))
    const media = window.matchMedia('(max-width: 1100px)')
    const updateCompact = () => { setCompact(media.matches); setOpen(false) }
    let frame = 0
    const update = () => {
      frame = 0
      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 86
      setVisible(!!hero && hero.getBoundingClientRect().bottom <= headerHeight + 64 && (main?.getBoundingClientRect().bottom ?? 0) > headerHeight + 160)
      let index = 0
      sections.forEach((section, candidate) => {
        if (section && section.getBoundingClientRect().top <= headerHeight + 160) index = candidate
      })
      setCurrent(entries[index]?.id)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    if (main) observer.observe(main)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    media.addEventListener('change', updateCompact)
    update()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      media.removeEventListener('change', updateCompact)
    }
  }, [entries])

  useEffect(() => {
    const active = list.current?.querySelector<HTMLElement>('[aria-current="location"]')
    if (active && list.current && !normalizedQuery) {
      const viewport = list.current.getBoundingClientRect()
      const item = active.getBoundingClientRect()
      if (item.top < viewport.top || item.bottom > viewport.bottom) list.current.scrollTop += item.top - viewport.top - viewport.height / 3
    }
  }, [current, visible, open, normalizedQuery])

  useEffect(() => {
    if (!open) return
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [open])

  if (!visible) return null

  return <aside className={`reading-contents ${open ? 'reading-contents-open' : ''}`} aria-label="Reading guide">
    <div className="reading-contents-heading"><BookOpen size={15} aria-hidden="true" /><span>ON THIS PAGE</span><span>{String(activeIndex + 1).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}</span></div>
    {compact ? <button ref={toggle} className="reading-contents-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="reading-sections"><span>Contents</span><ChevronDown size={16} aria-hidden="true" /></button> : <h2 className="reading-contents-toggle">Contents</h2>}
    <p className="reading-current">{entries[activeIndex]?.title}</p>
    <nav className="reading-sections" id="reading-sections" aria-label="Document sections">
      {searchable && <label className="reading-search"><Search size={14} aria-hidden="true" /><input type="search" placeholder="Find a section…" aria-label="Find a section" value={query} onChange={event => setQuery(event.target.value)} /></label>}
      {normalizedQuery && <p className="reading-search-status" role="status">{matches.length} matching {matches.length === 1 ? 'section' : 'sections'}</p>}
      <ol ref={list}>
        {matches.map(entry => <li key={entry.id}><a href={`#${entry.id}`} aria-current={current === entry.id ? 'location' : undefined} onClick={() => { setCurrent(entry.id); setOpen(false); if (compact) toggle.current?.focus({ preventScroll: true }) }}><span aria-hidden="true">{String(entries.indexOf(entry) + 1).padStart(2, '0')}</span>{entry.title}</a></li>)}
      </ol>
      {matches.length === 0 && <p className="reading-search-status">No matching sections.</p>}
    </nav>
  </aside>
}

export function DocumentHeader({ active, entries }: { active: ActiveDocument; entries: DocumentEntry[] }) {
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateHeight = () => {
      if (header.current) {
        document.documentElement.style.setProperty('--document-header-height', `${header.current.getBoundingClientRect().height}px`)
      }
    }
    const observer = new ResizeObserver(updateHeight)
    if (header.current) observer.observe(header.current)
    updateHeight()
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty('--document-header-height')
    }
  }, [])

  return <>
    <header className="site-header" ref={header}>
      <div className="reading-progress" aria-hidden="true" />
      <div className="page-width header-inner">
        <a href="/" className="wordmark" aria-label="Petal, the story"><Flower2 size={30} strokeWidth={1.4} aria-hidden="true" /><span>petal<span className="wordmark-dot">.</span></span></a>
        <div className="document-header-navigation"><Documents active={active} /><CaseStudies active={active} /></div>
      </div>
    </header>
    <ReadingContents entries={entries} searchable={active === 'developer'} />
  </>
}

export function DocumentFooter() {
  return (
    <footer className="site-footer dark-chapter">
      <div className="page-width footer-inner"><a href="/" className="wordmark" aria-label="Petal, the story"><Flower2 size={26} strokeWidth={1.4} aria-hidden="true" /><span>petal<span className="wordmark-dot">.</span></span></a><a href="#top" className="back-top">Back to top<ArrowUp size={16} aria-hidden="true" /></a></div>
    </footer>
  )
}
