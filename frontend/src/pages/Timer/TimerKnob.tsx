import AvTimerIcon from '@mui/icons-material/AvTimer'
import ClearIcon from '@mui/icons-material/Clear'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import { Stack, styled } from '@mui/material'
import { RefObject, useRef, useState } from 'react'
import { TactileIconButton } from '../../components/Common/TactileIconButton'
import { Preview } from '@mui/icons-material'

//Local parameterized measures to be used for rendering. Able to be reassigned programmatically
let knobHandSize = 65
let knobSize = 320

type TimerKnobProps = {
  timerDuration: number
  setTimerDuration: (newTime: number) => void
  handleButton: () => void
}

type Vertice = {
  x: number
  y: number
  angle?: number
}

type VerticeState = {
  top: Vertice,
  bottom: Vertice,
  left:Vertice,
  right: Vertice,
  center: Vertice,
  angle: number}

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

const TimerHandLine = styled('div')(({theme}) => ({
  width: '1px',
  height: `${knobSize / 4}px`,
  border: `1px solid ${theme.palette.primary.main}`,
  position: 'absolute',
  top: `${knobSize / 3.4}px`,
  left: '50%',
}))

const getAngle = (point: Vertice) => {
  if (point.x < 0 && point.y > 0) {
    return 360 + (Math.atan(point.x / point.y) * 180 / Math.PI);
  }
  if (point.x > 0 && point.y < 0) {
    return 180 + (Math.atan(point.x / point.y) * 180 / Math.PI);
  }
  if (point.x < 0 && point.y < 0) {
    return 180 + (Math.atan(point.x / point.y) * 180 / Math.PI);
  }
  return Math.atan(point.x / point.y) * 180 / Math.PI;
}

export const TimerKnob = ({
  timerDuration,
  setTimerDuration,
  handleButton,
}: TimerKnobProps) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const parentElement = useRef<RefObject<HTMLDivElement>>()
  const handElement = useRef<RefObject<Vertice>>({current: {
    x: 0,
    y: 0,
    angle: 90
  }})
  const angle = useRef<RefObject<number>>()
  const [vertices, setVertices] = useState<VerticeState>({
    top: {
      x: 0,
      y: 0,
    },
    bottom: {
      x: 0,
      y: 0,
    },
    left:{
      x: 0,
      y: 0,
    },
    right: {
      x: 0,
      y: 0, 
    },
    center: {
      x: 0, 
      y: 0
    },
    angle: 0
   }
  )

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (e) {
      const parentEl: DOMRect = parentElement.current.getBoundingClientRect()

      const parent = {
        top: {
          x: parentEl.width / 2 + parentEl.left, 
          y: parentEl.top
        },
        bottom: {
          x: parentEl.width / 2 + parentEl.left, 
          y: parentEl.bottom
        },
        left:{
          x: parentEl.left, 
          y: parentEl.height / 2 + parentEl.top, 
        },
        right: {
          x: parentEl.right, 
          y: parentEl.height / 2 + parentEl.top, 
        },
        center: {
          x: 0, 
          y: 0
        },
      }
      parent.center = {
        x: (parent.left.x + parent.right.x) / 2,
        y: (parent.top.y + parent.bottom.y) / 2,
      }
      setVertices((prev) => ({...prev, ...parent}))
      setIsMouseDown(true)
    }
  }
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (isMouseDown && e) {
      const verticesCopy = {...vertices}
      handElement.current = { x: e.clientX - verticesCopy.center.x, y: verticesCopy.center.y - e.clientY, angle: 0}
      const angle = getAngle(handElement.current)
      handElement.current.angle = angle
      setVertices(prev => ({...prev, angle}))
      const eggMultiplier = 30
      const minutes = angle/eggMultiplier
      const milliseconds = minutes * 60 * 1000
      setTimerDuration(milliseconds)
      console.log(minutes)

    }
    // sets the angle of rotation using the tangent of the default vertices and the current vertices.
  }
  
    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
      if (e) {
        setIsMouseDown(false)
        // const angle = handElement.current.angle
        // const eggMultiplier = 30
        // const minutes = angle/eggMultiplier
        // console.log(minutes)
        // const milliseconds = minutes * 60 * 1000
        // setTimerDuration(milliseconds)
          //determines the value of the timer based on the angle. 0 is nothing. 359 is 12 minutes.
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
          transform: `rotate(${vertices.angle}deg)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <TimerHand sx={{transform: `rotate(${vertices.angle}deg)`}} />
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
        {timerDuration === 0 ? (
          <AvTimerIcon fontSize="large" />
        ) : (
          <ClearIcon fontSize="large" />
        )}
      </TactileIconButton>
    </TimerKnobHousing>
  )
}
