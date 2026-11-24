import Image from 'next/image'
import type { ShelfItem } from '../data/shelf'
import Prompt from './Prompt'
import styles from './BookNotes.module.css'

type BookNotesProps = {
  /** The popover's id, which the book's button targets. */
  id: string
  slug: string
  item: ShelfItem
  byline: string
}

/**
 * A book's notes, opened over the page by clicking it on the shelf: cover on
 * the left, notes on the right. Uses the HTML popover API, so it needs no
 * client JavaScript; Esc or a click outside closes it.
 */
export default function BookNotes({ id, slug, item, byline }: BookNotesProps) {
  const { cover } = item
  const titleId = `${id}-title`

  return (
    <div
      id={id}
      popover="auto"
      role="dialog"
      aria-labelledby={titleId}
      className={styles.panel}
    >
      {/* Runs across the top of the panel, like a terminal window's title bar. */}
      <div className={styles.bar}>
        <Prompt cwd={`~/shelf/${item.kind} %`} command={`cat ${slug}.md`} />
        <button
          type="button"
          className={styles.close}
          popovertarget={id}
          popovertargetaction="hide"
        >
          [esc] close
        </button>
      </div>

      <div className={styles.coverSide}>
        {cover.kind === 'image' ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            sizes="(max-width: 720px) 60vw, 360px"
            className={styles.image}
          />
        ) : (
          <div role="img" aria-label={cover.alt} className={styles.placeholder}>
            {item.title}
          </div>
        )}
      </div>

      <div className={styles.notesSide}>
        <h3 id={titleId} className={styles.title}>
          {item.title}
        </h3>
        <p className={styles.byline}>{byline}</p>
        <div className={styles.notes}>
          {item.notes.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {new URL(item.href).host} ↗
          </a>
        )}
      </div>
    </div>
  )
}
