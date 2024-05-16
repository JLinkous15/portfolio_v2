/// <reference types="vite/client" />

export declare module '@mui/material/styles' {
  interface Palette {
    highlight: Palette
    shadow: Palette
  }

  interface PaletteOptions {
    highlight?: Palette['highlight']
    shadow?: Palette['shadow']
  }

  interface ThemeOptions {
    highlight?: Palette['highlight']
    shadow?: Palette['shadow']
  }
}

export declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    tactile: true
  }
}
