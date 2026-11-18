import { Label } from "./Label"
import { FanGallery } from "@registry/fan-gallery"
import { FeatureUIRow, ChecklistVisual, TimelineVisual } from "@registry/feature-ui-row"
import { BentoMiniUI } from "@registry/bento-mini-ui"
import { SectorWheel } from "@registry/sector-wheel"
import { ScatteredAbout } from "@registry/scattered-about"
import { FactsHero } from "@registry/facts-hero"
import { TornPortraitScroll } from "@registry/torn-portrait-scroll"
import { ScrollFillHeadline } from "@registry/scroll-fill-headline"

const I = (n: string) => `${import.meta.env.BASE_URL}img/${n}`

const cities = [
  { src: I("city-lisbon.jpg"), label: "Lisbon", tags: ["Relocation", "Family moves"] },
  { src: I("city-copenhagen.jpg"), label: "Copenhagen", tags: ["Hiring abroad", "Team setup"] },
  { src: I("city-tokyo.jpg"), label: "Tokyo", tags: ["New office", "Local entity", "Payroll"] },
  { src: I("city-singapore.jpg"), label: "Singapore", tags: ["Regional hub", "Founders"] },
  { src: I("city-newyork.jpg"), label: "New York", tags: ["Expansion", "Senior hires"] },
  { src: I("city-capetown.jpg"), label: "Cape Town", tags: ["Remote teams", "Contracts"] },
  { src: I("city-dubai.jpg"), label: "Dubai", tags: ["Private clients", "Residency"] },
]

const sectors = [
  { name: "Technology", note: "From seed-stage founders to listed software firms, we help tech teams hire and move people quickly." },
  { name: "Hospitality", note: "Seasonal hiring, chef visas and new openings, planned around your launch dates." },
  { name: "Healthcare", note: "Clinics and care groups recruiting specialists from abroad, with every check done properly." },
  { name: "Finance", note: "Funds, banks and fintechs moving senior people between offices without delays." },
  { name: "Education", note: "Schools and universities sponsoring staff and welcoming international students." },
  { name: "Manufacturing", note: "Engineers and skilled trades, sponsored with the paperwork kept simple." },
  { name: "Retail", note: "Store openings and head-office hires for brands growing into new markets." },
  { name: "Media", note: "Producers, writers and on-screen talent working across borders." },
  { name: "Energy", note: "Project teams for renewables and infrastructure, on tight timelines." },
  { name: "Property", note: "Developers and agencies bringing in specialists for large projects." },
  { name: "Agriculture", note: "Seasonal and permanent workers, sponsored with care for the details." },
  { name: "Legal", note: "Firms relocating partners and associates between jurisdictions." },
  { name: "Charities", note: "Non-profits sponsoring overseas staff on modest budgets." },
]

const torn = [
  {
    title: "Advice that fits your life",
    body: "We start with your situation, not a template. Every plan is shaped around your family, your business and your timing.",
    photo: I("person-amara.jpg"),
    paper: "#c9d6ff",
    card: { title: "Recognised by our clients", rows: ["4.9 out of 5 average rating", "Recommended by 9 in 10"] },
  },
  {
    title: "One partner, start to finish",
    body: "The partner you meet on day one stays with you. No hand-offs, no repeating your story to someone new.",
    photo: I("person-lukas.jpg"),
    paper: "#f3d9a6",
    card: { title: "Your file is handled by", rows: ["A senior partner", "One named contact"] },
  },
  {
    title: "Senior people on the detail",
    body: "Small details matter most. A senior adviser checks every document before anything is sent.",
    photo: I("person-sofia.jpg"),
    paper: "#d8e6d2",
    card: { title: "Before we send", rows: ["Documents reviewed", "Dates confirmed", "Final sign-off"] },
  },
  {
    title: "Problems found early",
    body: "We look for the small things that cause big delays later, and fix them before they cost you time.",
    photo: I("person-ravi.jpg"),
    paper: "#ead8cf",
    card: { title: "Spotted in review", rows: ["Missing reference letter", "Resolved in two days"] },
  },
]


export function BlocksSections({ start = 6 }: { start?: number }) {
  return (
    <div className="bg-white text-[#0b1424]">

      <Label n={start + 0} slug="facts-hero" />
      <FactsHero
        title={
          <>
            Clear advice for <em className="italic">people</em> on the move
          </>
        }
        body="Halden is an independent advisory firm in London. We help families and growing companies relocate, hire and settle, with a partner on every file."
        primary={{ label: "Book a call", href: "#" }}
        secondary={{ label: "Our services", href: "#" }}
        image={I("hero-office.jpg")}
        facts={[
          { label: "Years in practice", value: "14", roll: true },
          { label: "Clients helped", value: "2,400+", roll: true, highlight: true },
          { label: "Average rating", value: "4.9 of 5" },
          { label: "Countries covered", value: "38", roll: true },
          { label: "Partners", value: "6" },
          { label: "Founded", value: "2011, London" },
        ]}
      />

      <Label n={start + 1} slug="fan-gallery" />
      <FanGallery cards={cities} />

      <Label n={start + 2} slug="feature-ui-row" />
      <div className="mx-auto flex max-w-[1312px] flex-col gap-24 px-6 py-20 md:px-10 md:py-24">
        <FeatureUIRow
          eyebrow="For companies"
          title="Hire abroad with confidence"
          body="A partner runs your hiring plan from the first conversation to the first day, and keeps every check up to date."
          cta={{ label: "Explore company services", href: "#" }}
          visual={
            <ChecklistVisual
              title="New hire, relocation file"
              rows={[
                { label: "Eligibility", value: "Checked" },
                { label: "Contract", value: "Signed" },
                { label: "Documents", value: "Sent in 4 days" },
                { label: "Start date", value: "Confirmed" },
              ]}
              stat={{ value: 98, suffix: "%", label: "Files approved first time" }}
            />
          }
        />
        <FeatureUIRow
          reverse
          tone="night"
          eyebrow="For families"
          title="Move, stay or settle"
          body="We map the whole journey for your family, so you always know what comes next and when."
          cta={{ label: "Explore family services", href: "#" }}
          visual={
            <TimelineVisual
              title="Your route to settling"
              stages={[
                { label: "First stay", years: 3 },
                { label: "Extension", years: 2 },
              ]}
              total={5}
              note="Apply to settle after five years"
            />
          }
        />
      </div>

      <Label n={start + 3} slug="bento-mini-ui" />
      <BentoMiniUI person={{ name: "Amara Okoye", role: "Founding partner", photo: I("person-amara.jpg") }} />

      <Label n={start + 4} slug="torn-portrait-scroll" />
      <TornPortraitScroll items={torn} />

      <Label n={start + 5} slug="scroll-fill-headline" />
      <ScrollFillHeadline
        lines={["A small firm", "with a partner on every file"]}
        objects={[
          { src: I("object-plane.jpg"), left: 74, top: 8, width: 190, rotate: [-8, 10], drift: [60, -80] },
          { src: I("object-compass.jpg"), left: 8, top: 50, width: 150, rotate: [12, -14], drift: [40, -60] },
        ]}
      />

      <Label n={start + 6} slug="sector-wheel" />
      <SectorWheel sectors={sectors} />

      <Label n={start + 7} slug="scattered-about" />
      <ScatteredAbout images={cities.slice(0, 6).map((c) => c.src)} />
    </div>
  )
}
