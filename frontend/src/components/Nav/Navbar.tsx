import { DrawerProps } from '@mui/material/Drawer'
import { styled, useTheme } from '@mui/material/styles'
import { useContext, useEffect } from 'react'
import { measurements } from '../../theme'
import { NavDrawer } from './NavbarDrawer'
import { NavbarContext } from './NavbarProvider'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { NavbarAppBar } from './NavbarAppBar'
import { Paths } from '../../utils/paths'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import LocalBarIcon from '@mui/icons-material/LocalBar'
import CalculateIcon from '@mui/icons-material/Calculate'
import EggIcon from '@mui/icons-material/Egg'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

interface NavbarProps extends DrawerProps {
  children: React.ReactNode
}

interface ContentBox extends BoxProps {
  open: boolean
}

export type NavLinkType = {
  title: string
  onClick: () => void
  icon: React.ReactElement<any, any>
}[]

const BrowserBox = styled(Box)({
  minHeight: '100dvh',
  width: '100dvw',
})

const ContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<ContentBox>(({ theme, open }) => ({
  width: '100%',
  minWidth: '500px',
  paddingLeft: measurements.navbarSize * 2,
  paddingTop: measurements.navbarSize,
  paddingRight: measurements.navbarSize,
  position: 'absolute',
  right: 0,
  transition: theme.transitions.create('width', {}),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: measurements.navbarSize,
  },
  ...(open && {
    width: `calc(100% - ${measurements.navbarSize + measurements.navbarAdd}px)`,
    transition: theme.transitions.create('width', {}),
  }),
}))

export const Navbar = ({ children }: NavbarProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isUltrawide = useMediaQuery(theme.breakpoints.up('xl'))
  const { open, setOpen } = useContext(NavbarContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isUltrawide) setOpen(true)
  }, [isUltrawide])

  const navigationLinks: NavLinkType = [
    {
      title: 'Home',
      onClick: () => navigate(Paths.ABSOLUTE_HOME),
      icon: <HomeIcon color="primary" />,
    },
    {
      title: 'Food',
      onClick: () => navigate(Paths.ABSOLUTE_FOOD),
      icon: <LunchDiningIcon color="primary" />,
    },
    {
      title: 'Beverage',
      onClick: () => navigate(Paths.ABSOLUTE_BEV),
      icon: <LocalBarIcon color="primary" />,
    },
    {
      title: 'Egg Timer',
      onClick: () => navigate(Paths.ABSOLUTE_TIMER),
      icon: <EggIcon color="primary" />,
    },
    {
      title: 'Food Calculators',
      onClick: () => navigate(Paths.ABSOLUTE_CALC),
      icon: <CalculateIcon color="primary" />,
    },
  ]

  return (
    <BrowserBox>
      {!isMobile ? (
        <NavDrawer navLinks={navigationLinks} />
      ) : (
        <NavbarAppBar navLinks={navigationLinks} />
      )}
      <ContentBox open={open}>{children}</ContentBox>
    </BrowserBox>
  )
}
