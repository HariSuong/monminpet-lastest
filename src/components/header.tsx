'use client'

import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'

// app/components/Header.tsx
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import SearchModal from '@/components/home/search-modal'
import HeaderMobile from '@/components/header-mobile'
import { useCart } from '@/context/CartContext'
import { DropdownUser } from '@/components/dropdown-user'
import DropdownUserClient from '@/components/dropdown-user-client'

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { cartLength } = useCart()

  const pathname = usePathname()

  return (
    <header className='bg-transparent shadow-md '>
      {/*  Mobile */}
      <HeaderMobile totalCart={cartLength} isLoggedIn={isLoggedIn} />

      <NavigationMenu className='hidden lg:flex justify-center gap-6 max-w-full container px-4 py-8 absolute top-0 right-0 left-0 z-20'>
        <NavigationMenuList className='lg:space-x-6'>
          <NavigationMenuLink asChild>
            <Link
              href='/'
              className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 lg:text-sm min-[1180px]:text-base xl:text-lg font-light ${
                pathname === '/' ? 'font-semibold' : ''
              }`}
              prefetch={false}>
              TRANG CHỦ
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href='/about-us'
              className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 lg:text-sm min-[1180px]:text-base xl:text-lg font-light ${
                pathname === '/about-us' ? 'font-semibold' : ''
              }`}
              prefetch={false}>
              GIỚI THIỆU
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href='/products'
              className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 lg:text-sm min-[1180px]:text-base xl:text-lg font-light ${
                pathname === '/products' ? 'font-semibold' : ''
              }`}
              prefetch={false}>
              SẢN PHẨM
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href='/'
              className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 lg:text-sm min-[1180px]:text-base xl:text-lg font-light'
              prefetch={false}>
              <Image
                src='/logo/logo.png?v=1'
                alt='Logo'
                width={80}
                height={80}
                className='w-32 pt-8'
              />
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href='/services'
              className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 lg:text-sm min-[1180px]:text-base xl:text-lg font-light ${
                pathname === '/services' ? 'font-semibold' : ''
              }`}
              prefetch={false}>
              DỊCH VỤ
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href='/academy'
              className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 lg:text-sm min-[1180px]:text-base xl:text-lg font-light ${
                pathname === '/academy' ? 'font-semibold' : ''
              }`}
              prefetch={false}>
              ACADEMY
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href='/posts'
              className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 lg:text-sm min-[1180px]:text-base xl:text-lg font-light ${
                pathname === '/posts' ? 'font-semibold' : ''
              }`}
              prefetch={false}>
              TIN TỨC
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>

        {/* User */}

        <NavigationMenuList className='lg:space-x-4'>
          <SearchModal />

          <Link className='text-gray-700 hover:text-black' href='#'>
            {/* <Image src='/icon/user.png' alt='User' width={24} height={24} /> */}
            {/* <DropdownUser /> */}
            <DropdownUserClient isLoggedIn={isLoggedIn} />
          </Link>
          <Link
            className='relative text-gray-700 hover:text-black'
            href={'/cart'}>
            {/* Icon giỏ hàng */}
            <Image src='/icon/cart.png' alt='Cart' width={24} height={24} />

            {/* Hiển thị số lượng sản phẩm nếu lớn hơn 0 */}
            {cartLength > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
                {cartLength}
              </span>
            )}
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

export default Header
