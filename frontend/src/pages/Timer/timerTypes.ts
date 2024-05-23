export namespace TimerType {
  export enum TimerActionEnum {
    SET = 'set',
    START = 'start',
    RESET = 'reset',
    OPTIMISTIC_START = 'optimistic start'
  }

  export enum TimerEnum {
    EGG = 'egg',
    STEAK = 'steak',
  }

  export type TimerReducerAction = any

  export type TimeState = {
    totalTime: number
    duration: number
    timer: string
    relativeAngle: number
    isCounting: boolean
  }

  export type TimeTypePreset = {
    label: string
    duration: number
  }

  export type TimeTypeEntry = {
    label: string
    maxTime: number
    presets: TimeTypePreset[]
    body: string
  }
}
