import { IconButton, styled } from "@mui/material";

export const TactileIconButton = styled(IconButton)(({theme}) => ({
    boxShadow: `5px 5px 10px ${theme.palette.shadow},  -5px -5px 10px ${theme.palette.highlight}`,
    transition: '150ms ease-in-out',
    ' &:hover': {
      backgroundColor: 'none',
      boxShadow: 'none',
      transition: '150ms ease-in-out',
    },
  }))