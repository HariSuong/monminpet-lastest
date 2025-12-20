import Image from 'next/image'
import styles from './arrows.module.css'

interface SampleArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const SampleNextArrow: React.FC<SampleArrowProps> = ({
  className,
  style,
  onClick
}) => {
  return (
    <Image
      src='/icon/next.png'
      width={50}
      height={50}
      className={`${styles.arrow} ${styles['next-arrow']} ${className}`}
      style={style}
      // className={className}
      // style={{ ...style, width: '40px', height: '40px', right: '-16px' }}
      onClick={onClick}
      alt='Next'
    />
  )
}

export default SampleNextArrow
