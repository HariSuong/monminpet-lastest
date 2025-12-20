import React from 'react'

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className='bg-cover bg-center min-h-screen'
      style={{ backgroundImage: "url('/background/2.png')" }}>
      {children}
    </div>
  )
}

export default AuthLayout
