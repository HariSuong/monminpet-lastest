'use client'
import { Button } from '@/components/ui/button'
import authApiRequest from '@/services/apiAuth'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const LogoutAccount = () => {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const resultClient = await authApiRequest.logoutFrClientToNextServer()
      console.log('resultClient', resultClient)
      router.push('/login')
      router.refresh()
    } catch (error) {
      toast.error('Lỗi', {
        description: 'Lỗi hệ thống'
      })
    }
  }

  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <p className='mb-4 text-center'>Bạn có chắc chắn muốn đăng xuất?</p>
      <Button onClick={handleLogout} variant='destructive'>
        Đăng xuất
      </Button>
    </div>
  )
}

export default LogoutAccount
