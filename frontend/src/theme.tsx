import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { createContext, useEffect, useMemo, useState } from 'react'

export const measurements = {
  navbarSize: 60,
  navbarAdd: 200
}

//palette options
const hexPalette = {
  primary: {
    light: '#3F6A84',
    dark: '#4690BC',
  },
  secondary: {
    light: '#c74836',
    dark: '#E4523E',
  },
  highlight: {
    light: "#EFEFEF",
    dark: "#383838"
  },
  shadow: {
    light: "#D0D0D0",
    dark: "#1d1d1d",
  },
  background: {
    light: {
      default: '#DDDDDD',
      paper: '#DDDDDD'
    },
    dark: {
      default: '#282828',
      paper: '#282828'

    },
  },
  text: {
    light: {
      primary: '#000000',
      disabled: '#00000050',
    },
    dark: {
      primary: '#ffffff',
      disabled: '#ffffff50',
    },
  },
}

//sets the color mode on the palette object and conditionally chooses the palette
const getTheme = (mode: PaletteMode) => ({
  components: {
    MuiButtonBase: {
      defaultProps: {
        focusRipple: true
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'tactile'},
          style: {
            boxShadow: `5px 5px 10px ${mode === 'light' ? hexPalette.shadow.light : hexPalette.shadow.dark},  -5px -5px 10px ${mode === 'light' ? hexPalette.highlight.light : hexPalette.highlight.dark}`,
            transition: '150ms ease-in-out',
            ' &:hover': {
              backgroundColor: "none",
              boxShadow: "none",
              transition: '150ms ease-in-out',
            },
          },
        },
        {
          props: { variant: 'tactile', color: "primary"},
          style: {
            color: mode === "light" ? hexPalette.primary.light : hexPalette.primary.dark,
          },
        },
        {
          props: { variant: 'tactile', color: "secondary"},
          style: {
            color: mode === "light" ? hexPalette.secondary.light : hexPalette.secondary.dark,
          },
        },
      ]

    }
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: hexPalette.primary.light,
          },
          secondary: {
            main: hexPalette.secondary.light,
          },
          background: hexPalette.background.light,
          text: hexPalette.text.light,
        }
      : {
          // palette values for light mode
          primary: {
            main: hexPalette.primary.dark,
          },
          secondary: {
            main: hexPalette.secondary.dark,
          },
          background: hexPalette.background.dark,
          text: hexPalette.text.dark,
        }),
  },
})

type ThemeProvider = {
  children: React.ReactNode
}

type ColorModeContextType = {
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType,
)

export const JLThemeProvider = ({ children }: ThemeProvider) => {
  const localStorageItem = 'JLColorMode'
  const [mode, setMode] = useState<PaletteMode>('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        )
        localStorage.setItem(localStorageItem, mode)
      },
    }),
    [],
  )

  useEffect(() => {
    const userColorMode = localStorage.getItem(localStorageItem)
    if (userColorMode && userColorMode === ('light' || 'dark'))
      setMode(userColorMode)
    else localStorage.setItem(localStorageItem, mode)
  }, [])

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
