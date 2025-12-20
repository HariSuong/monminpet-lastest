'use client'
import React from 'react'

const ServiceButton = () => {
  const scrollToForm = () => {
    const form = document.getElementById('booking-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div
      className='transition-transform duration-300 ease-in-out transform hover:scale-105 bg-[#F8EDD8] md:px-6 md:py-4 px-3 py-1 md:text-2xl text-base font-semibold italic flex flex-col justify-center cursor-pointer'
      onClick={scrollToForm}>
      Đặt lịch
    </div>
  )
}

export default ServiceButton
