export namespace TimerType {
  export enum TimerActionEnum {
    SET = 'Set',
    START = 'Start',
    SET_ANGLE = 'Set Angle',
    RESET = 'Reset',
  }

  export enum TimerEnum {
    EGG = 'egg',
    STEAK = 'steak',
  }

  export type TimerReducerAction = any

  export type TimeState = {
    duration: number
    timer: string
    relativeAngle: number
  }

  export type TimeTypePreset = {
    label: string
    duration: number
  }

  export type TimeTypeEntry = {
    label: string
    angleMultiplier: number
    presets: TimeTypePreset[]
    body: string
  }
}
