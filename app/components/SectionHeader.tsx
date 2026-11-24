import Prompt from './Prompt'
import styles from './SectionHeader.module.css'

type SectionHeaderProps = {
  cwd: string
  command: string
  title: string
  /** A line of plain text under the title. */
  subtitle?: string
  /** Right-aligned extra, e.g. a count or a "see all" link. */
  aside?: React.ReactNode
}

export default function SectionHeader({
  cwd,
  command,
  title,
  subtitle,
  aside,
}: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.titleBlock}>
        <Prompt cwd={cwd} command={command} />
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {aside}
    </div>
  )
}
