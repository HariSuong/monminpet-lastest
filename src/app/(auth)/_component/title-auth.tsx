import React from 'react'

const TitleAuth = ({ title }: { title: string }) => {
  return (
    <div className='w-full text-center uppercase'>
      <p className='italic font-light text-base'>{title}</p>
      <h2 className='md:text-4xl text-xl font-black'>monmin pet xin chào!</h2>
    </div>
  )
}

export default TitleAuth
