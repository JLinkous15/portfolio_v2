import { MenuItem, Stack, TextField, Typography } from '@mui/material'
import { Reducer, useEffect, useReducer, useRef, useState } from 'react'
import { TimerKnob } from './TimerKnob'
import { TimerType } from './timerTypes'

const timerValues: Record<TimerType.TimerEnum, TimerType.TimeTypeEntry> = {
  egg: {
    label: 'Egg Timer',
    angleMultiplier: 2000,
    presets: [
      {
        label: 'Soft Boiled',
        duration: 363000,
      },
      {
        label: 'Jammy',
        duration: 480000,
      },
      {
        label: 'Hard Boiled - Translucent',
        duration: 543000,
      },
      {
        label: 'Hard Boiled - Opaque',
        duration: 720000,
      },
    ],
    body: 'No prep is necessary. Timer is tuned to water that is rapidly boiling and eggs that are refrigerated. Times will vary, depending on altitude and refrigerator temperature. Place in ice bath when timer is up.',
  },
  steak: {
    label: 'Pan-Seared Steak Timer',
    angleMultiplier: 2333,
    presets: [
      {
        label: 'Rare',
        duration: 360000,
      },
      {
        label: 'Medium Rare',
        duration: 480000,
      },
      {
        label: 'Medium',
        duration: 600000,
      },
      {
        label: 'Medium Well',
        duration: 840000,
      },
      {
        label: 'Well',
        duration: 0,
      },
    ],
    body: 'Timer is tuned to a heavy-bottomed pan with neutral oil that is heavily smoking and steaks which are of a high fat content (ribeye) and a dry surface. Optimal prepararation: salt both sides of the steak with 2% of the total weight of your steak and leave uncovered in the refrigerator overnight. The next day, remove 1 hour before cooking.',
  },
}

const initialTimer: TimerType.TimeState = {
  duration: 0,
  timer: '00:00',
  relativeAngle: 0,
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
    case TimerType.TimerActionEnum.SET_ANGLE:
      return state
    default:
      return state
  }
}

export const Timer = () => {
  //Ref is the interval, allowing it to persist between renders
  const TimerIntervalRef = useRef<number | undefined>()
  const [timerType, setTimerType] = useState<TimerType.TimeTypeEntry>({
    label: '',
    angleMultiplier: 0,
    presets: [],
    body: '',
  })
  const [newTimer, dispatch] = useReducer<Reducer<any, any>>(
    timerReducer,
    initialTimer,
  )

  const setTimerDuration = (newTime: number) =>
    dispatch({ type: TimerType.TimerActionEnum.SET, value: newTime })
  useEffect(() => {
    clearInterval(TimerIntervalRef.current)
  }, [])

  const handleButton = () => {
    if (TimerIntervalRef.current) {
      dispatch({ type: TimerType.TimerActionEnum.RESET })
      clearInterval(TimerIntervalRef.current)
      TimerIntervalRef.current = undefined
    } else {
      const id = setInterval(() => {
        dispatch({ type: TimerType.TimerActionEnum.START })
      }, milliseconds)
      TimerIntervalRef.current = id
    }
  }

  const handleTimerSelect = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const chosenTimer = Object.values(timerValues).find(
      (timer) => timer.label === event.target.value,
    )
    if (chosenTimer) setTimerType(chosenTimer)
  }
  const handleTimerPresetSelect = () => {}

  return (
    <Stack direction="column" alignItems="center" spacing={4}>
      <Stack direction="row" spacing={2} width="100%">
        <TextField
          select
          variant="standard"
          label="Timer Selection"
          value={timerType.label}
          onChange={handleTimerSelect}
          sx={{
            width: '50%',
            alignSelf: 'start',
          }}
        >
          {Object.entries(timerValues).map((timer, index) => {
            const [_, timerValue] = timer
            return (
              <MenuItem value={timerValue.label} key={index}>
                {timerValue.label}
              </MenuItem>
            )
          })}
        </TextField>
        <TextField
          select
          variant="standard"
          label="Timer Presets"
          value={''}
          fullWidth
          sx={{
            display: timerType.presets.length > 0 ? 'inline-flex' : 'none',
            width: '50%',
            alignSelf: 'end',
          }}
        >
          {timerType.presets.length > 0 ? (
            timerType.presets.map((timer, index) => (
              <MenuItem value={timer.label} key={index}>
                {timer.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={'Default'}>Default</MenuItem>
          )}
        </TextField>
      </Stack>
      <TimerKnob
        timerDuration={initialTimer.duration}
        setTimerDuration={setTimerDuration}
        handleButton={handleButton}
      />
      <Typography variant="h2" sx={{ font: 'Space Mono' }}>
        {newTimer.timer}
      </Typography>
    </Stack>
  )
}
