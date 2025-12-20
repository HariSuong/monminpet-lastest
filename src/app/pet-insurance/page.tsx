import Banner from '@/components/banner'
import ContactForm from '@/components/contact-form'
import BannerScroll from '@/components/services/banner-scroll'
import Video from '@/components/video'
import serviceApiRequest from '@/services/apiServices'
import Image from 'next/image'

const PetInsurance = async () => {
  const services = await serviceApiRequest.getServices()

  return (
    <div className='flex flex-col justify-center'>
      <BannerScroll linkUrl='/services/bannerthuy.png' />
      {/* <Banner url='/pet-insurance/1.png' />
      <Banner url='/pet-insurance/2.png' />
      <Banner url='/pet-insurance/3.png' /> */}

      <Image
        src='/pet-insurance/1.png'
        width={1440}
        height={800}
        className='w-full h-full object-cover'
        alt='service'
      />
      <Image
        src='/pet-insurance/2.png'
        width={1400}
        height={800}
        alt='service'
        className='w-full h-full object-cover'
      />
      <Image
        src='/pet-insurance/3.png'
        width={1400}
        height={800}
        alt='service'
        className='w-full h-full object-cover'
      />
      {/* <Video url='/services/baohiemthuy.mp4' loop={false} time={1000000} /> */}

      <ContactForm services={services.payload.menus} />
    </div>
  )
}

export default PetInsurance
