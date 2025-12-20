// 'use client'
import { SocialIcons } from '@/components/social-icons'
import Image from 'next/image'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className='bg-[#424040] px-10 md:py-28 py-12 font-[sans-serif] tracking-wide'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:flex lg:gap-16 gap-8'>
        <div className='lg:flex lg:items-center'>
          <Link href='/'>
            <Image
              src='/logo/logo-footer.png'
              width={471}
              height={169}
              alt='MonMinPet'
            />
          </Link>
        </div>
        <div>
          <h4 className='text-lg font-semibold mb-6 text-white uppercase'>
            về chúng tôi
          </h4>
          <div className='flex gap-7'>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/'
                  className='text-gray-300 hover:text-white text-sm'>
                  TRANG CHỦ
                </Link>
              </li>
              <li>
                <Link
                  href='/about-us'
                  className='text-gray-300 hover:text-white text-sm'>
                  GIỚI THIỆU
                </Link>
              </li>
              <li>
                <Link
                  href='/products'
                  className='text-gray-300 hover:text-white text-sm'>
                  SẢN PHẨM
                </Link>
              </li>
            </ul>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/services'
                  className='text-gray-300 hover:text-white text-sm'>
                  DỊCH VỤ
                </Link>
              </li>
              <li>
                <Link
                  href='/academy'
                  className='text-gray-300 hover:text-white text-sm'>
                  ACADEMY
                </Link>
              </li>
              <li>
                <Link
                  href='/posts'
                  className='text-gray-300 hover:text-white text-sm'>
                  TIN TỨC
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className='text-lg font-semibold mb-6 text-white uppercase'>
            Kết nối với chúng tôi
          </h4>
         <SocialIcons />
          {/* <ul className='flex space-x-4 items-center'>
            <li>
              <Link href='#'>
                <Image
                  src='/social/cart-shoppee.png'
                  width={40}
                  height={40}
                  alt='Cart Shoppee'
                  className='w-10'
                />
              </Link>
            </li>
            <li>
              <Link href='#'>
                <Image
                  src='/social/lazada.png'
                  width={56}
                  height={56}
                  alt='Lazada'
                  className='w-14'
                />
              </Link>
            </li>
            <li>
              <Link href='#'>
                <Image
                  src='/social/tiktok.png'
                  width={40}
                  height={40}
                  alt='Tiktok'
                  className='w-10'
                />
              </Link>
            </li>
          </ul> */}
        </div>
        <div>
          <h4 className='text-lg font-semibold mb-6 text-white uppercase'>
            liên hệ
          </h4>
          <ul className='space-y-4'>
            <li>
              <Link
                href='https://maps.app.goo.gl/HwucvRTriBddpoi27'
                target='_blank'
                className='text-gray-300 hover:text-white text-sm flex items-center gap-3'>
                <Image
                  src='/icon/icon-address.png'
                  width={28}
                  height={28}
                  alt='Address'
                  className='w-7'
                />

                <p className='text-white font-light'>
                  1046 Âu Cơ, P14, Tân Bình, TPHCM
                </p>
              </Link>
            </li>
            <li>
              <Link
                href='tel:0779029133'
                className='text-gray-300 hover:text-white text-sm flex items-center gap-3'>
                <Image
                  src='/icon/icon-phone.png'
                  width={28}
                  height={28}
                  alt='Phone'
                  className='w-7'
                />

                <p className='text-white font-light'>0779 029 133</p>
              </Link>
            </li>

            <li>
              <Link
                href='mailto:bacsithuyduy99999@gmail.com'
                className='text-gray-300 hover:text-white text-sm flex items-center gap-3'>
                <Image
                  src='/icon/icon-email.png'
                  width={28}
                  height={28}
                  alt='Email'
                  className='w-7'
                />

                <p className='text-white font-light'>
                  bacsithuyduy99999@gmail.com
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
