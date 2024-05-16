import { Drawer, DrawerProps, SvgIcon, styled } from "@mui/material";
import { measurements } from "../theme";

interface NavDrawerProps extends DrawerProps {

}

const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme, open }) => ({
    '& .MuiPaper-root': {
    width: measurements.navbarSize,
    transition: theme.transitions.create('width', {
        
    }),
  ...(open && {
    width: measurements.navbarSize + measurements.navbarAdd,
    transition: theme.transitions.create('width', {
        
    }),
  }),
}
}))

export const NavDrawer = (props: NavDrawerProps) => {
    return (
    <StyledDrawer
    {...props}
    variant="permanent"
    >
        <SvgIcon></SvgIcon>
    </StyledDrawer>
)
}