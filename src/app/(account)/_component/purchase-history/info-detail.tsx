import { tranformTimer } from '@/lib/helper'
import React from 'react'

/** "name": "Ngọc Sương",
        "phone": "0111111111",
        "address": "123 Test",
        "method": 0,
        "delivered_at": null,
        "received_at": null,
        "created_at": "2025-03-29T07:56:59.000000Z", */

interface InfoDetailProps {
  name: string
  phone: string
  address: string
  method: number

  received_at: string
  created_at: string
}

const InfoDetail = ({ infoDetail }: { infoDetail: InfoDetailProps }) => {
  return (
    <div className='flex flex-col md:flex-row justify-between text-sm'>
      <>
        <div className='lg:flex hidden items-center gap-4'>
          <div className='flex flex-col gap-2'>
            <div>Phương thức thanh toán:</div>
            <div>Thời gian đặt hàng:</div>
            {/* <div>Thời gian vận chuyển:</div> */}
            <div>Thời gian hoàn thành:</div>
          </div>
          <div className='flex flex-col gap-2'>
            <div>{infoDetail.method === 0 && 'Chuyển khoản ngân hàng'}</div>
            <div>{tranformTimer(infoDetail.created_at)}</div>
            {/* <div>
              {tranformTimer(infoDetail.delivered_at) || '05-04-2025 16:06'}
            </div> */}
            <div>{tranformTimer(infoDetail.received_at)}</div>
          </div>
        </div>

        <div className='flex lg:hidden flex-col gap-2'>
          <div className='font-bold'>Phương thức thanh toán:</div>
          <div>{infoDetail.method === 0 && 'Chuyển khoản ngân hàng'}</div>

          <div className='font-bold'>Thời gian đặt hàng:</div>
          <div>{tranformTimer(infoDetail.created_at)}</div>

          {/* <div className='font-bold'>Thời gian vận chuyển:</div>
          <div>28-08-2024 15:02</div> */}

          <div className='font-bold'>Thời gian hoàn thành:</div>
          <div>{tranformTimer(infoDetail.received_at)}</div>
        </div>
      </>
      <div className='flex flex-col md:items-end md:mt-0 mt-6'>
        <div className='font-bold'>Thông tin nhận hàng:</div>
        <p>{infoDetail.name}</p>
        <p>{infoDetail.phone}</p>
        <p>{infoDetail.address}</p>
      </div>
    </div>
  )
}

export default InfoDetail
