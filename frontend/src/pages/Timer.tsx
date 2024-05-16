import { Stack, styled } from "@mui/material"
import AvTimerIcon from '@mui/icons-material/AvTimer';
import { TactileIconButton } from "../components/Common/TactileIconButton";

const TimerKnobHousing = styled(Stack)(({theme}) => ({
    width: "20rem",
    height: "20rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    boxShadow: `inset 5px 5px 10px ${theme.palette.shadow}, inset -5px -5px 10px ${theme.palette.highlight}`
}))

export const Timer = () => {
    return (
        <TimerKnobHousing>
            <TactileIconButton size="large" color="primary">
                <AvTimerIcon fontSize="large" />
            </TactileIconButton>
        </TimerKnobHousing>
    )
}