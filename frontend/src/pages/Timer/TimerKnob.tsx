import { Stack, styled } from '@mui/material'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import { TactileIconButton } from '../../components/Common/TactileIconButton'
import ClearIcon from '@mui/icons-material/Clear'

type TimerKnobProps = {
  timer: string
  setTimer: React.Dispatch<React.SetStateAction<string>>
}

const TimerKnobHousing = styled(Stack)(({ theme }) => ({
  width: '20rem',
  height: '20rem',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  boxShadow: `inset 5px 5px 10px ${theme.palette.shadow}, inset -5px -5px 10px ${theme.palette.highlight}`,
}))

export const TimerKnob = ({ timer, setTimer }: TimerKnobProps) => {
  const isTimeZero = (time: string) => {
    return time.split(':').some((num) => parseInt(num) > 0)
  }
  const handleTimerClick = () => {
    const isZero = isTimeZero(timer)
    if (isZero) {
    } else {
      setTimer('')
    }
  }

  return (
    <TimerKnobHousing>
      <TactileIconButton
        size="large"
        color="primary"
        onClick={handleTimerClick}
      >
        {isTimeZero(timer) ? (
          <ClearIcon fontSize="large" />
        ) : (
          <AvTimerIcon fontSize="large" />
        )}
      </TactileIconButton>
    </TimerKnobHousing>
  )
}
