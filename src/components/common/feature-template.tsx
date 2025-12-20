import BotToTopAnimation from '@/components/common/bot-to-top'
import Image from 'next/image'
import React from 'react'

const FeatureTemplate = ({
  image,
  title,
  content
}: {
  image: string

  title: string
  content: string
}) => {
  return (
    <div className='bg-[#f8edd8] flex flex-col gap-2 lg:w-96 w-full p-2 lg:p-6 rounded-3xl'>
      {/* Image Section */}
      <BotToTopAnimation delay={0} className='flex justify-center items-center'>
        <Image
          src={image}
          alt={title}
          width={50}
          height={50}
          className='lg:w-[80px] w-10 lg:h-[80px] h-10' // Ensure the image doesn't stretch
        />
      </BotToTopAnimation>

      {/* Title Section */}
      <BotToTopAnimation delay={0.25}>
        <h2
          className='xl:text-4xl/normal lg:text-xl text-base uppercase font-bold text-center '
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </BotToTopAnimation>
      {/* Content Section */}
      <BotToTopAnimation delay={0.5}>
        <p className='text-sm md:text-lg xl:text-2xl text-center px-4'>
          {content}
        </p>
      </BotToTopAnimation>
    </div>
  )
}

export default FeatureTemplate
