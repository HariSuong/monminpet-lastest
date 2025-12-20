import Profile from '@/app/(account)/_component/profile/profile'

import Benefit from '@/app/(account)/_component/benefit/benefit'
import LogoutAccount from '@/app/(account)/_component/logout-account'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const TabsComponent = ({
  purchaseTab,
  activeTab
}: {
  purchaseTab: any
  activeTab: any
}) => {
  return (
    <Tabs
      defaultValue={activeTab}
      className='container mx-auto py-40 md:pt-32 md:pb-16 lg:py-40 bg-transparent'>
      <TabsList className='w-full overflow-auto justify-evenly bg-transparent mb-8'>
        <TabsTrigger
          value='account'
          className='data-[state=active]:font-extrabold font-light uppercase text-black active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none md:text-2xl text-lg'>
          <div>thông tin cá nhân</div>
        </TabsTrigger>

        <TabsTrigger
          value='benefit'
          className='data-[state=active]:font-extrabold font-light uppercase text-black active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none md:text-2xl text-lg'>
          <div>TIỆN ÍCH</div>
        </TabsTrigger>

        <TabsTrigger
          value='purchase-history'
          className='data-[state=active]:font-extrabold font-light uppercase text-black active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none md:text-2xl text-lg'>
          <div>lịch sử mua hàng</div>
        </TabsTrigger>

        <TabsTrigger
          value='logout'
          className='data-[state=active]:font-extrabold font-light uppercase text-black active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none md:text-2xl text-lg'>
          <div>Đăng xuất</div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <Profile />
      </TabsContent>
      <TabsContent value='benefit'>
        <Benefit />
      </TabsContent>
      <TabsContent value='purchase-history'>{purchaseTab}</TabsContent>
      <TabsContent value='logout'>
        <LogoutAccount />
      </TabsContent>
    </Tabs>
  )
}

export default TabsComponent
