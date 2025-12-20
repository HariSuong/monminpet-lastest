import React from 'react'

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className='bg-cover bg-center min-h-screen md:pt-16 pt-0'
      style={{ backgroundImage: "url('/background/1.png')" }}>
      {children}
    </div>
  )
}

export default AuthLayout
