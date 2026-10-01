import { lazy, Suspense } from 'react'
import { ArrowDown, ArrowRight, Flower2, HeartHandshake, MessageCircle, GraduationCap, UserRound, FileText, SlidersHorizontal, ShieldCheck, AudioLines, Layers3 } from 'lucide-react'
import type { StorySection } from '@/content/story'
import { coverMarkdown, sections, storyTitle } from '@/content/story'
import { StoryContent } from '@/components/story/StoryContent'
import AnimatedBorderButton from '@/components/shadcn-space/button/button-06'
import { useStoryMotion } from '@/hooks/use-story-motion'
import { DocumentFooter, DocumentHeader } from '@/components/DocumentNavigation'
import './story.css'

const ScopePage = lazy(() => import('./ScopePage'))

function ChapterHeading({ section, index }: { section: StorySection; index: number }) {
  return (
    <div className="chapter-heading" data-reveal>
      <span className="chapter-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}<span /></span>
      <h2 data-story-copy>{section.title}</h2>
    </div>
  )
}

function Blocks({ blocks, className = '' }: { blocks: string[]; className?: string }) {
  return blocks.map((block, index) => (
    <div key={index} className={className} data-reveal>
      <StoryContent markdown={block} />
    </div>
  ))
}

function Chapter({ section, index }: { section: StorySection; index: number }) {
  const heading = <ChapterHeading section={section} index={index} />
  const body = section.blocks

  if (index === 1) {
    const icons = [HeartHandshake, AudioLines, GraduationCap]
    return (
      <section id={section.id} className="chapter possibilities">
        <div className="page-width">
          <div className="section-intro">{heading}<div className="intro-copy"><Blocks blocks={body.slice(0, 2)} /></div></div>
          <div className="possibility-grid">
            {body.slice(2, 5).map((block, card) => {
              const Icon = icons[card]
              return <div className={`possibility-card possibility-${card + 1}`} key={card} data-reveal><div className="card-icon"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></div><StoryContent markdown={block} /></div>
            })}
          </div>
          <div className="section-afterword"><Blocks blocks={body.slice(5)} /></div>
        </div>
      </section>
    )
  }

  if (index === 2) {
    return (
      <section id={section.id} className="chapter petal-chapter dark-chapter">
        <div className="page-width section-intro">
          <div>{heading}<Flower2 className="petal-decoration" size={200} strokeWidth={0.65} aria-hidden="true" /></div>
          <div className="petal-copy"><Blocks blocks={body} /></div>
        </div>
      </section>
    )
  }

  if (index === 4 || index === 8) {
    return (
      <section id={section.id} className={`chapter illustrated-chapter ${index === 8 ? 'evolving-chapter' : 'identity-chapter'}`}>
        <div className="page-width">
          <div className="section-intro">{heading}<div className="intro-copy"><Blocks blocks={body.slice(0, 1)} /></div></div>
          <div className="illustration-layout">
            <div className="illustration-frame" data-reveal><StoryContent markdown={body[1]} /></div>
            <div className="illustration-copy"><Blocks blocks={body.slice(2)} /></div>
          </div>
        </div>
      </section>
    )
  }

  if (index === 5) {
    const icons = [UserRound, FileText, SlidersHorizontal]
    return (
      <section id={section.id} className="chapter workspace-chapter">
        <div className="page-width section-intro">
          {heading}
          <div className="workspace-list">
            {body.map((block, row) => {
              const Icon = icons[row % icons.length]
              return <div className="workspace-row" key={row} data-reveal><span className="workspace-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span><StoryContent markdown={block} /></div>
            })}
          </div>
        </div>
      </section>
    )
  }

  if (index === 6) {
    return (
      <section id={section.id} className="chapter conversation-chapter">
        <div className="page-width section-intro">
          <div className="conversation-heading">{heading}<MessageCircle className="conversation-decoration" size={120} strokeWidth={0.7} aria-hidden="true" /></div>
          <div className="conversation-steps">
            {body.map((block, step) => <div className="conversation-step" key={step} data-reveal><span className="step-number" aria-hidden="true">{String(step + 1).padStart(2, '0')}</span><StoryContent markdown={block} /></div>)}
          </div>
        </div>
      </section>
    )
  }

  if (index === 7) {
    const icons = [FileText, Layers3, ShieldCheck]
    return (
      <section id={section.id} className="chapter authority-chapter">
        <div className="page-width">
          {heading}
          <div className="authority-grid">
            {body.map((block, card) => {
              const Icon = icons[card % icons.length]
              return <div className="authority-card" key={card} data-reveal><Icon size={28} strokeWidth={1.5} aria-hidden="true" /><StoryContent markdown={block} /></div>
            })}
          </div>
        </div>
      </section>
    )
  }

  if (index === 9) {
    return (
      <section id={section.id} className="chapter direction-chapter dark-chapter">
        <div className="page-width">
          {heading}
          <div className="direction-copy"><Blocks blocks={body} /></div>
          <div className="closing-mark" aria-hidden="true"><Flower2 size={72} strokeWidth={0.8} /></div>
        </div>
      </section>
    )
  }

  return (
    <section id={section.id} className="chapter waiting-chapter">
      <div className="page-width section-intro">{heading}<div className="editorial-copy"><Blocks blocks={body} /></div></div>
    </section>
  )
}

