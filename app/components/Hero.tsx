import { profile } from '../data/profile'
import Cursor from './Cursor'
import Prompt from './Prompt'
import Section from './Section'
import styles from './Hero.module.css'

export default function Hero() {
  const promptCwd = `${profile.host} ~ %`

  return (
    <Section className={styles.hero}>
      <div className={styles.session}>
        <Prompt cwd={promptCwd} command="whoami" />
      </div>
      <h1 className={styles.name}>
        <span>{profile.name}</span>
        <Cursor className={styles.cursor} />
      </h1>
      <div className={styles.about}>
        <Prompt cwd={promptCwd} command="cat about.txt" />
        <p className={styles.aboutText}>{profile.about}</p>
      </div>
    </Section>
  )
}
