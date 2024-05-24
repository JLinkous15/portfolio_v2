import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import Box, { BoxProps } from '@mui/material/Box'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import { measurements } from '../../theme'
import { ColorModeSwitch } from '../Common/ColorModeSwitch'
import { NavLinkType } from './Navbar'
import { NavbarContext } from './NavbarProvider'

interface StyledBoxProps extends BoxProps {
  open: boolean
}
interface NavDrawerProps extends DrawerProps {
  navLinks: NavLinkType
}

const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme, open }) => ({
  '& .MuiPaper-root': {
    overflow: 'hidden',
    height: '100vh',
    width: measurements.navbarSize,
    transition: theme.transitions.create('width', {}),
    ...(open && {
      width: measurements.navbarSize + measurements.navbarAdd,
      transition: theme.transitions.create('width', {}),
    }),
  },
}))

const StyledHeader = styled(Box, {
  shouldForwardProp: (props) => props !== 'open',
})<StyledBoxProps>(({ theme, open }) => ({
  marginLeft: 10,
  transition: 'margin ease-in-out',
  transitionDelay: '250ms',
  ...(open && {
    marginLeft: 10,
    color: theme.palette.secondary.main,
  }),
}))


export const NavDrawer = ({navLinks, ...props}: NavDrawerProps) => {
  const { open, setOpen } = useContext(NavbarContext)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <>
        <StyledDrawer {...props} open={open} variant="permanent">
          <StyledHeader open={open}>
            {!open ? (
              <Tooltip title="Menu">
                <IconButton
                  aria-label="menu-button"
                  color="primary"
                  onClick={handleOpen}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Close">
                <IconButton
                  aria-label="menu-button"
                  color="primary"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            )}
          </StyledHeader>
          <List>
            {navLinks.map((link, index) => (
              <ListItem key={index} onClick={link.onClick} disableGutters>
                <IconButton
                  sx={!open ? { width: '100%'} : {marginLeft: 1.4}}
                >
                  {link.icon}
                </IconButton>
                {open && <Typography variant="body1" noWrap>{link.title}</Typography>
                }
              </ListItem>
            ))}
          </List>
          <ColorModeSwitch
            sx={{ position: 'absolute', bottom: 10, left: 10 }}
          />
        </StyledDrawer>
    </>
  )
}
