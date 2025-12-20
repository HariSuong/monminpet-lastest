import PurchaseDetail from '@/app/(account)/_component/purchase-history/detail'
import TabsComponent from '@/app/(account)/_component/tabs-component'
import Loading from '@/app/(account)/account/loading'
import accountApiRequest from '@/services/apiAccount'
import { Suspense } from 'react'

const PurchaseDetailPage = async ({ params }: { params: { id: string } }) => {
  const orderId = params.id

  // Gọi API lấy thông tin đơn hàng với orderId động
  const result = await accountApiRequest.invoice(Number(orderId))
  if (!result || !result.payload?.data)
    return <div>Không tìm thấy đơn hàng</div>

  return (
    <section className='lg:container px-0 mx-auto'>
      <TabsComponent
        activeTab={'purchase-history'}
        purchaseTab={
          <Suspense fallback={<Loading />}>
            <PurchaseDetail invoiceDetail={result.payload?.data} />
          </Suspense>
        }
      />
    </section>
  )
}

export default PurchaseDetailPage
