import type { StaticImageData } from 'next/image'
import xpExplainedCover from '@/public/shelf/xp-explained.jpg'
import howlsMovingCastleCover from '@/public/shelf/howls-moving-castle.jpg'
import persona5Cover from '@/public/shelf/persona-5.jpg'

export type ShelfKind = 'reading' | 'watching' | 'playing'

export type ShelfCover =
  | { kind: 'image'; src: StaticImageData; alt: string }
  /** A blank cover with the title on it, until a cover image is added. */
  | { kind: 'placeholder'; alt: string }

export type SpineTone = 'light' | 'mid' | 'dark'

export type ShelfItem = {
  kind: ShelfKind
  title: string
  /** Author, director or studio. */
  creator: string
  year?: number
  /** Opens when the book is clicked. */
  href?: string
  cover: ShelfCover
  spine?: {
    /** Spine colour. Defaults to 'dark'. */
    tone?: SpineTone
    /** Height as a share of the tallest book, 0–1. Defaults to 1. */
    height?: number
  }
}

// Books stand on the shelf in this order. To add a cover: save it as
// public/shelf/<name>.jpg (about 400px wide), import it here, and set the
// item's cover to { kind: 'image', src, alt }. The cover keeps its own shape.
export const shelf: ShelfItem[] = [
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
    spine: { tone: 'light', height: 1 },
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
    spine: { tone: 'dark', height: 0.86 },
  },
  {
    kind: 'playing',
    title: 'Persona 5',
    creator: 'Atlus',
    year: 2016,
    cover: { kind: 'image', src: persona5Cover, alt: 'Persona 5 box art' },
    spine: { tone: 'mid', height: 0.78 },
  },
]
