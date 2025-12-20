import Profile from '@/app/(account)/_component/profile/profile'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import Benefit from '@/app/(account)/_component/benefit/benefit'
import PurchaseHistory from '@/app/(account)/_component/purchase-history/purchase-history'
import TabsComponent from '@/app/(account)/_component/tabs-component'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tài khoản cá nhân',
  robots: {
    index: false,
    follow: false, // Google không cần đi theo các link trong trang này
  },
};
const Account = () => {
  return (
    <section className='lg:container px-0 mx-auto'>
      <TabsComponent activeTab={'account'} purchaseTab={<PurchaseHistory />} />
    </section>
  )
}

export default Account
