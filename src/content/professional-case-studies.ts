import jurivaSource from '../../docs/case-studies/juriva.md?raw'
import welloraSource from '../../docs/case-studies/wellora.md?raw'
import jurivaPhoto from '@/assets/juriva/lawyer-consultation.png'
import welloraPhoto from '@/assets/wellora/doctor-consultation.png'

function chapters(source: string) {
  const [introduction, ...sections] = source.trim().split(/^## /m)
  return {
    introduction: introduction.trim().split(/\r?\n/).slice(1).join('\n').trim(),
    sections: sections.map(chapter => {
      const [title, ...lines] = chapter.trim().split(/\r?\n/)
      return { id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''), title, markdown: lines.join('\n').trim() }
    }),
  }
}

export const professionalStudies = {
  juriva: {
    name: 'Juriva', audience: 'FOR LAWYERS & LAW FIRMS',
    headline: 'Expertise has a voice.', accent: 'Give it more presence.',
    description: 'Juriva is a concept platform for lawyers and law firms, extending their availability through individual and organizational Maya personas.',
    photo: jurivaPhoto, photoAlt: 'A lawyer discussing a document with a client in a warmly lit office.',
    photoCaption: 'The professional relationship comes first.',
    visualLabel: 'YOUR PRACTICE, MORE AVAILABLE', visualText: 'A familiar voice. A clearer next step.',
    roles: [
      { title: 'The independent lawyer', label: 'INDIVIDUAL PERSONA', text: 'Your approach, your approved explanations, and a continuing conversation with your clients.' },
      { title: 'The law firm', label: 'ORGANIZATIONAL PERSONA', text: 'A shared welcome, a coherent practice identity, and a route to the right team.' },
    ],
    pathways: [
      { title: 'Before the first meeting', text: 'Help clients arrive prepared.', index: 2 },
      { title: 'Between conversations', text: 'Make approved explanations easier to revisit.', index: 3 },
      { title: 'Back to the professional', text: 'Carry the question and context forward.', index: 4 },
    ],
    example: { identity: 'The firm’s Maya persona', question: 'I have a first consultation next week. How should I prepare?', answer: 'The firm has a preparation guide for first meetings. I can help you organize the questions you would like to bring.', resource: 'First-meeting preparation', resourceNote: 'From the firm’s approved collection' },
    handoff: { title: 'A consultation request', items: [ ['Client’s goal', 'Understand the practice and discuss their situation'], ['Already covered', 'The first-meeting guide and preparation questions'], ['For the professional', 'Review the inquiry and decide the next step'] ] },
    promise: 'Human expertise. More room for the conversation.',
    ...chapters(jurivaSource),
  },
  wellora: {
    name: 'Wellora', audience: 'FOR DOCTORS & CLINICS',
    headline: 'Care starts with people.', accent: 'Keep the connection close.',
    description: 'Wellora is a concept platform for doctors and clinics, extending their presence through Maya personas, visit preparation, and approved patient education.',
    photo: welloraPhoto, photoAlt: 'A doctor listening attentively to a patient in a bright, welcoming clinic.',
    photoCaption: 'A little more presence around human care.',
    visualLabel: 'CONNECTED, BETWEEN VISITS', visualText: 'Your questions have a place to continue.',
    roles: [
      { title: 'The individual doctor', label: 'INDIVIDUAL PERSONA', text: 'Your way of explaining, your approved educational materials, and continuity with your patients.' },
      { title: 'The clinic', label: 'ORGANIZATIONAL PERSONA', text: 'A welcoming shared presence that helps patients prepare and find the right member of the team.' },
    ],
    pathways: [
      { title: 'Before the appointment', text: 'Make space for the patient’s questions.', index: 2 },
      { title: 'After the conversation', text: 'Keep approved explanations close.', index: 3 },
      { title: 'Connected to the care team', text: 'Prepare a useful human follow-up.', index: 4 },
    ],
    example: { identity: 'The clinic’s Maya persona', question: 'I have an appointment next week and I’m worried I’ll forget my questions.', answer: 'We can organize the questions you want to discuss. The clinic’s visit guide can also help you prepare for your appointment.', resource: 'Preparing for your visit', resourceNote: 'From the clinic’s approved collection' },
    handoff: { title: 'Questions for the care team', items: [ ['Patient’s goal', 'Prepare for the upcoming appointment'], ['Already covered', 'The visit guide and the patient’s own questions'], ['For the care team', 'Review the questions and continue the conversation'] ] },
    promise: 'Human care. A connection that continues.',
    ...chapters(welloraSource),
  },
} as const

export type ProfessionalStudyId = keyof typeof professionalStudies
