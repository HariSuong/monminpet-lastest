'use client'

import CountdownUI from '@/components/countdown-ui'
import { CountdownRenderProps } from 'react-countdown'

// Random component
const Completionist = () => <span>You are good to go!</span>

// Renderer callback with condition
export const renderer: React.FC<CountdownRenderProps> = ({
  hours,
  minutes,
  seconds,
  completed
}) => {
  return <CountdownUI hours={hours} minutes={minutes} seconds={seconds} />

  // if (completed) {
  //   // Render a complete state
  //   return <Completionist />
  // } else {
  //   // Render a countdown
  //   return <CountdownUI hours={hours} minutes={minutes} seconds={seconds} />
  // }
}
