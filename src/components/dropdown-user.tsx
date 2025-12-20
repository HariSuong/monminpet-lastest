import DropdownUserClient from '@/components/dropdown-user-client'
import { cookies } from 'next/headers'
import React from 'react'

export const DropdownUser = () => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const isLoggedIn = !!sessionToken
  return <DropdownUserClient isLoggedIn={isLoggedIn} onClose={() => {}} />
}
