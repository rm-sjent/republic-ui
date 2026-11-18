import * as React from "react"
import { Check, Copy, ArrowUpRight } from "lucide-react"
import { META } from "./meta"

export function Label({ n, slug }: { n: number; slug: string }) {
  const m = META[slug]
  const cmd = `npx shadcn@latest add @republic/${slug}`
  const [copied, setCopied] = React.useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked */
    }
  }
  return (
    <div id={slug} className="mx-auto flex max-w-[1312px] scroll-mt-4 flex-col gap-5 border-t border-black/10 px-6 pb-8 pt-10 md:flex-row md:items-end md:justify-between md:px-10">
      <div>
        <h2 className="text-[22px] leading-tight tracking-[-0.01em] text-[#0b1424]">
          <span className="tabular-nums text-black/30">{String(n).padStart(2, "0")}</span> {m.name}
        </h2>
        <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-black/55">{m.line}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={copy}
          className="flex max-w-full items-center gap-2 rounded-[10px] border border-black/10 bg-[#f6f6f4] py-2 pl-3 pr-2.5 font-mono text-[13px] text-[#0b1424]"
          aria-label={`Copy install command for ${m.name}`}
        >
          <span className="truncate">{cmd}</span>
          {copied ? <Check className="size-4 shrink-0 text-[#1d7a3a]" /> : <Copy className="size-4 shrink-0 text-black/45" />}
        </button>
        <a
          href={`https://21st.dev/@sajad`}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-1 rounded-[10px] border border-black/10 px-3 py-2 text-[13px] text-black/70"
        >
          21st <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </div>
  )
}
