'use client'

// components/MotionText.tsx
import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'

interface MotionTextProps {
  items: string[] // Dữ liệu cần render là một mảng các chuỗi
}

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const MotionText: React.FC<MotionTextProps> = ({ items }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' }) // Khi phần tử vào viewport thì mới kích hoạt animation

  return (
    <motion.ul
      ref={ref}
      className='md:mt-6 md:text-base lg:text-3xl text-sm md:ml-14 ml-7 space-y-1 list-disc font-light md:font-normal md:space-y-4 md:w-2/3 w-full'
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}>
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          // Thêm delay cho từng phần tử để tạo hiệu ứng xuất hiện lần lượt
          transition={{
            duration: 0.5,
            delay: 0.2 * index // Điều chỉnh delay cho mỗi phần tử
          }}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default MotionText
