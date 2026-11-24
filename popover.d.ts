// React 18's types predate the HTML popover API. React 18 passes these
// lowercase attributes straight through to the DOM, so declaring them is
// enough. Drop this file after upgrading to React 19, which types them as
// `popover` and `popoverTarget`.
import 'react'

declare module 'react' {
  interface HTMLAttributes<T> {
    popover?: 'auto' | 'manual'
  }

  interface ButtonHTMLAttributes<T> {
    popovertarget?: string
    popovertargetaction?: 'show' | 'hide' | 'toggle'
  }
}
