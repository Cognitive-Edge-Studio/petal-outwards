import { useEffect } from 'react'

export function useStoryMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const revealAll = () => elements.forEach((element) => element.removeAttribute('data-pending'))
    let observer: IntersectionObserver | undefined

    if (!reducedMotion.matches && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.removeAttribute('data-pending')
            observer?.unobserve(entry.target)
          }
        })
      }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' })

      elements.forEach((element) => {
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.setAttribute('data-pending', '')
          observer?.observe(element)
        }
      })
    }

    // Keyboard focus and fragment navigation must never land in invisible content.
    const revealTarget = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const target = document.getElementById(id)
      target?.removeAttribute('data-pending')
      target?.querySelectorAll('[data-pending]').forEach((element) => element.removeAttribute('data-pending'))
    }
    const revealFocused = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) {
        event.target.closest('[data-pending]')?.removeAttribute('data-pending')
      }
    }
    revealTarget()
    window.addEventListener('hashchange', revealTarget)
    document.addEventListener('focusin', revealFocused)
    reducedMotion.addEventListener('change', revealAll)

    let frame = 0
    const updateProgress = () => {
      frame = 0
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0
      document.documentElement.style.setProperty('--reading-progress', `${progress}`)
    }
    const scheduleProgress = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress)
    }
    updateProgress()
    window.addEventListener('scroll', scheduleProgress, { passive: true })
    window.addEventListener('resize', scheduleProgress)

    return () => {
      observer?.disconnect()
      revealAll()
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleProgress)
      window.removeEventListener('resize', scheduleProgress)
      window.removeEventListener('hashchange', revealTarget)
      document.removeEventListener('focusin', revealFocused)
      reducedMotion.removeEventListener('change', revealAll)
    }
  }, [])
}
