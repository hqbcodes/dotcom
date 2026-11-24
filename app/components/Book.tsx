import Image from 'next/image'
import { Fragment, type CSSProperties } from 'react'
import type { ShelfItem, ShelfKind } from '../data/shelf'
import BookNotes from './BookNotes'
import styles from './Book.module.css'

/** The small tag printed at the foot of each spine. */
const spineTag: Record<ShelfKind, string> = {
  reading: 'book',
  watching: 'film',
  playing: 'game',
}

// Spine metrics, mirrored from Book.module.css and Bookshelf.module.css.
// VT323 is monospaced: every glyph advances 0.4em, plus the title's 0.04em
// letter-spacing; 0.48em leaves room for a wider fallback font.
const CHAR_EM = 0.48
// Spine padding (10 + 8), border (2), two bands (14) and the tag (18).
const SPINE_CHROME = 52
const spineSizes = {
  lg: { bookH: 300, fontSize: 26, padBlock: 14 },
  sm: { bookH: 220, fontSize: 22, padBlock: 12 },
} as const

/**
 * Where the spine's title breaks into columns: whole words, packed greedily
 * into the length the spine has. The breaks are set here, not left to the
 * browser, and the spine gets its width from the count, because Safari can't
 * size a box of vertical text from its contents and squeezes it into one
 * column's width, so a wrapped title spilled over the next book.
 * Returns, for each gap between words, whether a new column starts there.
 */
function titleBreaks(words: string[], height: number, size: keyof typeof spineSizes) {
  const { bookH, fontSize, padBlock } = spineSizes[size]
  const room = bookH * height - SPINE_CHROME - padBlock * 2
  const maxChars = Math.max(1, Math.floor(room / (fontSize * CHAR_EM)))
  let line = words[0]?.length ?? 0
  return words.slice(1).map((word) => {
    if (line + 1 + word.length <= maxChars) {
      line += 1 + word.length
      return false
    }
    line = word.length
    return true
  })
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

type BookProps = {
  item: ShelfItem
}

export default function Book({ item }: BookProps) {
  const { cover } = item
  const slug = slugify(item.title)
  const notesId = `shelf-${slug}`
  const tone = item.spine?.tone ?? 'dark'
  const ratio =
    cover.kind === 'image' ? `${cover.src.width} / ${cover.src.height}` : '2 / 3'
  const height = item.spine?.height ?? 1
  const words = item.title.split(/\s+/)
  const breaksLg = titleBreaks(words, height, 'lg')
  const breaksSm = titleBreaks(words, height, 'sm')
  const stageStyle = {
    '--height': height,
    '--cols-lg': 1 + breaksLg.filter(Boolean).length,
    '--cols-sm': 1 + breaksSm.filter(Boolean).length,
    // Cover width over height, so the CSS can find the book's middle.
    '--ratio': cover.kind === 'image' ? cover.src.width / cover.src.height : 2 / 3,
  } as CSSProperties
  const byline = `${item.creator}${item.year ? `, ${item.year}` : ''}`

  return (
    <li className={styles.slot}>
      {/* Hovering, tapping or tabbing to the book pulls it out; clicking opens
          the notes. A button may only hold phrasing content, hence the spans. */}
      <button
        type="button"
        className={styles.book}
        popovertarget={notesId}
        aria-label={`${item.title}, ${byline}: open notes`}
      >
        {/* Hover is tested on the book's own box, never on the turned cover,
            so the next spine still answers while a cover hangs over it. */}
        <span className={styles.stage} style={stageStyle}>
          <span className={styles.body}>
            <span className={`${styles.spine} ${styles[tone]}`} aria-hidden="true">
              <span className={styles.band} />
              <span className={styles.title}>
                {words.map((word, i) => (
                  <Fragment key={i}>
                    {i > 0 && ' '}
                    {breaksLg[i - 1] && <br className={styles.breakLg} />}
                    {breaksSm[i - 1] && <br className={styles.breakSm} />}
                    {word}
                  </Fragment>
                ))}
              </span>
              <span className={styles.band} />
              <span className={styles.tag}>{spineTag[item.kind]}</span>
            </span>
            <span className={styles.cover} style={{ aspectRatio: ratio }}>
              {cover.kind === 'image' ? (
                <Image
                  src={cover.src}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 200px, 260px"
                  className={styles.image}
                />
              ) : (
                <span className={styles.placeholder}>{item.title}</span>
              )}
            </span>
          </span>
        </span>
        {/* Positioned against the whole shelf, as its status line. */}
        <span className={styles.caption} aria-hidden="true">
          <span className={styles.kind}>{item.kind}</span>
          <span className={styles.captionTitle}>{item.title}</span>
          <span className={styles.creator}> — {byline}</span>
        </span>
      </button>
      <BookNotes id={notesId} slug={slug} item={item} byline={byline} />
    </li>
  )
}
