"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* ---------- odometer ---------- */

function Reel({ digit, lh }: { digit: number; lh: number }) {
  return (
    <span className="inline-block overflow-hidden align-top" style={{ height: lh }}>
      <motion.span
        className="flex flex-col"
        initial={false}
        animate={{ y: -digit * lh }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {Array.from({ length: 10 }).map((_, d) => (
          <span key={d} className="block text-center" style={{ height: lh, lineHeight: `${lh}px` }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function Odometer({ value, size, prefix, suffix }: { value: number; size: number; prefix?: string; suffix?: string }) {
  const lh = Math.round(size * 1.05)
  const chars = String(value).split("")
  return (
    <span
      className="inline-flex items-start tabular-nums tracking-[-0.04em]"
      style={{ fontSize: size, height: lh, lineHeight: `${lh}px` }} role="img"
      aria-label={`${prefix ?? ""}${value}${suffix ?? ""}`}
    >
      <span aria-hidden className="inline-flex select-none">
        {prefix && <span>{prefix}</span>}
        {chars.map((c, i) =>
          /\d/.test(c) ? <Reel key={chars.length - i} digit={Number(c)} lh={lh} /> : <span key={`c${i}`}>{c}</span>,
        )}
        {suffix && <span>{suffix}</span>}
      </span>
    </span>
  )
}

/* ---------- reel ---------- */

export interface Testimonial {
  quote: string
  name: string
  role: string
  photo: string
  stat: { value: number; prefix?: string; suffix?: string; label: string }
}

export interface TestimonialReelProps {
  items: Testimonial[]
  /** autoplay interval in ms, 0 to disable */
  interval?: number
  className?: string
}

export function TestimonialReel({ items, interval = 7000, className }: TestimonialReelProps) {
  const [i, setI] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const reduce = useReducedMotion()
  const root = React.useRef<HTMLDivElement>(null)
  const inView = useInView(root, { amount: 0.4 })
  const t = items[i]
  const auto = interval > 0 && !paused && !reduce && inView

  React.useEffect(() => {
    if (!auto) return
    const id = setTimeout(() => setI((v) => (v + 1) % items.length), interval)
    return () => clearTimeout(id)
  }, [i, auto, interval, items.length])

  const go = (n: number) => setI(n)

  const words = t.quote.split(" ")

  return (
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className={cn(
        "grid w-full grid-cols-1 gap-8 rounded-[12px] border border-black/[0.08] bg-white p-6 md:grid-cols-[minmax(0,1fr)_340px] md:gap-14 md:p-12",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col justify-between gap-10">
        {/* quote */}
        <figure className="min-h-[220px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={i}
              className="text-[clamp(22px,2.2vw,32px)] font-normal leading-[1.28] tracking-[-0.02em] text-black"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.018 } },
                exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.42, 0, 1, 1] } },
              }}
            >
              {words.map((w, k) => (
                <motion.span
                  key={k}
                  className="inline-block whitespace-pre"
                  variants={{
                    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.42, 0, 0, 1] } },
                  }}
                >
                  {w}
                  {k < words.length - 1 ? " " : ""}
                </motion.span>
              ))}
            </motion.blockquote>
          </AnimatePresence>
        </figure>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* stat */}
          <div>
            <Odometer value={t.stat.value} size={56} prefix={t.stat.prefix} suffix={t.stat.suffix} />
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={t.stat.label}
                className="mt-2 text-[15px] text-black/55"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {t.stat.label}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* thumbnails as tabs */}
          <div role="tablist" aria-label="Testimonials" className="flex gap-2">
            {items.map((it, n) => {
              const on = n === i
              return (
                <button
                  key={it.name}
                  role="tab"
                  aria-selected={on}
                  aria-label={it.name}
                  onClick={() => go(n)}
                  className="relative w-14"
                >
                  <img
                    src={it.photo}
                    alt=""
                    className={cn(
                      "aspect-square w-14 rounded-[10px] object-cover transition-[opacity,filter] duration-500",
                      on ? "opacity-100" : "opacity-45 grayscale",
                    )}
                  />
                  <span className="absolute -bottom-3 left-0 h-[2px] w-full overflow-hidden rounded-full bg-black/10">
                    {on && (
                      <motion.span
                        key={`${i}-${auto}`}
                        className="block h-full origin-left bg-black"
                        initial={{ scaleX: auto ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: auto ? interval / 1000 : 0, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* portrait reel */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[12px] bg-[#ececea]">
          <AnimatePresence initial={false}>
            <motion.img
              key={t.photo}
              src={t.photo}
              alt={t.name}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ y: "100%" }}
              animate={{ y: "0%", zIndex: 1 }}
              exit={{ y: "-30%", zIndex: 0, transition: { duration: 0.9, ease: [0.42, 0, 0, 1] } }}
              transition={{ duration: 0.9, ease: [0.42, 0, 0, 1] }}
            />
          </AnimatePresence>
        </div>
        <div className="h-[46px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={t.name}
              initial={{ y: "100%" }}
              animate={{ y: "0%", transition: { duration: 0.6, ease: [0.42, 0, 0, 1], delay: 0.2 } }}
              exit={{ y: "-100%", transition: { duration: 0.3, ease: [0.42, 0, 1, 1] } }}
            >
              <p className="text-[17px] leading-[22px] text-black">{t.name}</p>
              <p className="text-[15px] leading-[22px] text-black/55">{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default TestimonialReel
