import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { ShelfItem, ShelfKind } from '../data/shelf'
import styles from './Book.module.css'

/** The small tag printed at the foot of each spine. */
const spineTag: Record<ShelfKind, string> = {
  reading: 'book',
  watching: 'film',
  playing: 'game',
}

type BookProps = {
  item: ShelfItem
}

export default function Book({ item }: BookProps) {
  const { cover } = item
  const tone = item.spine?.tone ?? 'dark'
  const ratio =
    cover.kind === 'image' ? `${cover.src.width} / ${cover.src.height}` : '2 / 3'
  const stageStyle = {
    '--height': item.spine?.height ?? 1,
    // Cover width over height, so the CSS can find the book's middle.
    '--ratio': cover.kind === 'image' ? cover.src.width / cover.src.height : 2 / 3,
  } as CSSProperties

  const contents = (
    <>
      {/* Hover is tested on the book's own box, never on the turned cover,
          so the next spine still answers while a cover hangs over it. */}
      <div className={styles.stage} style={stageStyle}>
        <div className={styles.body}>
          <div className={`${styles.spine} ${styles[tone]}`} aria-hidden="true">
            <span className={styles.band} />
            <span className={styles.title}>{item.title}</span>
            <span className={styles.band} />
            <span className={styles.tag}>{spineTag[item.kind]}</span>
          </div>
          <div className={styles.cover} style={{ aspectRatio: ratio }}>
            {cover.kind === 'image' ? (
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(max-width: 720px) 200px, 260px"
                className={styles.image}
              />
            ) : (
              <div role="img" aria-label={cover.alt} className={styles.placeholder}>
                {item.title}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Positioned against the whole shelf, as its status line. */}
      <p className={styles.caption}>
        <span className={styles.kind}>{item.kind}</span>
        <span className={styles.captionTitle}>{item.title}</span>
        <span className={styles.creator}>
          {' '}
          — {item.creator}
          {item.year && `, ${item.year}`}
        </span>
      </p>
    </>
  )

  return (
    <li className={styles.slot}>
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.book}
        >
          {contents}
        </a>
      ) : (
        // Focusable so a tap or Tab pulls the book out, like a hover does.
        <div className={styles.book} tabIndex={0}>
          {contents}
        </div>
      )}
    </li>
  )
}
