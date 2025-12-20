'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function RightToLeftAnimation({
  children,
  className,
  delay
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' }) // Chỉ khi phần tử vào viewport mới kích hoạt animation
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: delay || 0
      }}
      className={className}>
      {children}
    </motion.div>
  )
}
