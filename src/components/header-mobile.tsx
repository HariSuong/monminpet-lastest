'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import DropdownUserClient from '@/components/dropdown-user-client'
import SearchModal from '@/components/home/search-modal'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

const HeaderMobile = ({
  totalCart,
  isLoggedIn
}: {
  totalCart: number
  isLoggedIn: boolean
}) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleCloseMenu = () => {
    setOpen(false)
  }

  return (
    <div className='flex items-center justify-between container lg:hidden absolute z-50 bg-opacity-50 bg-[#f9ebd6] top-0'>
      {/*  Mobile */}
      <Link
        href='/'
        className='flex w-[60%] items-center justify-end py-1 text-lg'>
        <Image
          src='/logo/logo.png?v=1'
          alt='Logo'
          width={90}
          height={90}
          className='w-20 md:w-20'
        />
      </Link>
      <div className='flex items-center justify-end gap-2 w-[40%]'>
        <SearchModal />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            asChild
            className='flex flex-col justify-center items-center ml-4'>
            <Button
              variant='outline'
              size='icon'
              className='lg:hidden bg-transparent border-black w-8 h-8 p-1'>
              <MenuIcon className='h-6 w-6' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <div className='grid gap-2 py-6'>
              {[
                { href: '/', label: 'TRANG CHỦ' },
                { href: '/about-us', label: 'GIỚI THIỆU' },
                { href: '/products', label: 'SẢN PHẨM' },
                { href: '/services', label: 'DỊCH VỤ' },
                { href: '/academy', label: 'ACADEMY' },
                { href: '/posts', label: 'TIN TỨC' }
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={handleCloseMenu}
                  className={`flex w-full items-center py-2 text-lg font-light ${
                    pathname === href ? 'font-semibold' : ''
                  }`}>
                  {label}
                </Link>
              ))}
            </div>
            <div className='flex gap-3 items-center'>
              {/* <SearchModal /> */}

              <Link className='text-gray-700 hover:text-black' href='#'>
                {/* <Image src='/icon/user.png' alt='User' width={24} height={24} className='w-12' /> */}
                {/* <DropdownUser /> */}
                <DropdownUserClient
                  isLoggedIn={isLoggedIn}
                  onClose={handleCloseMenu}
                />
              </Link>
              <Link
                className='relative text-gray-700 hover:text-black'
                href={'/cart'}
                onClick={handleCloseMenu}>
                {/* Icon giỏ hàng */}
                <Image
                  src='/icon/cart.png'
                  alt='Cart'
                  width={24}
                  height={24}
                  className='w-7'
                />

                {/* Hiển thị số lượng sản phẩm nếu lớn hơn 0 */}
                {totalCart > 0 && (
                  <span className='absolute -top-2 -right-2 bg-red-500 text-white text-[.5rem] font-bold w-4 h-4 flex items-center justify-center rounded-full'>
                    {totalCart}
                  </span>
                )}
              </Link>
            </div>
          </SheetContent>
          {/* <SheetContent side='left'>
            <div className='grid gap-2 py-6'>
              <Link
                href='/'
                className={`flex w-full items-center py-2 text-lg font-light ${
                  pathname === '/' ? 'font-semibold' : ''
                }`}>
                TRANG CHỦ
              </Link>
              <Link
                href='/about'
                className={`flex w-full items-center py-2 text-lg font-light ${
                  pathname === '/about-us' ? 'font-semibold' : ''
                }`}>
                GIỚI THIỆU
              </Link>
              <Link
                href='/products'
                className={`flex w-full items-center py-2 text-lg font-light ${
                  pathname === '/products' ? 'font-semibold' : ''
                }`}>
                SẢN PHẨM
              </Link>

              <Link
                href='/services'
                className={`flex w-full items-center py-2 text-lg font-light ${
                  pathname === '/services' ? 'font-semibold' : ''
                }`}>
                DỊCH VỤ
              </Link>
              <Link
                href='/academy'
                className={`flex w-full items-center py-2 text-lg font-light ${
                  pathname === '/academy' ? 'font-semibold' : ''
                }`}>
                ACADEMY
              </Link>
              <Link
                href='/news'
                className={`flex w-full items-center py-2 text-lg font-light ${
                  pathname === '/news' ? 'font-semibold' : ''
                }`}>
                TIN TỨC
              </Link>
            </div>
          </SheetContent> */}
        </Sheet>
      </div>
    </div>
  )
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  )
}

export default HeaderMobile
