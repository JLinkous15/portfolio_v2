import Box, { BoxProps } from '@mui/material/Box'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { styled, useTheme } from '@mui/material/styles'
import { measurements } from '../../theme'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useContext } from 'react'
import { NavbarContext } from './NavbarProvider'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import LocalBarIcon from '@mui/icons-material/LocalBar'
import CalculateIcon from '@mui/icons-material/Calculate'
import EggIcon from '@mui/icons-material/Egg'
import { Paths } from '../../utils/paths'
import {
  AppBar,
  AppBarProps,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ColorModeSwitch } from '../Common/ColorModeSwitch'

interface NavDrawerProps extends DrawerProps {}
interface StyledBoxProps extends BoxProps {
  open: boolean
}
interface StyledAppBar extends AppBarProps {
  open: boolean
}

const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme, open }) => ({
  '& .MuiPaper-root': {
    height: '100vh',
    width: measurements.navbarSize,
    overflow: "hidden",
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

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (props) => props !== 'open',
})<StyledAppBar>(({ theme, open }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.default,
    height: measurements.navbarSize,
    transition: theme.transitions.create('width', {}),
  }
}))

export const NavDrawer = (props: NavDrawerProps) => {
  const { open, setOpen } = useContext(NavbarContext)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const navigationLinks = [
    {
      title: 'Food',
      path: Paths.ABSOLUTE_FOOD,
      icon: <LunchDiningIcon color="primary" />,
    },
    {
      title: 'Beverage',
      path: Paths.ABSOLUTE_BEV,
      icon: <LocalBarIcon color="primary" />,
    },
    {
      title: 'Egg Timer',
      path: Paths.ABSOLUTE_TIMER,
      icon: <EggIcon color="primary" />,
    },
    {
      title: 'Food Calculators',
      path: Paths.ABSOLUTE_CALC,
      icon: <CalculateIcon color="primary" />,
    },
  ]

  return (
    <>
      {!isMobile ? (
        <StyledDrawer {...props} variant="permanent">
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
            {navigationLinks.map((nav, index) => (
              <ListItem key={index} disableGutters>
                <IconButton
                  onClick={() => navigate(nav.path)}
                  sx={!open ? { width: '100%' } : {}}
                >
                  {nav.icon}
                </IconButton>
                {open && <Typography variant="body1">{nav.title}</Typography>}
              </ListItem>
            ))}
          </List>
          <ColorModeSwitch sx={{position: "absolute", bottom: 10, left: 10}} />
        </StyledDrawer>
      ) : isMobile && (
        <StyledAppBar open={open}>
          <StyledHeader open={open}>
            {!open ? (
              <Tooltip title="Menu">
                <IconButton
                  aria-label="menu-button"
                  onClick={handleOpen}
                  sx={{color: theme.palette.text.secondary}}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Close">
                <IconButton
                  aria-label="menu-button"
                  onClick={handleClose}
                  sx={{color: theme.palette.text.secondary}}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            )}
          </StyledHeader>
        </StyledAppBar>
      )}
    </>
  )
}
