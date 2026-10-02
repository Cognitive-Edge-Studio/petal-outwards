import { useEffect } from 'react'
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, Clapperboard, MessageCircle, Sparkles, UsersRound } from 'lucide-react'
import { DocumentHeader, DocumentFooter } from '@/components/DocumentNavigation'
import { DocumentContent } from '@/components/DocumentContent'
import { buzyBuzzIntroduction, buzyBuzzSections } from '@/content/buzybuzz'
import { useStoryMotion } from '@/hooks/use-story-motion'
import creatorPhoto from '@/assets/buzybuzz/creator-in-the-studio.png'
import './scope.css'
import './documents.css'
import './buzybuzz.css'

const pathways = [
  { index: 1, label: 'For the audience', text: 'Find the content that answers the question.', icon: MessageCircle },
  { index: 2, label: 'For returning followers', text: 'Pick up a conversation where it left off.', icon: UsersRound },
  { index: 3, label: 'For brand partners', text: 'Turn an inquiry into a useful brief.', icon: Clapperboard },
]

function ConversationExample() {
  return <figure className="buzz-conversation buzz-example">
    <figcaption>ILLUSTRATIVE CONVERSATION</figcaption>
    <div className="buzz-chat-heading"><span className="buzz-avatar">A</span><div><strong>Asha’s Maya persona</strong><small>AI representative · creator-approved knowledge</small></div><Sparkles size={19} aria-hidden="true" /></div>
    <p className="buzz-message buzz-message-follower">I’m taking my first weekend trip. Where should I start if I only have a small bag?</p>
    <p className="buzz-message buzz-message-persona">Asha’s carry-on guide is a good starting point. What kind of trip are you planning?</p>
    <div className="buzz-content-card"><span><Clapperboard size={21} aria-hidden="true" /></span><div><strong>The carry-on guide</strong><small>From the creator’s approved collection</small></div><Check size={17} aria-hidden="true" /></div>
  </figure>
}

function RelationshipExample() {
  return <aside className="buzz-memory buzz-example" aria-label="Illustrative private relationship context">
    <span className="buzz-example-label">ONE RELATIONSHIP AT A TIME</span>
    <div><span className="buzz-avatar">M</span><p><strong>Mina’s conversation</strong><small>Her history. Her context.</small></p></div>
    <p>A small-bag preference can help the next answer. It stays within Mina’s relationship with this creator’s persona.</p>
    <span className="buzz-memory-note"><Check size={16} aria-hidden="true" />Separate from other followers and brand briefs</span>
  </aside>
}

function CollaborationExample() {
  return <figure className="buzz-brief buzz-example">
    <figcaption>ILLUSTRATIVE COLLABORATION BRIEF</figcaption>
    <div className="buzz-brief-top"><strong>Ready for creator review</strong><span>Human decision</span></div>
    <dl><div><dt>Campaign</dt><dd>A new travel collection</dd></div><div><dt>Deliverables</dt><dd>Two short videos</dd></div><div><dt>Timing</dt><dd>Proposed launch window supplied</dd></div><div><dt>Budget</dt><dd>Range collected from the brand</dd></div></dl>
    <p>Rates, fit, and commitments stay with the influencer.</p>
  </figure>
}

export default function BuzyBuzzCaseStudyPage() {
  useStoryMotion()
  useEffect(() => {
    document.title = 'BuzyBuzz case study — Maya & Petal'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'BuzyBuzz is a concept platform for busy influencers. Maya extends their availability with approved personas, private audience conversations, and collaboration inquiries ready for human review.')
  }, [])

  return <div className="story-site scope-site document-site buzybuzz-site">
    <a className="skip-link" href="#main">Skip to BuzyBuzz case study</a>
    <DocumentHeader active="buzybuzz" entries={buzyBuzzSections} />
    <main id="main">
      <section id="top" className="scope-hero buzz-hero page-width" aria-labelledby="buzz-title">
        <div className="buzz-hero-copy">
          <span className="buzz-eyebrow"><span />BUZYBUZZ · CONCEPT CASE STUDY</span>
          <h1 id="buzz-title">Busy creating.<br /><span>Still connected.</span></h1>
          <DocumentContent markdown={buzyBuzzIntroduction} />
          <a className="buzz-cta" href={`#${buzyBuzzSections[0].id}`}>Explore BuzyBuzz<ArrowDown size={17} aria-hidden="true" /></a>
          <p className="buzz-powered"><Sparkles size={15} aria-hidden="true" />An influencer’s presence, extended by Maya.</p>
        </div>
        <figure className="buzz-hero-visual">
          <div className="buzz-photo-frame"><img src={creatorPhoto} alt="A content creator setting up her camera in a sunlit studio." width={1024} height={1536} fetchPriority="high" decoding="async" /></div>
          <div className="buzz-presence-card"><span className="buzz-presence-icon"><MessageCircle size={20} aria-hidden="true" /></span><div><strong>Keep the conversation moving.</strong><small>Maya persona · AI representative</small></div></div>
          <figcaption>In the studio. Present for the community, through Maya.</figcaption>
        </figure>
      </section>
      <nav className="buzz-pathways page-width" aria-label="BuzyBuzz use cases">
        {pathways.map(({ index, label, text, icon: Icon }) => <a key={label} href={`#${buzyBuzzSections[index].id}`}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><div><strong>{label}</strong><span>{text}</span></div><ArrowUpRight size={17} aria-hidden="true" /></a>)}
      </nav>
      {buzyBuzzSections.map((section, index) => <section id={section.id} key={section.id} className={`buzz-section buzz-section-${index + 1}`} aria-labelledby={`${section.id}-title`}>
        <div className="page-width buzz-section-inner">
          <div className="chapter-heading" data-reveal><span className="buzz-chapter-number">{String(index + 1).padStart(2, '0')} / BUZYBUZZ</span><h2 id={`${section.id}-title`}>{section.title}</h2></div>
          <div className="buzz-section-copy" data-reveal>
            <DocumentContent markdown={section.markdown} />
            {index === 1 && <ConversationExample />}
            {index === 2 && <RelationshipExample />}
            {index === 3 && <CollaborationExample />}
            {index === 4 && <div className="buzz-control-strip"><span><Check size={16} aria-hidden="true" />Approved knowledge</span><span><Check size={16} aria-hidden="true" />Explicit authority</span><span><Check size={16} aria-hidden="true" />Human review</span></div>}
            {index === 5 && <ol className="buzz-review-steps" aria-label="Controlled improvement"><li>Identify a gap</li><li>Test a bounded change</li><li>Approve &amp; publish</li><li>Observe &amp; restore if needed</li></ol>}
          </div>
        </div>
      </section>)}
      <div className="buzz-return page-width"><a href="/" className="buzz-return-link"><ArrowLeft size={18} aria-hidden="true" />Return to the Maya story</a><span>BUZYBUZZ / A CONCEPT POWERED BY MAYA</span></div>
    </main>
    <DocumentFooter />
  </div>
}
