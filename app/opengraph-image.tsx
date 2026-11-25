import { ImageResponse } from 'next/og'
import { profile } from './data/profile'

// The link preview shown when the site is shared (LinkedIn, X, Slack, iMessage…).
// Rendered once at build time.

export const alt = `${profile.name}: ${profile.about}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Same values as the tokens in globals.css; ImageResponse can't read CSS variables.
const colors = {
  bg: '#000000',
  fg: '#f2f2f2',
  gray: '#bdbdbd',
  dim: '#808080',
  border: '#2e2e2e',
}

const prompt = `${profile.host} ~ %`

/**
 * Fetches a TTF subset of a Google Font containing only `text`. Satori can't
 * read woff2, and Google serves TTF to clients that send no browser user agent.
 * Returns undefined on any failure so the image still builds with the default font.
 */
async function loadGoogleFont(family: string, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
    ).then((res) => res.text())
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
    if (!src) return undefined
    return await fetch(src).then((res) => res.arrayBuffer())
  } catch {
    return undefined
  }
}

export default async function OpengraphImage() {
  const monoText = `${prompt} whoami cat about.txt ${profile.about}`
  const [display, mono] = await Promise.all([
    loadGoogleFont('VT323', profile.name),
    loadGoogleFont('IBM+Plex+Mono', monoText),
  ])

  const fonts: NonNullable<ConstructorParameters<typeof ImageResponse>[1]>['fonts'] = []
  if (display) fonts.push({ name: 'VT323', data: display, weight: 400, style: 'normal' })
  if (mono) fonts.push({ name: 'Plex', data: mono, weight: 400, style: 'normal' })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: colors.bg,
          color: colors.fg,
          fontFamily: 'Plex',
          fontSize: 30,
          border: `2px solid ${colors.border}`,
        }}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ color: colors.dim }}>{prompt}</span>
          <span>whoami</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            margin: '12px 0 44px',
            fontFamily: 'VT323',
            fontSize: 176,
            lineHeight: 1,
          }}
        >
          {profile.name}
          <div style={{ width: 56, height: 128, background: colors.fg }} />
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ color: colors.dim }}>{prompt}</span>
          <span>cat about.txt</span>
        </div>
        <div style={{ display: 'flex', marginTop: 12, color: colors.gray, lineHeight: 1.45 }}>
          {profile.about}
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
