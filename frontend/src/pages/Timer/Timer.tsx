import { Button, MenuItem, Stack, TextField, Typography, useTheme } from '@mui/material'
import { Reducer, useEffect, useReducer, useRef, useState } from 'react'
import { TimerKnob } from './TimerKnob'
import { TimerType } from './timerTypes'

const timerValues: Record<TimerType.TimerEnum, TimerType.TimeTypeEntry> = {
  egg: {
    label: 'Egg Timer',
    maxTime: 720000,
    presets: [
      {
        label: 'Soft Boiled',
        duration: 390000,
      },
      {
        label: 'Jammy',
        duration: 480000,
      },
      {
        label: 'Hard Boiled - Translucent',
        duration: 570000,
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
    maxTime: 840000,
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
        duration: 720000,
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
  totalTime: 600000,
  duration: 0,
  timer: '00:00',
  relativeAngle: 0,
  isCounting: false
}

const initialTimerType: TimerType.TimeTypeEntry = {
  label: '',
  maxTime: 0,
  presets: [],
  body: '',
}

const initialTimerPreset: TimerType.TimeTypePreset = {
  label: "",
  duration: 0
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
        const {duration, totalTime} = action.value
        return {
          ...state,
          relativeAngle: 360 * (duration / totalTime),
          totalTime: totalTime,
          duration: duration,
          isCounting: false,
          timer: timeParser(duration),
        }
      }
      return state
    case TimerType.TimerActionEnum.RESET:
      clearInterval(action.value)
      return initialTimer
    case TimerType.TimerActionEnum.OPTIMISTIC_START:
      return {...state, isCounting: true}
    case TimerType.TimerActionEnum.PAUSE:
      clearInterval(action.value)
      return {...state, isCounting: false}
    case TimerType.TimerActionEnum.START:
        const newDuration = state.duration - milliseconds
        const newAngle = (newDuration * 360 / state.totalTime)
        return { ...state, duration: newDuration, relativeAngle: newAngle, timer: timeParser(newDuration), isCounting: true }
    default:
      return state
  }
}

export const Timer = () => {
  //Ref is the interval, allowing it to persist between renders
  const TimerIntervalRef = useRef<number | undefined>()
  const theme = useTheme()
  const [timerPreset, setTimerPreset] = useState<TimerType.TimeTypePreset>(initialTimerPreset)
  const [timerType, setTimerType] = useState<TimerType.TimeTypeEntry>(initialTimerType)
  const [newTimer, dispatch] = useReducer<Reducer<any, any>>(
    timerReducer,
    initialTimer,
  )

  if (newTimer.duration <= 1000){
    clearInterval(TimerIntervalRef.current)
    TimerIntervalRef.current = undefined
  }

  const setTimerDrag = (newTime: {
    duration: number,
    totalTime: number,
  }) => {
    dispatch({ type: TimerType.TimerActionEnum.SET, value: newTime })
  }

  useEffect(() => {
    clearInterval(TimerIntervalRef.current)
  }, [])

  const handleButton = () => {
    if (!newTimer.isCounting && newTimer.duration > 0) {
      dispatch({type: TimerType.TimerActionEnum.OPTIMISTIC_START})
      const id = setInterval(() => {
          dispatch({ type: TimerType.TimerActionEnum.START })
      }, milliseconds)
      TimerIntervalRef.current = id
    } else if (newTimer.isCounting && newTimer.duration > 0) {
      dispatch({type: TimerType.TimerActionEnum.PAUSE, value: TimerIntervalRef.current})
      TimerIntervalRef.current = undefined
    } else {
      return
    }
  }

  const handleTimerSelect = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (TimerIntervalRef || newTimer.duration > 0) {
      dispatch({ type: TimerType.TimerActionEnum.RESET})
    }
    const chosenTimer = Object.values(timerValues).find(
      (timer) => timer.label === event.target.value,
    )
    if (chosenTimer) {
      if (TimerIntervalRef) clearInterval(TimerIntervalRef.current)
      setTimerPreset(initialTimerPreset)
      setTimerType(chosenTimer)
    }
  }
  const handleTimerPresetSelect = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    if (TimerIntervalRef) clearInterval(TimerIntervalRef.current)
    if (event) {
      const timerLabel = event.target.value
      const newTimePreset = timerType.presets.find(timer => timer.label === timerLabel)
      if(newTimePreset) {
        const value = {
          duration: newTimePreset.duration,
          totalTime: timerType.maxTime
        }
        dispatch({ type: TimerType.TimerActionEnum.SET, value: value })
        setTimerPreset(newTimePreset)
      }
    }
  }

  const handleClear = () => {
          dispatch({ type: TimerType.TimerActionEnum.RESET, value: TimerIntervalRef.current })
          setTimerType(initialTimerType)
          setTimerPreset(initialTimerPreset)
      TimerIntervalRef.current = undefined
  }

  return (
    <Stack direction="column" alignItems="center" spacing={4} maxWidth={"700px"}>
      <Stack direction="row" spacing={2} width="100%">
        <TextField
          select
          variant="standard"
          label="Timer Selection"
          value={timerType.label}
          onChange={handleTimerSelect}
          InputLabelProps={{
            style: {
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: 20,
            }
          }}
          sx={{
            width: '50%',
            alignSelf: 'start',
          }}
        >
          {Object.values(timerValues).map((timer, index) => {
            return (
              <MenuItem value={timer.label} key={index}>
                {timer.label}
              </MenuItem>
            )
          })}
        </TextField>
        <TextField
          select
          variant="standard"
          label="Timer Presets"
          value={timerPreset.label}
          onChange={handleTimerPresetSelect}
          InputLabelProps={{
            style: {
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: 20,
            }
          }}
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
        timer={newTimer}
        setTimerDrag={setTimerDrag}
        handleButton={handleButton}
      />
      <Stack direction="column" alignItems={"center"} spacing={2} position={'relative'}>
        {newTimer.duration > 999 && 
          <Button variant="tactile" onClick={handleClear} sx={{position: 'absolute', top: 0}}>
            Clear
          </Button>
        }
        <Typography variant="h2" sx={{ font: 'Space Mono', paddingTop: 7 }}>
          {newTimer.timer}
        </Typography>
        {timerType.body && 
          <Typography variant="body1" sx={{ font: 'Space Mono', paddingTop: 2 }}>
            {timerType.body}
          </Typography>
        }

      </Stack>
    </Stack>
  )
}
