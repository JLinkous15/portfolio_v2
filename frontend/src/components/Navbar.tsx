import Box, { BoxProps } from '@mui/material/Box'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import { NavbarContext, NavbarContextProvider } from './NavbarProvider'
import Button from '@mui/material/Button'
import { measurements } from '../theme'
import { NavDrawer } from './NavbarDrawer'

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


        width: `calc(100% - ${measurements.navbarSize}px)`,
        position: "absolute",
        right: 0,
        transition: theme.transitions.create('width', {
        
        }),
    
        ...(open && {
            width: `calc(100% - ${measurements.navbarSize + measurements.navbarAdd}px)`,
            transition: theme.transitions.create('width', {
        
            }),
        }),
}))


export const Navbar = ({ children }: NavbarProps) => {
  const { open, setOpen } = useContext(NavbarContext)

  return (
      <BrowserBox>
        <NavDrawer open={open} />
        <ContentBox open={open}>
            <Button onClick={() => setOpen(!open)} variant="tactile" color="primary" sx={{margin: 2}}>open</Button>
            {children}</ContentBox>
      </BrowserBox>
  )
}
