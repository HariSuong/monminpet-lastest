import Banner from '@/components/banner'
import PetCats from '@/components/home/cats'
import FeedBack from '@/components/home/feedback'
import PetCommit from '@/components/home/pet-commit'
import PetVaccination from '@/components/home/pet-vaccination'
import ProductHot from '@/components/home/product-hot'
import ThingsPetNeed from '@/components/home/things-pet-need'
import homeApiRequest from '@/services/apiHome'
import Image from 'next/image'

// 👇 ĐỊNH NGHĨA SCHEMA TỔ CHỨC 👇
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Monminpet',
  url: 'https://monminpet.com/',
  logo: 'https://monminpet.com/logo/logo.png', // Đảm bảo link logo này đúng
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+84-XXX-XXX-XXX', // THAY BẰNG SĐT THẬT CỦA SHOP
    contactType: 'Customer Service'
  },
  sameAs: [
    // THAY BẰNG LINK MẠNG XÃ HỘI CỦA SHOP (nếu có)
    'https://www.facebook.com/Monmin.Pet/',
    'https://www.instagram.com/monminpet/',
    'https://zalo.me/0939329693'
  ]
}

export default async function Home() {
  const home = await homeApiRequest.getHome
  // console.log('menu_parents', home.payload.data.menu_parents)
  return (
    <>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Banner type='video' url='/home/banner.mp4?t=1' />

      <div id='observer-target'>
        <ProductHot products={home.payload.data.products} />
        <div className='relative'>
          <div className='lg:block hidden'>
            <Image
              src='/icon/iconmeo.png'
              alt='Icon Mèo'
              className='absolute bottom-0 lg:-bottom-4 right-0 md:w-1/6 w-1/4 z-0'
              width={200}
              height={100}
            />
            <Image
              src='/icon/iconhoa.png'
              alt='Icon Hoa'
              className='absolute top-0 left-0 md:w-1/6 w-1/4 z-0'
              width={200}
              height={200}
            />
          </div>
          <PetCats cats={home.payload.data.menu_parents} />
        </div>
        {/* <Banner type='video' url='/home/thucanthucung.mp4' time={1000} /> */}

        <ThingsPetNeed />

        {/* <Banner type='video' url='/home/camketthucung.mp4' time={3000} /> */}

        <PetCommit />
        <div className='md:hidden block'>
          <Banner type='video' url='/home/tiemchungchothu.mp4' time={3000} />
        </div>

        <PetVaccination />

        <div>
          {/* <Banner type='video' url='/home/dog.mp4' /> */}

          <Banner type='video' url='/home/dichvu.mp4' time={10000} />
        </div>
        <FeedBack />
        {/* <Brand /> */}
        <Banner type='video' url='/home/dog.mp4' />
      </div>
    </>
  )
}
