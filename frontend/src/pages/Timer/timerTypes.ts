import React from "react"

export namespace TimerType {
  export enum TimerActionEnum {
    SET = 'Set',
    START = 'Start',
    PAUSE = 'Pause',
    RESET = 'Reset',
  }

  export type TimerReducerAction = {
    type: TimerActionEnum
    value?: number
    ref?: React.MutableRefObject<number | undefined>
  }

  export type TimeState = {
    duration: number
    pausedTime: number
    timer: string
  }
}
