import { useEffect } from 'react'
import { ArrowDown, ArrowLeft, Flower2 } from 'lucide-react'
import { DocumentFooter, DocumentHeader } from '@/components/DocumentNavigation'
import { ScopeContent } from '@/components/scope/ScopeContent'
import { scopeSections, scopeStatus, scopeTitle } from '@/content/scope'
import { useStoryMotion } from '@/hooks/use-story-motion'
import cover from '../docs/assets/maya-mvp-cover.png'
import './scope.css'

const sectionClasses = ['scope-purpose', 'scope-validation', 'scope-control', 'scope-gates dark-chapter', 'scope-boundaries', 'scope-petal']

export default function ScopePage() {
  useStoryMotion()
  useEffect(() => {
    document.title = `Petal — ${scopeTitle}`
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', 'Maya MVP Scope: reusable personas, private relationships, owner-approved knowledge, and explicit human handoff. The foundation before Petal.')
  }, [])

  return (
    <div className="story-site scope-site">
      <a className="skip-link" href="#main">Skip to Maya scope</a>
      <DocumentHeader active="scope" entries={scopeSections} />
      <main id="main">
        <section className="scope-hero page-width" id="top" aria-labelledby="scope-title">
          <div className="scope-hero-copy">
            <span className="hero-eyebrow"><span />DOCUMENT 02 · THE FOUNDATION</span>
            <h1 id="scope-title" data-scope-copy>{scopeTitle}</h1>
            <ScopeContent markdown={scopeStatus} />
            <a className="scope-cta" href={`#${scopeSections[0].id}`}>Explore the scope<ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <figure className="scope-cover">
            <img src={cover} alt="A luminous Maya seed grows into two separate botanical branches, each supporting a human owner and their own private conversations." width={1536} height={1024} loading="eager" decoding="async" fetchPriority="high" />
          </figure>
          <div className="scope-hero-bottom" aria-hidden="true"><span>From a story to a first foundation.</span><span>02 / MAYA</span></div>
        </section>

        {scopeSections.map((section, index) => (
          <section key={section.id} id={section.id} className={`scope-section ${sectionClasses[index]}`} aria-labelledby={`${section.id}-title`}>
            <div className="page-width scope-section-inner">
              <div className="chapter-heading" data-reveal>
                <span className="chapter-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}<span /></span>
                <h2 id={`${section.id}-title`} data-scope-copy>{section.title}</h2>
                {index === 0 && <Flower2 className="scope-section-flower" size={124} strokeWidth={0.7} aria-hidden="true" />}
              </div>
              <ScopeContent markdown={section.markdown} />
            </div>
          </section>
        ))}

        <div className="scope-return page-width">
          <a href="/" className="document-return"><ArrowLeft size={18} aria-hidden="true" /><span><small>DOCUMENT 01</small>Return to the story</span></a>
          <Flower2 size={48} strokeWidth={0.9} aria-hidden="true" />
        </div>
      </main>
      <DocumentFooter />
    </div>
  )
}
