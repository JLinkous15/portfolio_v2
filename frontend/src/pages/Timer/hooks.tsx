//component interacts with Date primitives for more streamlined math operators.
import { useEffect, useReducer, useState } from 'react'
import { TimerType } from './timerTypes'

export const useTimer = (time: number): TimerType.TimerResponse => {
  const initialTimeState: TimerType.InitialTimeState = {
    startTime: 0,
    passedTime: 0,
    pausedTime: 0,
    totalTime: 0,
  }

  const reducer = (
    state: TimerType.InitialTimeState,
    action: TimerType.TimerReducerAction,
  ) => {
    switch (action.type) {
      case TimerType.TimerActionEnum.SET:
        return { ...state, ...initialTimeState, totalTime: time }
      case TimerType.TimerActionEnum.START:
        const newStartTime = Date.now()
        if (state.startTime > 0) {
          return { ...state, startTime: newStartTime }
        } else {
          return initialTimeState
        }
      case TimerType.TimerActionEnum.PAUSE:
        const pausedTime = Date.now()
        if (state.startTime > 0 && state.startTime !== pausedTime) {
          return { ...state, pausedTime: pausedTime }
        } else {
          return initialTimeState
        }
      case TimerType.TimerActionEnum.RESET:
        return initialTimeState
      default:
        return initialTimeState
    }
  }

  const [newTime, timerDispatch] = useReducer(reducer, initialTimeState)
  const [timeString, setTimeString] = useState<TimerType.TimerString>({
    time: '00:00',
  })

  useEffect(() => {}, [newTime])

  return {
    time: timeString,
    timerDispatch,
  }
}
