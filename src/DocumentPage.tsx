import { useEffect } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { DocumentFooter, DocumentHeader } from '@/components/DocumentNavigation'
import { DocumentContent } from '@/components/DocumentContent'
import { documents } from '@/content/documents'
import type { DocumentId } from '@/content/documents'
import { useStoryMotion } from '@/hooks/use-story-motion'
import petalCover from '../docs/assets/petal-mvp-cover.png'
import architectureCover from '../docs/assets/technical-architecture-cover.png'
import roadmapCover from '../docs/assets/implementation-roadmap-cover.png'
import systemDesignCover from '../docs/assets/system-design-cover.png'
import improvementCover from '../docs/assets/self-improving-loop-cover.png'
import './scope.css'
import './documents.css'

const pageDetails = {
  petal: {
    description: 'Petal MVP: the professional setup, client journey, private relationship continuity, and human handoff.',
    previous: { href: '/maya-mvp-scope', number: '02', title: 'Maya MVP Scope' },
    next: { href: '/technical-architecture', number: '04', title: 'Technical Architecture' },
  },
  architecture: {
    description: 'Maya and Petal technical architecture: service boundaries, data ownership, controlled improvement, and engineering guidelines.',
    previous: { href: '/petal-mvp-scope', number: '03', title: 'Petal MVP Scope' },
    next: { href: '/implementation-roadmap', number: '05', title: 'Implementation Roadmap' },
  },
  roadmap: {
    description: 'Maya and Petal implementation roadmap: build dependencies, human-approved improvement, staged pilot, and evidence required for launch.',
    previous: { href: '/technical-architecture', number: '04', title: 'Technical Architecture' },
    next: { href: '/system-design', number: '06', title: 'System Design' },
  },
  'system-design': {
    description: 'Maya and Petal system design: service contracts, critical flows, conversation ownership, safe data changes, and tested improvements.',
    previous: { href: '/implementation-roadmap', number: '05', title: 'Implementation Roadmap' },
    next: { href: '/self-improving-loop', number: '07', title: 'Self-Improving Loop' },
  },
  improvement: {
    description: 'Maya and Petal self-improving loop: scoped feedback, protected evidence, bounded candidates, isolated tests, and explicit owner publication.',
    previous: { href: '/system-design', number: '06', title: 'System Design' },
    next: { href: '/developer-docs', number: '08', title: 'Developer Docs' },
  },
}

const documentCovers: Record<DocumentId, { src: string; description: string }> = {
  petal: {
    src: petalCover,
    description: 'A professional reviews an approved document in her private workspace, while three clients use their phones in separate conversation vignettes connected by golden botanical stems.',
  },
  architecture: {
    src: architectureCover,
    description: 'Isometric technical architecture illustration: separate Petal and Maya services connect through a controlled API bridge, with distinct databases and document storage, channel adapters, an external model, and engineers reviewing the system.',
  },
  roadmap: {
    src: roadmapCover,
    description: 'A winding implementation path passes through Maya construction and validation, Petal integration, readiness checks, a supervised pilot, and a reviewed limited launch.',
  },
  'system-design': {
    src: systemDesignCover,
    description: 'An engineered message-processing cutaway shows ordered scoped events, Maya knowledge and private memory, typed proposals, a human-controlled authorization gate, outbound dispatch, and delivery records.',
  },
  improvement: {
    src: improvementCover,
    description: 'A circular Maya improvement workshop connects scoped feedback, a bounded candidate, isolated comparison tests, professional review and publication, and observation with a previous-version restore path.',
  },
}

export default function DocumentPage({ documentId }: { documentId: DocumentId }) {
  const document = documents[documentId]
  const details = pageDetails[documentId]
  const cover = documentCovers[documentId]
  useStoryMotion()
  useEffect(() => {
    window.document.title = 'Petal — ' + document.title
    window.document.querySelector('meta[name="description"]')?.setAttribute('content', details.description)
  }, [document, details])

  return <div className="story-site scope-site document-site">
    <a className="skip-link" href="#main">Skip to document</a>
    <DocumentHeader active={documentId} entries={document.sections} />
    <main id="main">
      <section className="scope-hero page-width" id="top" aria-labelledby="document-title">
        <div className="scope-hero-copy">
          <span className="hero-eyebrow"><span />DOCUMENT {document.number} · {document.label}</span>
          <h1 id="document-title" data-document-copy>{document.title}</h1>
          <DocumentContent markdown={document.status} />
          <a className="scope-cta" href={'#' + document.sections[0].id}>Explore the document<ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <figure className="scope-cover">
          <img src={cover.src} alt={cover.description} width={1536} height={1024} loading="eager" decoding="async" fetchPriority="high" />
        </figure>
        <div className="scope-hero-bottom" aria-hidden="true"><span>Maya &amp; Petal · Project documents</span><span>{document.number} / {documentId.toUpperCase()}</span></div>
      </section>
      {document.sections.map((section, index) => <section key={section.id} id={section.id} className="scope-section document-section" aria-labelledby={section.id + '-title'}>
        <div className="page-width scope-section-inner">
          <div className="chapter-heading" data-reveal>
            <span className="chapter-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}<span /></span>
            <h2 id={section.id + '-title'} data-document-copy>{section.title}</h2>
          </div>
          <DocumentContent markdown={section.markdown} />
        </div>
      </section>)}
      <div className="scope-return page-width document-pagination">
        <a className="document-return" href={details.previous.href}><ArrowLeft size={18} aria-hidden="true" /><span><small>DOCUMENT {details.previous.number}</small>{details.previous.title}</span></a>
        {details.next && <a className="document-return" href={details.next.href}><span><small>DOCUMENT {details.next.number}</small>{details.next.title}</span><ArrowRight size={18} aria-hidden="true" /></a>}
      </div>
    </main>
    <DocumentFooter />
  </div>
}
