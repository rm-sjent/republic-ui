import * as React from "react"
import { useInView } from "motion/react"
import { MorphIsland, type IslandState } from "@registry/morph-island"
import { deckPhotos } from "./data"

const files = deckPhotos.slice(0, 3).map((p) => ({ name: p.place, src: p.src, album: "Autumn trip" }))
const STATES: { id: IslandState; label: string }[] = [
  { id: "idle", label: "Idle" },
  { id: "uploading", label: "Uploading" },
  { id: "done", label: "Done" },
  { id: "preview", label: "Preview" },
]

export function MorphIslandDemo() {
  const [state, setState] = React.useState<IslandState>("idle")
  const [progress, setProgress] = React.useState(0)
  const [current, setCurrent] = React.useState(0)
  const run = React.useRef(0)
  const timers = React.useRef<number[]>([])

  const stop = () => {
    run.current++
    timers.current.forEach((t) => {
      window.clearTimeout(t)
      window.clearInterval(t)
    })
    timers.current = []
  }

  const play = React.useCallback(() => {
    stop()
    const id = run.current
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(() => id === run.current && fn(), ms))
    setState("idle")
    setProgress(0)
    setCurrent(0)
    let p = 0
    later(() => {
      setState("uploading")
      const iv = window.setInterval(() => {
        if (id !== run.current) return window.clearInterval(iv)
        p = Math.min(100, p + 3 + Math.random() * 9)
        setProgress(p)
        if (p >= 100) {
          window.clearInterval(iv)
          later(() => setState("done"), 450)
          later(() => setState("preview"), 2400)
        }
      }, 220)
      timers.current.push(iv)
    }, 1400)
  }, [])

  const box = React.useRef<HTMLDivElement>(null)
  const inView = useInView(box, { amount: 0.6 })

  // run the sequence each time the demo scrolls into view
  React.useEffect(() => {
    if (inView) play()
    else stop()
    return stop
  }, [inView, play])

  return (
    <div ref={box} className="relative flex h-[480px] w-full flex-col overflow-hidden rounded-[12px] border border-black/[0.08] bg-[#f6f6f4]">
      <div className="flex justify-center pt-6">
        <MorphIsland state={state} files={files} progress={progress} current={current} />
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-center gap-3 pb-6">
        <div role="tablist" className="flex rounded-full border border-black/10 bg-white p-1">
          {STATES.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={state === s.id}
              onClick={() => {
                stop()
                if (s.id === "uploading") setProgress(64)
                setCurrent(0)
                setState(s.id)
              }}
              className={"rounded-full px-4 py-2 text-[14px] transition-colors duration-300 " + (state === s.id ? "bg-black text-white" : "text-black/60")}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button onClick={play} className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-[14px] text-black">
          Replay
        </button>
      </div>
    </div>
  )
}
