'use client'
import Banner from '@/components/banner'
import React from 'react'

const BannerScroll = ({ linkUrl }: { linkUrl: string }) => {
  const scrollToForm = () => {
    const form = document.getElementById('booking-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div onClick={scrollToForm}>
      <Banner url={linkUrl} />
    </div>
  )
}

export default BannerScroll
