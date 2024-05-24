import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { ListItemIcon, ListItemText, MenuList } from '@mui/material'
import AppBar, { AppBarProps } from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { measurements } from '../../theme'
import { ColorModeSwitch } from '../Common/ColorModeSwitch'
import { NavLinkType } from './Navbar'

interface NavAppBarProps extends AppBarProps {
  navLinks: NavLinkType
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (props) => props !== 'open',
})(({ theme }) => ({
  display: "flex",
  flexDirection: "row",

  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.default,
    height: measurements.navbarSize,
    transition: theme.transitions.create('width', {}),
  },
}))


export const NavbarAppBar = ({navLinks}: NavAppBarProps) => {
  // const { open, setOpen } = useContext(NavbarContext)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuOpen = Boolean(anchorEl)

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  return (
  <StyledAppBar>
    {!menuOpen ? (
      <Tooltip title="Menu">
        <IconButton
          aria-label="menu-button"
          onClick={handleOpen}
          color="primary"
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Close">
        <IconButton
          aria-label="menu-button"
          onClick={handleClose}
          color="primary"
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
    )}
    <ColorModeSwitch />
    <Menu 
    open={menuOpen} 
    onClose={handleClose}
    onClick={handleClose}
    anchorEl={anchorEl} 
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}>
      <MenuList dense>

      {navLinks.map((link, index) => (
        <MenuItem onClick={link.onClick} key={index}>
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText>{link.title}</ListItemText>
        </MenuItem>
      ))}
      </MenuList>
    </Menu>
</StyledAppBar>)

}
