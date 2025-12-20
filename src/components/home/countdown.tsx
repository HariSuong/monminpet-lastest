'use client'

import React from 'react'
import Countdown from 'react-countdown'
import { renderer } from '@/components/countdown-time'

const CountdownHome = ({ timer }: { timer: number }) => {
  return <Countdown date={Date.now() + timer} renderer={renderer} />
}

export default CountdownHome
