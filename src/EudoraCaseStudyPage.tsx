import { useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, GraduationCap, MessageCircle, Pause, Play, Sparkles, UsersRound } from 'lucide-react'
import { DocumentFooter, DocumentHeader } from '@/components/DocumentNavigation'
import { DocumentContent } from '@/components/DocumentContent'
import { EudoraLottie } from '@/components/eudora/EudoraLottie'
import { eudoraIntroduction, eudoraSections } from '@/content/eudora'
import { useStoryMotion } from '@/hooks/use-story-motion'
import teachersPhoto from '@/assets/eudora/teachers-preparing-lessons.png'
import './scope.css'
import './documents.css'
import './eudora.css'

const roles = [
  { title: 'The teacher', icon: GraduationCap, text: 'Creates and curates the education. Students can talk to their teacher directly.' },
  { title: 'The teacher’s persona', icon: MessageCircle, text: 'Uses Maya’s mechanism to extend that teacher’s availability and support each student individually.' },
  { title: 'Clio', icon: Sparkles, text: 'A distinct learning assistant that brings teacher-created study material into the conversation.' },
]

const sectionVisuals: Record<string, { file: string; caption: string }> = {
  'when-students-need-their-teachers': { file: 'boy-thinking.lottie', caption: 'A question can come at any time.' },
  'one-teacher-individual-support-for-many-students': { file: 'mascot-on-chair-talking.lottie', caption: 'Guidance for every learner.' },
  'an-environment-for-interactive-education': { file: 'cute-astronaut-monkey-super-hero-flying.lottie', caption: 'A little curiosity goes a long way.' },
  'understanding-strengths-and-weaknesses': { file: 'parents-with-kids.lottie', caption: 'A clearer view, together.' },
  'a-continuing-review-loop': { file: 'mascot-clio-cheering-right-answer-standing.lottie', caption: 'Every small step helps learning grow.' },
  'clio-an-assistant-shaped-by-educators': { file: 'mascot-clio-walking-small-steps.lottie', caption: 'Meet Clio, a companion for learning.' },
  'what-eudora-illustrates-about-maya': { file: 'mascot-clio-cheering-with-winner-cup-standing.lottie', caption: 'Human knowledge. More possibilities.' },
}

export default function EudoraCaseStudyPage() {
  useStoryMotion()
  const [animationsPaused, setAnimationsPaused] = useState(false)
  useEffect(() => {
    document.title = 'Eudora case study — Maya & Petal'
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Eudora explores education created and curated by human teachers, with Maya extending their availability, interactive learning, guardian insights, and Clio.',
    )
  }, [])

  return <div className="story-site scope-site document-site eudora-site">
    <a className="skip-link" href="#main">Skip to Eudora case study</a>
    <DocumentHeader active="eudora" entries={eudoraSections} />
    <main id="main">
      <section className="scope-hero eudora-hero page-width" id="top" aria-labelledby="eudora-title">
        <div className="scope-hero-copy">
          <span className="hero-eyebrow"><span />MAYA IN EDUCATION · CONCEPT CASE STUDY</span>
          <h1 id="eudora-title">Eudora<span>Extending teachers’ presence.</span></h1>
          <DocumentContent markdown={eudoraIntroduction} />
          <div className="eudora-hero-actions">
            <a className="scope-cta" href={`#${eudoraSections[0].id}`}>Explore the case study<ArrowDown size={16} aria-hidden="true" /></a>
            <button className="eudora-motion-toggle" onClick={() => setAnimationsPaused(paused => !paused)} aria-pressed={animationsPaused}>
              {animationsPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              {animationsPaused ? 'Play animations' : 'Pause animations'}
            </button>
          </div>
        </div>
        <aside className="eudora-principle" aria-label="The idea behind Eudora">
          <span className="eudora-visual-eyebrow">CREATED BY TEACHERS</span>
          <img className="eudora-teachers-photo" src={teachersPhoto}
            alt="Three teachers collaborating around a table to prepare lessons and review learning materials."
            width={1254} height={1254} fetchPriority="high" decoding="async" />
          <p className="eudora-principle-title">A teacher’s knowledge.<br />There when it matters.</p>
          <p className="eudora-principle-copy">Education created by people. A little more presence, through Maya.</p>
        </aside>
        <div className="scope-hero-bottom"><span>Human educators at the center.</span><span>EUDORA / POWERED BY MAYA</span></div>
      </section>

      {eudoraSections.map((section, index) => <section key={section.id} id={section.id}
        className={`scope-section eudora-section ${index === 4 ? 'eudora-review' : ''} ${index === 6 ? 'eudora-closing' : ''}`}
        aria-labelledby={`${section.id}-title`}>
        <div className="page-width scope-section-inner">
          <div className="chapter-heading" data-reveal>
            <span className="chapter-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}<span /></span>
            <h2 id={`${section.id}-title`}>{section.title}</h2>
          </div>
          {index === 1 && <div className="eudora-roles" aria-label="Three distinct roles">
            {roles.map(({ title, icon: Icon, text }) => <article className="eudora-role" key={title} data-reveal>
              <Icon size={24} strokeWidth={1.4} aria-hidden="true" /><h3>{title}</h3><p>{text}</p>
            </article>)}
          </div>}
          {index === 3 && <div className="eudora-section-label"><UsersRound size={18} aria-hidden="true" />TEACHERS &amp; GUARDIANS</div>}
          <div className="eudora-section-story">
            <div data-reveal><DocumentContent markdown={section.markdown} /></div>
            {sectionVisuals[section.id] && <figure className="eudora-section-visual" data-reveal>
              <EudoraLottie src={`/eudora/lottie/${sectionVisuals[section.id].file}`} paused={animationsPaused} />
              <figcaption>{sectionVisuals[section.id].caption}</figcaption>
            </figure>}
          </div>
        </div>
      </section>)}

      <div className="scope-return page-width">
        <a href="/" className="document-return"><ArrowLeft size={18} aria-hidden="true" /><span><small>MAYA &amp; PETAL</small>Return to the story</span></a>
        <span className="eudora-concept-note">A concept application of Maya.</span>
      </div>
    </main>
    <DocumentFooter />
  </div>
}
