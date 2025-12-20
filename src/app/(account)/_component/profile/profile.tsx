// import envConfig from '@/config'

import ProfileForm from '@/app/(account)/_component/profile/profile-form'
import accountApiRequest from '@/services/apiAccount'
import { cookies } from 'next/headers'

const Profile = async () => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken?.value) return <div>Chưa đăng nhập</div>

  // Gọi API lấy thông tin tài khoản
  const result = await accountApiRequest.me(sessionToken.value)

  if (!result) return

  return (
    <>
      <div className='flex justify-center items-center mb-8'>
        <div className='w-full md:max-w-5xl'>
          <div className='flex items-center flex-wrap gap-1 md:text-xl text-base'>
            <h2 className='font-light uppercase'>EMAIL ĐĂNG KÝ:</h2>
            <p className='text-lg font-bold'>{result.payload?.data.email}</p>
          </div>
        </div>
      </div>
      <div>
        <ProfileForm
          sessionToken={sessionToken.value}
          profile={result.payload?.data}
        />
      </div>
    </>
  )
}

export default Profile
