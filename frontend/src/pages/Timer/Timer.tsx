import { Box, Typography } from '@mui/material'
import { TimerKnob } from './TimerKnob'
import { TimerCounter } from './TimerCounter'
import { useState } from 'react'

export const Timer = () => {
  const [timer, setTimer] = useState<string>('00:00')

  return (
    <Box>
      <Typography variant="h2">Timer</Typography>
      <TimerKnob timer={timer} setTimer={setTimer} />
      <TimerCounter timer={timer} setTimer={setTimer} />
    </Box>
  )
}
