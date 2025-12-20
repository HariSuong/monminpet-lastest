import Image from 'next/image'
import styles from './arrows.module.css'

interface SampleArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const SamplePrevArrow: React.FC<SampleArrowProps> = ({
  className,
  style,
  onClick
}) => {
  return (
    <Image
      src='/icon/prev.png'
      width={50}
      height={50}
      className={`${styles.arrow}  ${styles['prev-arrow']} ${className}`}
      style={style}
      onClick={onClick}
      alt='Prev'
    />
  )
}

export default SamplePrevArrow
