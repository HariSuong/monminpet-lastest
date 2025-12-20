// import envConfig from '@/config'

import ProfileForm from '@/app/(account)/_component/profile/profile-form'
import Loading from '@/app/(account)/account/loading'
import accountApiRequest from '@/services/apiAccount'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hồ sơ',
  robots: {
    index: false,
    follow: false, // Google không cần đi theo các link trong trang này
  },
};
const Profile = async () => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken?.value) return <div>Chưa đăng nhập</div>

  // Gọi API lấy thông tin tài khoản
  const result = await accountApiRequest.me(sessionToken.value)
  // console.log('result', result)
  if (!result) return

  return (
    <Suspense fallback={<Loading />}>
      <h1>Profile Form</h1>
      <p>{result.payload?.data.email}</p>
      {/* <ProfileForm profile={result.payload?.data} /> */}
    </Suspense>
  )
}

export default Profile
