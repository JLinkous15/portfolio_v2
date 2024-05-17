export namespace TimerType {
  export enum TimerActionEnum {
    SET = 'Set',
    START = 'Start',
    PAUSE = 'Pause',
    RESET = 'Reset',
  }

  export type InitialTimeState = {
    startTime: number
    passedTime: number
    pausedTime: number
    totalTime: number
  }

  export type TimerReducerAction = {
    type: TimerActionEnum
  }

  export type TimerString = {
    time: `${number}${number}:${number}${number}`
  }

  export type TimerResponse = {
    time: TimerString
    timerDispatch: React.Dispatch<TimerType.TimerReducerAction>
  }
}
