import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import { IconButton, Menu, useTheme } from '@mui/material'
import Stack, { StackProps } from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import { useContext, useState } from 'react'
import { ColorModeContext } from '../../theme'
import { TactileIconButton } from './TactileIconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'

interface ColorModeSwitchProps extends StackProps {}

export const ColorModeSwitch = ({ ...props }: ColorModeSwitchProps) => {
  const { toggleColorMode } = useContext(ColorModeContext)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  const handleMenuOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e) setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSwitch = () => toggleColorMode()

  return (
    <Stack direction="row" {...props} width="100%">
      <IconButton onClick={handleMenuOpen}>
        <Brightness4Icon color="primary" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <Stack direction="row" alignItems="center" padding={2}>
          <LightModeIcon color="primary" />
          <Switch
            color="primary"
            checked={theme.palette.mode === 'dark'}
            onChange={handleSwitch}
          />
          <ModeNightIcon color="primary" />
        </Stack>
      </Menu>
    </Stack>
  )
}
