import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ButtonService from '@/components/common/button-service'
import LeftToRightAnimation from '@/components/common/left-to-right'
import RightToLeftAnimation from '@/components/common/right-to-left'
import TopToBotAnimation from '@/components/common/top-to-bot'
import BotToTopAnimation from '@/components/common/bot-to-top'
import slugify from 'slugify'

const ServiceTemplate = ({
  image,
  type,
  title,
  children,
  position = 'left',
  titleButton,
  id
}: {
  image: string
  type?: string
  title: string
  children: React.ReactNode
  position?: 'left' | 'right'
  titleButton?: string
  id?: number
}) => {
  return (
    <div className='lg:flex block items-center mb-8 lg:mb-0'>
      {position === 'left' && (
        <div className='lg:w-1/2 w-full lg:px-0 px-8 relative md:h-[768px] h-[350px]'>
          <div>
            <Image
              src={image}
              alt={title}
              fill
              className='object-cover w-full h-full' // Make sure it stretches properly
            />
          </div>
        </div>
      )}
      {position === 'right' && (
        <div className='lg:w-1/2 block lg:hidden w-full lg:px-0 px-8 relative lg:h-[768px] h-[350px]'>
          <div>
            <Image
              src={image}
              alt={title}
              fill
              className='object-cover w-full h-full' // Make sure it stretches properly
            />
          </div>
        </div>
      )}
      <div
        className={`lg:w-1/2 w-full px-8 md:!px-12 lg:!px-24 xl:space-y-20 space-y-4`}>
        <h2
          className={`${
            title === 'CHƯƠNG TRÌNH THIỆN NGUYỆN'
              ? 'xl:text-[1.9rem]'
              : 'xl:text-[2.75rem]'
          } md:text-2xl text-lg uppercase font-bold lg:mt-0 mt-4`}>
          {title}
        </h2>

        {position === 'left' && (
          <TopToBotAnimation>
            <div>
              {type === 'service' ? (
                <>
                  <div
                    className='content-container mb-4'
                    dangerouslySetInnerHTML={{ __html: children as string }}
                  />
                  <ButtonService
                    title='XEM THÊM'
                    linkUrl={`/services/${slugify(title || '', {
                      lower: true,
                      strict: true,
                      locale: 'vi'
                    })}/${id}`}
                  />
                </>
              ) : (
                <div className='xl:text-xl lg:text-base text-sm'>
                  {children}
                </div>
              )}
            </div>
          </TopToBotAnimation>
        )}
        {position === 'right' && (
          <TopToBotAnimation>
            <div>
              {type === 'service' ? (
                <>
                  <div
                    className='content-container mb-4'
                    dangerouslySetInnerHTML={{ __html: children as string }}
                  />
                  <ButtonService
                    title='XEM THÊM'
                    linkUrl={`/services/${slugify(title || '', {
                      lower: true,
                      strict: true,
                      locale: 'vi'
                    })}/${id}`}
                  />
                </>
              ) : (
                <div className='xl:text-xl lg:text-base text-sm'>
                  {children}
                </div>
              )}
            </div>
          </TopToBotAnimation>
        )}
        {/* <div
          className='xl:text-xl lg:text-base text-base content-container'
          dangerouslySetInnerHTML={{ __html: children as string }}
        /> */}
        {titleButton && (
          <TopToBotAnimation>
            <div className='text-center'>
              <ButtonService title={titleButton} />
            </div>
          </TopToBotAnimation>
        )}
      </div>
      {position === 'right' && (
        <div className='lg:w-1/2 hidden lg:block w-full lg:px-0 px-8 relative lg:h-[768px] h-[350px]'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover w-full h-full' // Make sure it stretches properly
          />
        </div>
      )}
    </div>
  )
}

export default ServiceTemplate
