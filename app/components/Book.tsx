import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { ShelfItem, ShelfKind } from '../data/shelf'
import BookNotes from './BookNotes'
import styles from './Book.module.css'

/** The small tag printed at the foot of each spine. */
const spineTag: Record<ShelfKind, string> = {
  reading: 'book',
  watching: 'film',
  playing: 'game',
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
  const stageStyle = {
    '--height': item.spine?.height ?? 1,
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
              <span className={styles.title}>{item.title}</span>
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
