"use client"

import * as React from "react"
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* ---------- odometer with sign ---------- */

function Reel({ digit, lh }: { digit: number; lh: number }) {
  return (
    <span className="inline-block overflow-hidden align-top" style={{ height: lh }}>
      <motion.span
        className="flex flex-col"
        initial={false}
        animate={{ y: -digit * lh }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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

function Odometer({ value, size, suffix }: { value: number; size: number; suffix?: string }) {
  const lh = Math.round(size * 1.1)
  const chars = String(Math.abs(value)).split("")
  return (
    <span
      className="inline-flex items-start tabular-nums"
      style={{ fontSize: size, height: lh, lineHeight: `${lh}px` }} role="img"
      aria-label={`${value}${suffix ?? ""}`}
    >
      <span aria-hidden className="inline-flex select-none">
        <motion.span
          className="inline-block overflow-hidden"
          style={{ height: lh }}
          initial={false}
          animate={{ width: value < 0 ? "0.6em" : "0em", opacity: value < 0 ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          −
        </motion.span>
        {chars.map((c, i) => (
          <Reel key={chars.length - i} digit={Number(c)} lh={lh} />
        ))}
        {suffix && <span>{suffix}</span>}
      </span>
    </span>
  )
}

/* ---------- scrubber ---------- */

export interface TimelineStop {
  /** 0 to 11, month of the year */
  month: number
  src: string
  title: string
  /** shown as an odometer, e.g. temperature */
  value: number
  valueSuffix?: string
  valueLabel?: string
}

export interface TimelineScrubberProps {
  stops: TimelineStop[]
  heading?: string
  className?: string
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function TimelineScrubber({ stops, heading = "One lake, twelve months", className }: TimelineScrubberProps) {
  const track = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(0)
  const [dir, setDir] = React.useState<1 | -1>(1)
  const [base, setBase] = React.useState(0)
  const activeRef = React.useRef(0)
  const handleX = useMotionValue(0)
  const dragging = React.useRef(false)

  const pos = (month: number) => month / 11

  const setStop = React.useCallback(
    (i: number, snap = true) => {
      const prev = activeRef.current
      if (i !== prev) {
        setDir(i > prev ? 1 : -1)
        setBase(prev)
        activeRef.current = i
        setActive(i)
      }
      const w = track.current?.clientWidth ?? 0
      if (snap) animate(handleX, pos(stops[i].month) * w, { duration: 0.7, ease: [0.42, 0, 0, 1] })
    },
    [handleX, stops],
  )

  // place handle on mount and resize
  React.useEffect(() => {
    const place = () => {
      const w = track.current?.clientWidth ?? 0
      handleX.set(pos(stops[activeRef.current].month) * w)
    }
    place()
    window.addEventListener("resize", place)
    return () => window.removeEventListener("resize", place)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nearest = (ratio: number) => {
    let best = 0
    stops.forEach((s, i) => {
      if (Math.abs(pos(s.month) - ratio) < Math.abs(pos(stops[best].month) - ratio)) best = i
    })
    return best
  }

  const fromPointer = (clientX: number) => {
    const r = track.current!.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - r.left, 0), r.width)
    handleX.set(x)
    const i = nearest(x / r.width)
    if (i !== activeRef.current) setStop(i, false)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    fromPointer(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => dragging.current && fromPointer(e.clientX)
  const onPointerUp = () => {
    dragging.current = false
    setStop(activeRef.current)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setStop(Math.min(activeRef.current + 1, stops.length - 1))
    if (e.key === "ArrowLeft") setStop(Math.max(activeRef.current - 1, 0))
    if (e.key === "Home") setStop(0)
    if (e.key === "End") setStop(stops.length - 1)
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) e.preventDefault()
  }

  const stop = stops[active]

  return (
    <div className={cn("w-full rounded-[12px] border border-black/[0.08] bg-white p-4 md:p-6", className)}>
      {/* image */}
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] md:aspect-[16/7] overflow-hidden rounded-[10px] bg-neutral-200">
        {stops.map((s) => (
          <link key={s.src} rel="preload" as="image" href={s.src} />
        ))}
        {base !== active && (
          <img
            key={`base-${stops[base].src}`}
            src={stops[base].src}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <motion.img
          key={stop.src}
          src={stop.src}
          alt={stop.title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", scale: 1.06 }}
          animate={{ clipPath: "inset(0 0 0 0%)", scale: 1 }}
          transition={{ duration: 0.9, ease: [0.42, 0, 0, 1] }}
          onAnimationComplete={() => setBase(active)}
        />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/45 via-transparent to-black/20" />

        <div className="absolute left-5 top-5 z-[3] md:left-7 md:top-6">
          <p className="text-[15px] text-white/85">{heading}</p>
        </div>

        <div className="absolute inset-x-5 bottom-5 z-[3] flex items-end justify-between gap-6 md:inset-x-7 md:bottom-6">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h3
                key={stop.title}
                className="text-[clamp(26px,3vw,44px)] font-normal leading-[1.05] tracking-[-0.03em] text-white"
                initial={{ y: "105%" }}
                animate={{ y: "0%", transition: { duration: 0.7, ease: [0.42, 0, 0, 1], delay: 0.15 } }}
                exit={{ y: "-105%", transition: { duration: 0.3, ease: [0.42, 0, 1, 1] } }}
              >
                {stop.title}
              </motion.h3>
            </AnimatePresence>
          </div>
          <div className="text-right text-white">
            <span className="hidden md:inline"><Odometer value={stop.value} size={44} suffix={stop.valueSuffix} /></span>
            <span className="md:hidden"><Odometer value={stop.value} size={32} suffix={stop.valueSuffix} /></span>
            {stop.valueLabel && <p className="mt-1 text-[13px] text-white/75">{stop.valueLabel}</p>}
          </div>
        </div>
      </div>

      {/* ruler */}
      <div className="px-2 pb-2 pt-7 md:px-4">
        <div
          ref={track}
          role="slider"
          tabIndex={0}
          aria-valuemin={0}
          aria-valuemax={stops.length - 1}
          aria-valuenow={active}
          aria-valuetext={`${MONTHS[stop.month]}: ${stop.title}`}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="relative h-12 cursor-ew-resize touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-[6px]"
        >
          {/* ticks */}
          {Array.from({ length: 45 }).map((_, i) => {
            const major = i % 4 === 0
            return (
              <span
                key={i}
                className={cn("absolute top-0 w-px -translate-x-1/2", major ? "h-4 bg-black/35" : "h-2.5 bg-black/15")}
                style={{ left: `${(i / 44) * 100}%` }}
              />
            )
          })}
          {/* month labels */}
          {MONTHS.map((m, i) => {
            const isStop = stops.some((s) => s.month === i)
            const isActive = stop.month === i
            return (
              <span
                key={m}
                className={cn(
                  "absolute top-6 -translate-x-1/2 text-[13px] transition-colors duration-500",
                  isActive ? "text-black" : isStop ? "text-black/55" : "hidden text-black/25 md:block",
                )}
                style={{ left: `${pos(i) * 100}%` }}
              >
                {m}
              </span>
            )
          })}
          {/* handle */}
          <motion.span className="pointer-events-none absolute -top-2 left-0 ml-[-1.5px] h-7 w-[3px] rounded-full bg-black" style={{ x: handleX }} />
        </div>
      </div>
    </div>
  )
}

export default TimelineScrubber
