import { Button, Stack, Typography } from '@mui/material'
import { Reducer, useEffect, useReducer, useRef } from 'react'
import { TimerKnob } from './TimerKnob'
import { TimerType } from './timerTypes'

const initialTimer = {
  duration: 0,
  refId: undefined,
  timer: '00:00',
}

const milliseconds = 1000

//accepts duration in milliseconds
const timeParser = (n: number) => {
  const seconds = Math.floor((n / 1000) % 60)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((n / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0')
  return `${minutes}:${seconds}`
}

const timerReducer = (
  state: TimerType.TimeState,
  action: TimerType.TimerReducerAction,
) => {
  switch (action.type) {
    case TimerType.TimerActionEnum.SET:
      if (action.value) {
        return {
          ...state,
          duration: action.value,
          timer: timeParser(action.value),
        }
      }
      return state
    case TimerType.TimerActionEnum.RESET:
      return initialTimer
    case TimerType.TimerActionEnum.START:
      const newDuration = state.duration - milliseconds
      return { ...state, duration: newDuration, timer: timeParser(newDuration) }
    default:
      return state
  }
}

export const Timer = () => {
  //Ref is the interval, allowing it to persist between renders
  const Ref = useRef<number | undefined>()
  // const [timerDuration, setTimerDuration] = useState<number>(0)
  const [newTimer, dispatch] = useReducer<Reducer<any, any>>(
    timerReducer,
    initialTimer,
  )

  const setTimerDuration = (newTime: number) => dispatch({ type: TimerType.TimerActionEnum.SET, value: newTime })
  useEffect(() => {
    clearInterval(Ref.current)
  }, [])

  const handleButton = () => {
    if (Ref.current) {
      dispatch({ type: TimerType.TimerActionEnum.RESET })
      clearInterval(Ref.current)
      Ref.current = undefined
    } else {
      const id = setInterval(() => {
        dispatch({ type: TimerType.TimerActionEnum.START })
      }, milliseconds)
      Ref.current = id
    }
  }

  return (
    <Stack direction="column" alignItems="center" spacing={3}>
      <Typography variant="h2">Egg Timer</Typography>
      <TimerKnob
        timerDuration={initialTimer.duration}
        setTimerDuration={setTimerDuration}
        handleButton={handleButton}
      />
      <Typography variant="h2">{newTimer.timer}</Typography>
      <Button
        variant="tactile"
        onClick={() => {
          dispatch({ type: TimerType.TimerActionEnum.SET, value: 360000 })
        }}
      >
        + 360000
      </Button>
    </Stack>
  )
}
