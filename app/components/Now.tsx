import { now, nowKinds } from '../data/now'
import NowCard from './NowCard'
import Section from './Section'
import SectionHeader from './SectionHeader'
import styles from './Now.module.css'

export default function Now() {
  const shelves = nowKinds
    .map((kind) => ({ kind, items: now.filter((item) => item.kind === kind) }))
    .filter((shelf) => shelf.items.length > 0)

  return (
    <Section id="now" className={styles.now}>
      <SectionHeader
        cwd="~/now %"
        command="ls"
        title="Now"
        aside={<div className={styles.total}>total {now.length}</div>}
      />
      <div className={styles.shelves}>
        {shelves.map(({ kind, items }) => (
          <section key={kind} className={styles.shelf} aria-label={kind}>
            <h3 className={styles.label}>./{kind}/</h3>
            {/* Scrolls sideways when the covers outgrow the row. */}
            <div className={styles.row}>
              {items.map((item) => (
                <NowCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Section>
  )
}
