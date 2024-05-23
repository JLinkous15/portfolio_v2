import AvTimerIcon from '@mui/icons-material/AvTimer'
import ClearIcon from '@mui/icons-material/Clear'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import { Stack, styled } from '@mui/material'
import { useRef, useState } from 'react'
import { TactileIconButton } from '../../components/Common/TactileIconButton'
import { TimerType } from './timerTypes'

//Local parameterized measures to be used for rendering. Able to be reassigned programmatically
let knobHandSize = 65
let knobSize = 320

type TimerKnobProps = {
  timer: TimerType.TimeState
  setTimerDrag: (newTime: {
    duration: number,
    totalTime: number
  }) => void
  handleButton: () => void
}

type Vertice = {
  dx: number
  dy: number
  angle?: number
}

const TimerKnobHousing = styled(Stack)(({ theme }) => ({
  width: `${knobSize}px`,
  height: `${knobSize}px`,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  boxShadow: `inset 5px 5px 10px ${theme.palette.shadow}, inset -5px -5px 10px ${theme.palette.highlight}`,
  position: 'relative',
}))

const TimerHand = styled(FingerprintIcon)(({ theme }) => ({
  height: knobHandSize,
  width: knobHandSize,
  position: 'absolute',
  top: 30,
  padding: 12,
  left: `calc(50% - ${knobHandSize / 2}px)`,
  cursor: 'move',
  userSelect: 'none',
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.default,
}))

const TimerHandLine = styled('div')({
  width: '1px',
  height: `${knobSize / 4}px`,
  border: `1px solid transparent`,
  position: 'absolute',
  top: `${knobSize / 3.4}px`,
  left: '50%',
})

const getAngle = (point: Vertice) => {
  if (point.dx < 0 && point.dy > 0) {
    return 360 + (Math.atan(point.dx / point.dy) * 180) / Math.PI
  }
  if (point.dx > 0 && point.dy < 0) {
    return 180 + (Math.atan(point.dx / point.dy) * 180) / Math.PI
  }
  if (point.dx < 0 && point.dy < 0) {
    return 180 + (Math.atan(point.dx / point.dy) * 180) / Math.PI
  }
  return (Math.atan(point.dx / point.dy) * 180) / Math.PI
}

export const TimerKnob = ({
  timer,
  setTimerDrag,
  handleButton,
}: TimerKnobProps) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const parentElement = useRef(null)
  const handElement = useRef({
    dx: 0,
    dy: 0,
  })
  const [vertices, setVertices] = useState<Vertice>({
    dx: 0,
    dy: 0,
    angle: 0,
  })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (e && parentElement.current) {
      const parentEl: DOMRect = (
        parentElement.current as HTMLElement
      ).getBoundingClientRect()
      const parent = {
        dx: parentEl.x + parentEl.width / 2,
        dy: parentEl.y + parentEl.height / 2,
      }
      setVertices((prev) => ({ ...prev, ...parent }))
      setIsMouseDown(true)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (isMouseDown && e) {
      const verticesCopy = { ...vertices }
      handElement.current = {
        ...handElement.current,
        dx: e.clientX - verticesCopy.dx,
        dy: verticesCopy.dy - e.clientY,
      }
      const angle = getAngle(handElement.current)
      console.log(angle)
      console.log(timer.totalTime)
      // setVertices((prev) => ({ ...prev, angle }))
      const newValue = {
        duration: timer.totalTime * (angle / 360),
        totalTime: timer.totalTime,
        relativeAngle: angle
      }
      setTimerDrag(newValue)
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (e) {
      setIsMouseDown(false)
    }
  }

  return (
    <TimerKnobHousing>
      <div
        ref={parentElement}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          transform: `rotate(${timer.relativeAngle}deg)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <TimerHand sx={{ transform: `rotate(-${timer.relativeAngle}deg)` }} />
        <TimerHandLine />
      </div>
      <TactileIconButton
        size="large"
        color="primary"
        onClick={handleButton}
        sx={{
          width: `${knobHandSize}px`,
          height: `${knobHandSize}px`,
        }}
      >
        {!timer.isCounting ? (
          <AvTimerIcon fontSize="large" />
        ) : (
          <ClearIcon fontSize="large" />
        )}
      </TactileIconButton>
    </TimerKnobHousing>
  )
}
