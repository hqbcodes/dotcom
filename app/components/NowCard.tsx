import Image from 'next/image'
import type { NowItem } from '../data/now'
import styles from './NowCard.module.css'

type NowCardProps = {
  item: NowItem
}

export default function NowCard({ item }: NowCardProps) {
  const { cover } = item

  return (
    <article
      className={item.href ? `${styles.card} ${styles.linked}` : styles.card}
    >
      {cover.kind === 'image' ? (
        <div className={styles.cover}>
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 720px) 140px, 180px"
            className={styles.image}
          />
        </div>
      ) : (
        <div
          role="img"
          aria-label={cover.alt}
          className={`${styles.cover} ${styles.placeholder}`}
        >
          <span className={styles.placeholderTitle}>{item.title}</span>
        </div>
      )}

      <h3 className={styles.title}>
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            {item.title}
          </a>
        ) : (
          item.title
        )}
      </h3>
      <p className={styles.creator}>
        {item.creator}
        {item.year && <span className={styles.year}> · {item.year}</span>}
      </p>
    </article>
  )
}
