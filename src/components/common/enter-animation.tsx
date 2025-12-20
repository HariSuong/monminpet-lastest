'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function EnterAnimation({
  children,
  className,
  delay
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.4,
        delay: delay || 0,

        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 }
      }}
      className={className}
      // style={ball}
    >
      {children}
    </motion.div>
  )
}

/**
 * ==============   Styles   ================
 */

// const ball = {
//     width: 100,
//     height: 100,
//     backgroundColor: "#dd00ee",
//     borderRadius: "50%",
// }
