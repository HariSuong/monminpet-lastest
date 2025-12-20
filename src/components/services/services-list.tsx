// 'use client'

import ServiceTemplate from '@/components/common/service-template'
import { ServicesCat } from '@/types/services'
import Link from 'next/link'
import slugify from 'slugify'

const ServicesList = ({ services }: { services: ServicesCat[] }) => {
  // console.log('services', services)

  return (
    <div className='pt-16 sm:max-w-full'>
      {services.map((service, index) => (
        <Link
          href={`/services/${slugify(service?.name || '', {
            lower: true,
            strict: true,
            locale: 'vi'
          })}/${service?.id}`}
          key={service?.id}>
          <ServiceTemplate
            type='service'
            id={service?.id}
            title={service?.name}
            image={service?.thumb || '/about/our-story/1.png'}
            position={index % 2 === 0 ? 'right' : 'left'}>
            {service?.desc}
          </ServiceTemplate>
        </Link>
      ))}
    </div>
  )
}

export default ServicesList
