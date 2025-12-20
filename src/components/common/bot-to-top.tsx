'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function BotToTopAnimation({
  children,
  className,
  delay
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' }) // Kích hoạt animation khi phần tử vào viewport

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: delay || 0
      }}
      className={className}>
      {children}
    </motion.div>
  )
}
