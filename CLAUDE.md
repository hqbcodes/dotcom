# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal landing page/portfolio site built with Next.js 14, React 18, and TypeScript. It uses the Next.js App Router architecture with server components by default.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linter
npm lint
```

## Architecture

### Next.js App Router Structure

- `app/layout.tsx` - Root layout: fonts (VT323 + IBM Plex Mono via `next/font/google`), metadata, the scanline overlay, and Vercel Analytics
- `app/page.tsx` - Homepage; composes the section components in order
- `app/globals.css` - Colour tokens, gutters, and base element styles
- `app/components/` - One component per section (`Nav`, `Hero`, `Projects` + `ProjectCard`, `BlogList`, `OffHours` + `Bookshelf` + `Book` + `BookNotes`, `Footer`) plus small shared pieces (`Section`, `SectionHeader`, `Prompt`, `Cursor`, `Scanlines`), each with its own CSS module
- `app/data/` - All editable content as typed arrays (`profile.ts`, `projects.ts`, `posts.ts`, `offHours.ts`, `shelf.ts`)

### Key Patterns

- **Server Components by default**: Nothing on the page needs client JavaScript; keep it that way unless a feature requires it
- **CSS Modules**: Component-scoped styles using `.module.css` files; shared values are CSS custom properties in `globals.css`
- **TypeScript paths**: `@/*` alias maps to project root (tsconfig.json:22)
- **Strict mode enabled**: TypeScript strict mode and React strict mode are both on

### Design ("terminal")

- Black background, off-white text (`--fg: #f2f2f2`), grays `#d6d6d6` / `#bdbdbd` / `#9a9a9a` / `#808080`, borders `#2e2e2e` / `#3a3a3a`. Use the tokens in `globals.css`, not raw hex values.
- VT323 (`--font-display`) is for the name and headings only; everything else is IBM Plex Mono (`--font-mono`). Both fall back to `ui-monospace, Menlo` rather than next/font's resized Arial, because Plex lacks glyphs like `→` and `↗`.
- Content is capped at `--content-max` (1200px) and centred by `--gutter`; section borders run edge to edge. Breakpoints are 1100px, 900px (one-column projects) and 720px.
- The blinking cursor (`Cursor`) uses a `steps(1)` animation and stays solid under `prefers-reduced-motion`.

### Content

- Edit content in `app/data/`, not in the components.
- A project shows its `media` image through `next/image` when `kind: 'image'`, otherwise the dashed placeholder box. To add a screenshot, put it in `public/`, import it in `projects.ts`, and switch that project's `media` to `kind: 'image'`.
- The Blog section currently renders a `ComingSoon` box; its real markup is commented out in `BlogList.tsx` (data untouched in `posts.ts`). Uncomment it to bring it back.
- Outside of Work shows the `Bookshelf`: one spine per item in `shelf.ts` (what I'm reading, watching and playing). Hovering a spine turns the book in 3D to show its cover, and the status line under the shelf shows its title; keyboard focus rings the spine instead of turning it, because focus stays on a clicked book after its notes close. Clicking a book opens `BookNotes` over the dimmed page: cover on the left, the item's `notes` (one string per paragraph; `[NOTES]` until written) on the right. It uses the HTML popover API (`popover` / `popovertarget`), so it stays a Server Component; `popover.d.ts` types those attributes for React 18. Covers live in `public/shelf/` and keep their own aspect ratio; each item's optional `spine` sets its tone (`light` / `mid` / `dark`) and height. The neofetch block is still commented out in `OffHours.tsx` (data in `offHours.ts`).
- There is no blog backend yet: `posts.ts` holds placeholder rows, and `BlogList` sorts by `date`, newest first.
- Bracketed text like `[POST TITLE]` or `[RESUME URL]` is an intentional placeholder; leave it until real content exists.
