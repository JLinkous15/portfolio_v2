import { DrawerProps } from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import { measurements } from '../../theme'
import { NavDrawer } from './NavbarDrawer'
import { NavbarContext } from './NavbarProvider'
import Box, { BoxProps } from '@mui/material/Box'

interface NavbarProps extends DrawerProps {
  children: React.ReactNode
}

interface ContentBox extends BoxProps {
  open: boolean
}

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
  ...(open && {
    width: `calc(100% - ${measurements.navbarSize + measurements.navbarAdd}px)`,
    transition: theme.transitions.create('width', {}),
  }),
}))

export const Navbar = ({ children }: NavbarProps) => {
  const { open } = useContext(NavbarContext)

  return (
    <BrowserBox>
      <NavDrawer open={open} />
      <ContentBox open={open}>{children}</ContentBox>
    </BrowserBox>
  )
}
