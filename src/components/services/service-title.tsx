import ServiceButton from '@/components/services/service-button'
import React from 'react'

const ServiceTitle = ({ title, sub }: { title: string; sub?: string }) => {
  return (
    <div className='flex justify-between items-start my-10'>
      <div className='uppercase md:text-4xl text-xl mb-3'>
        <h2 className='font-thin'>{sub}</h2>
        <h2 className='font-semibold'>{title}</h2>
      </div>
      <ServiceButton />
    </div>
  )
}

export default ServiceTitle
