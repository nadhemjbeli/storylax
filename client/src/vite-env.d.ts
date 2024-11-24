declare module '*.svg' {
  import * as React from 'react'

export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >
}
//vite-env.d.ts

/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
