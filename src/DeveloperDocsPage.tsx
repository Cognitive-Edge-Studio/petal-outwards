import { useEffect } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, Code2 } from 'lucide-react'
import { DocumentFooter, DocumentHeader } from '@/components/DocumentNavigation'
import { DocumentContent } from '@/components/DocumentContent'
import { developerDocument } from '@/content/documents'
import { useStoryMotion } from '@/hooks/use-story-motion'
import './scope.css'
import './documents.css'
import './developer-docs.css'

const quickLinks = [
  { id: 'integration-flow', title: 'Understand the integration', description: 'Where Maya fits in your application.' },
  { id: 'request-and-response-contract', title: 'Explore the contract', description: 'Scoped requests and typed action proposals.' },
  { id: 'code-examples', title: 'Make your first call', description: 'cURL and TypeScript integration examples.' },
]

export default function DeveloperDocsPage() {
  useStoryMotion()

  useEffect(() => {
    document.title = 'Petal — Developer Docs'
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Integrate Maya into your application: use cases, integration flow, proposed API structure, request and response contracts, and code examples.',
    )
  }, [])

  return <div className="story-site scope-site document-site developer-site">
    <a className="skip-link" href="#main">Skip to developer docs</a>
    <DocumentHeader active="developer" entries={developerDocument.sections} />
    <main id="main">
      <section className="developer-hero page-width" id="top" aria-labelledby="developer-title">
        <span className="hero-eyebrow"><span />DOCUMENT 08 · FOR BUILDERS</span>
        <div className="developer-hero-heading">
          <div>
            <h1 id="developer-title">Developer docs<span className="developer-title-dot">.</span></h1>
            <p className="developer-lead">Bring Maya into your application.</p>
            <p className="developer-description">Give each professional a consistent persona and each client a private relationship. Connect through one scoped, versioned API.</p>
            <a className="scope-cta" href={`#${developerDocument.sections[0].id}`}>Start reading<ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <div className="developer-stack" aria-label="Maya integration boundary">
            <Code2 size={28} strokeWidth={1.5} aria-hidden="true" />
            <p className="developer-stack-label">YOUR APPLICATION + MAYA</p>
            <dl>
              <div><dt>Your backend</dt><dd>Identity &amp; delivery</dd></div>
              <div><dt>Maya API</dt><dd>Context &amp; proposals</dd></div>
              <div><dt>Your application</dt><dd>Approve &amp; act</dd></div>
            </dl>
            <span className="developer-stack-note">HTTP / JSON · Server to server · Channel independent</span>
          </div>
        </div>
        <nav className="developer-quick-links" aria-label="Developer starting points">
          {quickLinks.map(link => <a key={link.id} href={`#${link.id}`}>
            <span><strong>{link.title}</strong><small>{link.description}</small></span><ArrowRight size={18} aria-hidden="true" />
          </a>)}
        </nav>
      </section>

      <div className="developer-layout page-width">
        <div className="developer-body">
          <div className="developer-status"><span>INTEGRATION CONTRACT · DRAFT</span><DocumentContent markdown={developerDocument.status} /></div>
          {developerDocument.sections.map((section, index) => <section key={section.id} id={section.id} className="developer-section" aria-labelledby={`${section.id}-title`}>
            <div className="chapter-heading">
              <span className="chapter-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}<span /></span>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
            </div>
            <DocumentContent markdown={section.markdown} />
          </section>)}
        </div>
      </div>
      <div className="scope-return page-width">
        <a className="document-return" href="/self-improving-loop"><ArrowLeft size={18} aria-hidden="true" /><span><small>DOCUMENT 07</small>Self-Improving Loop</span></a>
      </div>
    </main>
    <DocumentFooter />
  </div>
}
