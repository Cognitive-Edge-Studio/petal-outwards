// Add each new case-study page here to include it in the shared dropdown.
export const caseStudies = [
  { id: 'eudora', href: '/case-study/eudora', label: 'Eudora', description: 'Human-led learning, extended by Maya.' },
  { id: 'buzybuzz', href: '/case-study/buzybuzz', label: 'BuzyBuzz', description: 'Busy creating. Still connected.' },
  { id: 'juriva', href: '/case-study/juriva', label: 'Juriva', description: 'A practice’s expertise, more available.' },
  { id: 'wellora', href: '/case-study/wellora', label: 'Wellora', description: 'Human care. A connection that continues.' },
] as const

export type CaseStudyId = typeof caseStudies[number]['id']
