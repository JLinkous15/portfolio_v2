import AvTimerIcon from '@mui/icons-material/AvTimer'
import ClearIcon from '@mui/icons-material/Clear'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import { Stack, styled } from '@mui/material'
import { RefObject, useRef, useState } from 'react'
import { TactileIconButton } from '../../components/Common/TactileIconButton'

type TimerKnobProps = {
  timerDuration: number
  setTimerDuration: React.Dispatch<React.SetStateAction<number>>
  handleButton: () => void
}

type VerticeState = {
  x: number
  y: number
  angle: number
}

const TimerKnobHousing = styled(Stack)(({ theme }) => ({
  width: '20rem',
  height: '20rem',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  boxShadow: `inset 5px 5px 10px ${theme.palette.shadow}, inset -5px -5px 10px ${theme.palette.highlight}`,
  position: 'relative',
}))

const TimerHand = styled(FingerprintIcon)(({ theme }) => ({
  height: 65,
  width: 65,
  position: 'absolute',
  top: 30,
  padding: 5,
  left: `calc(50% - ${65 / 2}px)`,
  cursor: 'move',
  userSelect: 'none',
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  color: theme.palette.primary.main,
}))

export const TimerKnob = ({
  timerDuration,
  setTimerDuration,
  handleButton,
}: TimerKnobProps) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const parentElement = useRef<RefObject<HTMLDivElement>>()
  const childElement = useRef<RefObject<SVGSVGElement>>()
  const [vertices, setVertices] = useState<VerticeState>({
    x: 0,
    y: 0,
    angle: 0,
  })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    console.log('event', e)
    console.log('childRef', childElement)
    console.log('ParentRef', parentElement.current.getBoundingClientRect())

    if (e) {
      setIsMouseDown(true)
      setVertices((prev) => ({
        ...prev,
        x: e.clientX - prev.x,
        y: e.clientY - prev.y,
      }))
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (e) {
      setIsMouseDown(false)
      //determines the value of the timer based on the angle. 0 is nothing. 359 is 12 minutes.
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    // sets the angle of rotation using the tangent of the default vertices and the current vertices.
  }

  return (
    <TimerKnobHousing>
      <div
        ref={parentElement}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          transform: `rotate(${vertices.angle}deg)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        draggable={isMouseDown}
      >
        <TimerHand ref={childElement} />
      </div>
      <TactileIconButton
        size="large"
        color="primary"
        onClick={handleButton}
        sx={{
          width: '65px',
          height: '65px',
        }}
      >
        {timerDuration === 0 ? (
          <AvTimerIcon fontSize="large" />
        ) : (
          <ClearIcon fontSize="large" />
        )}
      </TactileIconButton>
    </TimerKnobHousing>
  )
}
