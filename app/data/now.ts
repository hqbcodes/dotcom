import type { StaticImageData } from 'next/image'
import xpExplainedCover from '@/public/now/xp-explained.jpg'
import howlsMovingCastleCover from '@/public/now/howls-moving-castle.jpg'
import persona5Cover from '@/public/now/persona-5.jpg'

export type NowKind = 'reading' | 'watching' | 'playing'

export type NowCover =
  | { kind: 'image'; src: StaticImageData; alt: string }
  /** A blank poster with the title on it, until a cover image is added. */
  | { kind: 'placeholder'; alt: string }

export type NowItem = {
  kind: NowKind
  title: string
  /** Author, director or studio. */
  creator: string
  year?: number
  /** Opens when the card is clicked. */
  href?: string
  cover: NowCover
}

/** The rows of the shelf, in order. Each is shown as `./<kind>/`. */
export const nowKinds: NowKind[] = ['reading', 'watching', 'playing']

// To add a cover: save it as public/now/<name>.jpg (about 400px wide), import
// it here, and switch the item's cover to { kind: 'image', src, alt }.
export const now: NowItem[] = [
  {
    kind: 'reading',
    title: 'Extreme Programming Explained',
    creator: 'Kent Beck with Cynthia Andres',
    year: 2004,
    cover: {
      kind: 'image',
      src: xpExplainedCover,
      alt: 'Extreme Programming Explained, 2nd edition, book cover',
    },
  },
  {
    kind: 'watching',
    title: "Howl's Moving Castle",
    creator: 'Hayao Miyazaki, Studio Ghibli',
    year: 2004,
    cover: {
      kind: 'image',
      src: howlsMovingCastleCover,
      alt: "Howl's Moving Castle film poster",
    },
  },
  {
    kind: 'playing',
    title: 'Persona 5',
    creator: 'Atlus',
    year: 2016,
    cover: { kind: 'image', src: persona5Cover, alt: 'Persona 5 box art' },
  },
]
