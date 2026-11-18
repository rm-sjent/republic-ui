# Republic UI

Thirteen free React components with motion, built with Tailwind CSS v4 and [Motion](https://motion.dev). Browse them at **[republicmarketing.co.uk/ui](https://www.republicmarketing.co.uk/ui/)**.

## Install

Add the registry to `components.json`:

```json
"registries": {
  "@republic": "https://www.republicmarketing.co.uk/ui/r/{name}.json"
}
```

Then add any component:

```bash
npx shadcn@latest add @republic/fan-gallery
```

## Components

Slat Shutter Hero, Photo Deck, Timeline Scrubber, Testimonial Reel, Morph Island, Facts Hero, Fan Gallery, Feature UI Row, Bento Mini UI, Torn Portrait Scroll, Scroll Fill Headline, Sector Wheel and Scattered About.

Each file is self-contained. Dependencies: `motion`, `clsx`, `tailwind-merge` and, for some, `lucide-react`. The blocks use `font-serif`; the showcase pairs it with Newsreader and Geist.

## Develop

```bash
npm install
npm run dev          # showcase on localhost
npm run registry     # rebuild public/r with the shadcn CLI
npm run build        # showcase + registry into dist/
```

## Licence

MIT. The photos in `public/img` are original and free to use with these components.

Made by [Republic Marketing](https://www.republicmarketing.co.uk/), a web design agency in London and Birmingham.
