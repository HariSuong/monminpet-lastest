import Image from 'next/image'

const Badge = ({ title }: { title: string }) => {
  return (
    <div className='absolute top-0 right-0  text-white px-2 py-1 lg:text-xs text-[0.5rem] font-bold'>
      <Image
        src='/icon/badge.png'
        alt='new'
        className='lg:w-20 w-12'
        width={20}
        height={20}
      />
      <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {title}
      </span>
    </div>
  )
}

export default Badge
