import { useEffect, useRef, useState } from 'react'
import { DotLottieReact, setWasmUrl, type DotLottie } from '@lottiefiles/dotlottie-react'
import { Sparkles } from 'lucide-react'

setWasmUrl('/eudora/lottie/dotlottie-player.wasm')

export function EudoraLottie({ src, paused, eager = false }: { src: string; paused: boolean; eager?: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const [player, setPlayer] = useState<DotLottie | null>(null)
  const [entered, setEntered] = useState(eager)
  const [visible, setVisible] = useState(eager)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const playing = visible && !paused && !reducedMotion

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    media.addEventListener('change', update)
    const observer = new IntersectionObserver(entries => {
      const inView = entries[0].isIntersecting
      setVisible(inView)
      if (inView) setEntered(true)
    }, { threshold: 0.1 })
    if (wrapper.current) observer.observe(wrapper.current)
    return () => { media.removeEventListener('change', update); observer.disconnect() }
  }, [])

  useEffect(() => {
    if (!player) return
    const load = () => { setReady(true); setFailed(false) }
    const error = () => { setFailed(true); setReady(false) }
    player.addEventListener('load', load)
    player.addEventListener('loadError', error)
    if (player.isLoaded) load()
    return () => { player.removeEventListener('load', load); player.removeEventListener('loadError', error) }
  }, [player])

  useEffect(() => {
    if (!ready || !player) return
    if (playing) player.play()
    else player.pause()
  }, [player, ready, playing])

  return <div ref={wrapper} className="eudora-lottie" aria-hidden="true" data-animation={src} data-animation-state={failed ? 'fallback' : ready ? playing ? 'playing' : 'paused' : 'pending'}>
    {(!ready || failed) && <Sparkles className="eudora-lottie-fallback" size={64} strokeWidth={1} />}
    {entered && !failed && <DotLottieReact src={src} loop autoplay={playing} dotLottieRefCallback={setPlayer} renderConfig={{ devicePixelRatio: Math.min(window.devicePixelRatio, 2), freezeOnOffscreen: true }} />}
  </div>
}
