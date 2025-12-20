'use client'
import ButtonLogout from '@/components/button-logout'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRightToBracket, FaIdCard, FaPenToSquare } from 'react-icons/fa6'

const DropdownUserClient = ({
  isLoggedIn,
  onClose
}: {
  isLoggedIn: boolean
  onClose?: () => void
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src='/icon/user.png'
          alt='User'
          width={24}
          height={24}
          // className='w-12 md:w-auto'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {isLoggedIn ? (
            <>
              <Link href='/account' onClick={onClose}>
                <DropdownMenuItem>
                  Hồ sơ
                  <DropdownMenuShortcut>
                    <FaIdCard className='w-4 h-4' />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <ButtonLogout />
            </>
          ) : (
            <>
              <Link href='/login' onClick={onClose}>
                <DropdownMenuItem>
                  Đăng nhập
                  <DropdownMenuShortcut>
                    <FaArrowRightToBracket className='w-4 h-4' />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href='/register' onClick={onClose}>
                <DropdownMenuItem>
                  Đăng ký
                  <DropdownMenuShortcut>
                    <FaPenToSquare className='w-4 h-4' />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownUserClient

// 7,21,22,23,24,25,34,35,36,37,38,39,12,13,14,15,16,17,18,19,20

// 8,10,26 => 4,6,11,27,28

// 29 => 15, 25
// 33, 31 => 4,5,6