function StoryPage() {
  useStoryMotion()
  const opening = sections[0]

  return (
    <div className="story-site">
      <a className="skip-link" href="#main">Skip to story</a>
      <DocumentHeader active="story" entries={sections} />

      <main id="main">
        <section className="hero page-width" id={opening.id}>
          <div id="top" className="top-anchor" />
          <div className="hero-art"><StoryContent markdown={coverMarkdown} eager /><span className="art-corner art-corner-top" aria-hidden="true" /><span className="art-corner art-corner-bottom" aria-hidden="true" /></div>
          <div className="hero-copy">
            <span className="hero-eyebrow" aria-hidden="true"><span />MAYA &amp; PETAL</span>
            <h1 data-story-copy>{storyTitle}</h1>
            <h2 data-story-copy>{opening.title}</h2>
            <StoryContent markdown={opening.blocks[0]} className="hero-description" />
            <div className="hero-actions">
              <AnimatedBorderButton render={<a href="#story-continuation" />} nativeButton={false} className="hero-cta">Follow the story<ArrowDown size={16} aria-hidden="true" /></AnimatedBorderButton>
              <span className="hero-scroll" aria-hidden="true">Scroll to discover<span /></span>
            </div>
          </div>
          <div className="hero-bottom" aria-hidden="true"><span>01 — 10</span><span>Maya<span className="small-petal">✳</span>Petal</span></div>
        </section>

        <div className="chapter intro-rest" id="story-continuation">
          <div className="page-width illustration-layout">
            <div className="illustration-frame" data-reveal><StoryContent markdown={opening.blocks[1]} /></div>
            <div className="illustration-copy"><Blocks blocks={opening.blocks.slice(2)} /></div>
          </div>
        </div>

        {sections.slice(1).map((section, index) => <Chapter key={section.id} section={section} index={index + 1} />)}
        <div className="next-document dark-chapter">
          <a href="/maya-mvp-scope" className="page-width next-document-link"><span><small>CONTINUE TO DOCUMENT 02</small>Maya MVP Scope</span><ArrowRight size={28} strokeWidth={1.2} aria-hidden="true" /></a>
        </div>
      </main>

      <DocumentFooter />
    </div>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/maya-mvp-scope') {
    return <Suspense fallback={<div className="page-width route-loading" role="status">Opening Maya MVP Scope…</div>}><ScopePage /></Suspense>
  }
  if (path === '/') return <StoryPage />
  return <main className="page-width route-loading"><h1>Page not found</h1><a href="/">Return to the story</a></main>
}

export default App
