'use client'
import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu'
import authApiRequest from '@/services/apiAuth'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { toast } from 'sonner'

const ButtonLogout = () => {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const resultClient = await authApiRequest.logoutFrClientToNextServer()
      // console.log('resultClient', resultClient)
      router.push('/login')
      router.refresh()
    } catch (error) {
      toast.error('Lỗi', {
        description: 'Lỗi hệ thống'
      })
    }
  }

  return (
    <Link href={'#'}>
      <DropdownMenuItem
        onClick={handleLogout}
        className='flex justify-between px-2 text-sm focus:outline-none'>
        Đăng xuất
        <DropdownMenuShortcut>
          <FaArrowRightFromBracket className='w-4 h-4' />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </Link>
  )
}

export default ButtonLogout
