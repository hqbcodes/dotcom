import { shelf } from '../data/shelf'
import Book from './Book'
import styles from './Bookshelf.module.css'

export default function Bookshelf() {
  return (
    <div className={styles.bookshelf}>
      <ul className={styles.shelf} aria-label="Bookshelf">
        {shelf.map((item) => (
          <Book key={item.title} item={item} />
        ))}
      </ul>
      {/* Gives way to the hovered book's caption. */}
      <p className={styles.hint} aria-hidden="true">
        <span className={styles.hintHover}>
          # hover a spine to pull it out, click it for my notes
        </span>
        <span className={styles.hintTouch}># tap a book for my notes</span>
      </p>
    </div>
  )
}
