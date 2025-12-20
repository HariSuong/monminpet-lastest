'use client'

import { sessionTokenClient } from '@/lib/http'
import { useEffect, useState } from 'react'

const AppProvider = ({
  children,
  initialSessionToken = ''
}: {
  children: React.ReactNode
  initialSessionToken?: string
}) => {
  useState(() => {
    if (typeof window !== 'undefined') {
      sessionTokenClient.value = initialSessionToken
    }
  })
  // Dùng useEffect để chỉ set giá trị khi chạy client-side
  // useEffect(() => {
  //   sessionTokenClient.value = initialSessionToken
  // }, [initialSessionToken]) // Chạy lại khi initialSessionToken thay đổi
  return <>{children}</>
}

export default AppProvider
