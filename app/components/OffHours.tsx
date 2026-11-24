// The section shows the bookshelf for now. The neofetch block is parked;
// uncomment these imports and the JSX below to bring it back.
// import { offHours } from '../data/offHours'
// import { profile } from '../data/profile'
import Bookshelf from './Bookshelf'
import Section from './Section'
import SectionHeader from './SectionHeader'
import styles from './OffHours.module.css'

// Starts on the line after the backtick, like the content of a <pre>.
const art = String.raw`
        .-------.
       /  .---.  \
      |  |     |  |
       \  '---'  /
     .-'---------'-.
    /               \
   |                 |
   |       H B       |
   |                 |
    \               /
     '-.._______..-'
`.slice(1)

const swatches = [
  '#000000',
  '#262626',
  '#4a4a4a',
  '#707070',
  '#979797',
  '#bdbdbd',
  '#e0e0e0',
  '#ffffff',
]

export default function OffHours() {
  return (
    <Section id="off-hours" className={styles.offHours}>
      <SectionHeader
        cwd="~ %"
        command="ls shelf/"
        title="Outside of Work"
        subtitle="What I've been reading, watching, and playing."
      />
      <Bookshelf />
      {/*
      <div className={styles.fetch}>
        <pre className={styles.art} aria-hidden="true">
          {art}
        </pre>
        <div className={styles.info}>
          <div className={styles.host}>{profile.host}</div>
          <div className={styles.rule} aria-hidden="true">
            {'-'.repeat(profile.host.length)}
          </div>
          <dl className={styles.list}>
            {offHours.map((item) => (
              <div key={item.label} className={styles.item}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.swatches} aria-hidden="true">
            {swatches.map((color) => (
              <span
                key={color}
                className={styles.swatch}
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
      </div>
      */}
    </Section>
  )
}
