import { useEffect } from 'react'
import { ArrowDown, ArrowLeft, ArrowUpRight, Building2, Check, HeartPulse, MessageCircle, Scale, Sparkles, UserRound } from 'lucide-react'
import { DocumentHeader, DocumentFooter } from '@/components/DocumentNavigation'
import { DocumentContent } from '@/components/DocumentContent'
import { professionalStudies, type ProfessionalStudyId } from '@/content/professional-case-studies'
import { useStoryMotion } from '@/hooks/use-story-motion'
import './scope.css'
import './documents.css'
import './professional-case-studies.css'

export default function ProfessionalCaseStudyPage({ studyId }: { studyId: ProfessionalStudyId }) {
  const study = professionalStudies[studyId]
  const BrandIcon = studyId === 'juriva' ? Scale : HeartPulse
  useStoryMotion()
  useEffect(() => {
    document.title = `${study.name} case study — Maya & Petal`
    document.querySelector('meta[name="description"]')?.setAttribute('content', study.description)
  }, [study])

  return <div className={`story-site scope-site document-site professional-site ${studyId}-site`}>
    <a className="skip-link" href="#main">Skip to {study.name} case study</a>
    <DocumentHeader active={studyId} entries={study.sections} />
    <main id="main">
      <section id="top" className="scope-hero professional-hero page-width" aria-labelledby="professional-title">
        <div className="professional-hero-copy">
          <div className="professional-brand"><BrandIcon size={27} strokeWidth={1.4} aria-hidden="true" /><span>{study.name}<span className="professional-brand-dot">.</span></span></div>
          <span className="professional-eyebrow">{study.audience} · CONCEPT CASE STUDY</span>
          <h1 id="professional-title">{study.headline}<br /><em>{study.accent}</em></h1>
          <DocumentContent markdown={study.introduction} />
          <a className="professional-cta" href={`#${study.sections[0].id}`}>Explore {study.name}<ArrowDown size={17} aria-hidden="true" /></a>
          <p className="professional-powered"><Sparkles size={15} aria-hidden="true" />Individual or organizational presence, powered by Maya.</p>
        </div>
        <figure className="professional-hero-visual">
          <div className="professional-photo-frame"><img src={study.photo} alt={study.photoAlt} width={1024} height={1536} fetchPriority="high" decoding="async" /></div>
          <div className="professional-presence-card"><span className="professional-presence-icon"><MessageCircle size={22} strokeWidth={1.4} aria-hidden="true" /></span><div><small>{study.visualLabel}</small><strong>{study.visualText}</strong><span>Maya persona · AI representative</span></div></div>
          <figcaption>{study.photoCaption}</figcaption>
        </figure>
      </section>
      <nav className="professional-pathways page-width" aria-label={`${study.name} use cases`}>
        {study.pathways.map((pathway, index) => <a key={pathway.title} href={`#${study.sections[pathway.index].id}`}><span className="professional-pathway-number">0{index + 1}</span><div><strong>{pathway.title}</strong><span>{pathway.text}</span></div><ArrowUpRight size={18} aria-hidden="true" /></a>)}
      </nav>
      {study.sections.map((section, index) => <section id={section.id} key={section.id} className={`professional-section professional-section-${index + 1}`} aria-labelledby={`${section.id}-title`}>
        <div className="page-width professional-section-inner">
          <div className="chapter-heading" data-reveal><span className="professional-chapter-number">{String(index + 1).padStart(2, '0')} / {study.name.toUpperCase()}</span><h2 id={`${section.id}-title`}>{section.title}</h2></div>
          <div className="professional-section-copy" data-reveal>
            <DocumentContent markdown={section.markdown} />
            {index === 1 && <div className="professional-personas" aria-label="Two persona identities">{study.roles.map((role, roleIndex) => {
              const Icon = roleIndex === 0 ? UserRound : Building2
              return <article className="professional-role" key={role.title}><Icon size={25} strokeWidth={1.4} aria-hidden="true" /><small>{role.label}</small><h3>{role.title}</h3><p>{role.text}</p></article>
            })}</div>}
            {index === 2 && <figure className="professional-example professional-conversation"><figcaption>ILLUSTRATIVE CONVERSATION · CONCEPT</figcaption><div className="professional-chat-heading"><BrandIcon size={22} aria-hidden="true" /><div><strong>{study.example.identity}</strong><small>AI representative · approved knowledge</small></div></div><p className="professional-message professional-message-person">{study.example.question}</p><p className="professional-message professional-message-persona">{study.example.answer}</p><div className="professional-resource"><Check size={18} aria-hidden="true" /><div><strong>{study.example.resource}</strong><small>{study.example.resourceNote}</small></div></div></figure>}
            {index === 3 && <aside className="professional-continuity"><span><UserRound size={21} aria-hidden="true" /></span><div><strong>One relationship at a time.</strong><p>Approved knowledge can be shared. Each person’s private conversation stays within their own relationship.</p></div></aside>}
            {index === 4 && <figure className="professional-example professional-handoff"><figcaption>ILLUSTRATIVE HANDOFF · CONCEPT</figcaption><div className="professional-handoff-title"><h3>{study.handoff.title}</h3><span>For human review</span></div><dl>{study.handoff.items.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p>Prepared context. The responsible person takes the next step.</p></figure>}
            {index === 5 && <div className="professional-closing"><BrandIcon size={30} strokeWidth={1.3} aria-hidden="true" /><p>{study.promise}</p><span>{study.name.toUpperCase()} / POWERED BY MAYA</span></div>}
          </div>
        </div>
      </section>)}
      <div className="professional-return page-width"><a href="/" className="professional-return-link"><ArrowLeft size={18} aria-hidden="true" />Return to the Maya story</a><a href={`/case-study/${studyId === 'juriva' ? 'wellora' : 'juriva'}`}>Explore {studyId === 'juriva' ? 'Wellora' : 'Juriva'}<ArrowUpRight size={17} aria-hidden="true" /></a></div>
    </main>
    <DocumentFooter />
  </div>
}
