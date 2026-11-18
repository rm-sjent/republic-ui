import { SlatShutterHero } from "@registry/slat-shutter-hero"
import { PhotoDeck } from "@registry/photo-deck"
import { TimelineScrubber } from "@registry/timeline-scrubber"
import { TestimonialReel } from "@registry/testimonial-reel"
import { MorphIslandDemo } from "@/demos/island-demo"
import { deckPhotos, yearStops, testimonials, IMG } from "@/demos/data"
import { BlocksSections } from "./BlocksApp"
import { Label } from "./Label"
import { META, ORDER } from "./meta"

function Wrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1312px] px-6 pb-20 pt-2 md:px-10 md:pb-28">{children}</div>
}

const SITE = "https://www.republicmarketing.co.uk/"
const LONDON = "https://www.republicmarketing.co.uk/web-design-london"
const BIRMINGHAM = "https://www.republicmarketing.co.uk/web-design-birmingham"
const A = "text-[#0b1424] underline decoration-black/25 underline-offset-4"

export default function App() {
  return (
    <main className="bg-white text-[#0b1424]">
      <header className="mx-auto max-w-[1312px] px-6 pb-14 pt-10 md:px-10">
        <nav className="flex items-center justify-between text-[15px]">
          <a href={SITE} className="text-[#0b1424]">
            Republic Marketing
          </a>
          <div className="flex gap-5 text-black/60">
            <a href="https://github.com/rm-sjent/republic-ui" target="_blank" rel="noopener">
              GitHub
            </a>
            <a href="https://21st.dev/@sajad" target="_blank" rel="noopener">
              21st
            </a>
          </div>
        </nav>

        <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <div>
            <p className="text-[15px] text-black/55">Republic UI</p>
            <h1 className="mt-2 max-w-[16ch] text-[clamp(40px,5vw,64px)] font-normal leading-[1.02] tracking-[-0.04em]">
              Thirteen free React components with motion
            </h1>
          </div>
          <div className="text-[16px] leading-relaxed text-black/65">
            <p>
              Heroes, galleries, testimonials and feature blocks built with React, Tailwind CSS and Motion, with original images in every demo.
              Open source under MIT. Made by the team at{" "}
              <a href={SITE} className={A}>
                Republic Marketing
              </a>
              , a{" "}
              <a href={LONDON} className={A}>
                web design agency in London
              </a>{" "}
              and{" "}
              <a href={BIRMINGHAM} className={A}>
                Birmingham
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-[12px] border border-black/10 bg-[#f6f6f4] p-5 md:p-6">
          <p className="text-[15px] text-[#0b1424]">Install with the shadcn CLI</p>
          <p className="mt-1 text-[14px] text-black/55">
            Add the registry to your <code className="font-mono text-[13px]">components.json</code>, then add any component by name.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-[8px] bg-white p-4 font-mono text-[13px] leading-relaxed text-[#0b1424]">{`"registries": {
  "@republic": "https://www.republicmarketing.co.uk/ui/r/{name}.json"
}

npx shadcn@latest add @republic/fan-gallery`}</pre>
        </div>

        <ol className="mt-12 grid gap-x-10 border-t border-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {ORDER.map((slug, i) => (
            <li key={slug} className="border-b border-black/10">
              <a href={`#${slug}`} className="flex gap-3 py-2.5 text-[16px]">
                <span className="w-6 tabular-nums text-black/35">{String(i + 1).padStart(2, "0")}</span>
                {META[slug].name}
              </a>
            </li>
          ))}
        </ol>
      </header>

      <Label n={1} slug="slat-shutter-hero" />
      <SlatShutterHero
        coverSrc={IMG("hero-dark.jpg")}
        revealSrc={IMG("hero-bright.jpg")}
        kicker="Field notes, issue 14"
        coverTitle={["Leave the black sand", "before the light goes"]}
        revealTitle={["Then follow the sun", "south to clear water"]}
        caption="Reynisfjara to the Calanques in eleven days, by ferry, train and one very small boat."
      />
      <div className="h-20 md:h-28" />

      <Label n={2} slug="photo-deck" />
      <Wrap>
        <PhotoDeck photos={deckPhotos} />
      </Wrap>

      <Label n={3} slug="timeline-scrubber" />
      <Wrap>
        <TimelineScrubber stops={yearStops} />
      </Wrap>

      <Label n={4} slug="testimonial-reel" />
      <Wrap>
        <TestimonialReel items={testimonials} />
      </Wrap>

      <Label n={5} slug="morph-island" />
      <Wrap>
        <MorphIslandDemo />
      </Wrap>

      <BlocksSections start={6} />

      <footer className="mx-auto mt-10 max-w-[1312px] border-t border-black/10 px-6 py-12 text-[15px] leading-relaxed text-black/55 md:px-10">
        <div className="grid gap-8 md:grid-cols-2">
          <p>
            Want a whole site built with this level of craft? Republic Marketing designs and builds websites for growing companies. See our{" "}
            <a href={LONDON} className={A}>
              web design in London
            </a>{" "}
            and{" "}
            <a href={BIRMINGHAM} className={A}>
              web design in Birmingham
            </a>
            .
          </p>
          <p className="md:text-right">
            Republic UI is free and open source under the MIT licence. The demo images are original and free to use with these components.
            <br />
            Built by{" "}
            <a href={SITE} className={A}>
              Republic Marketing
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
