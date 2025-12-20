'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import CheckoutForm from '@/app/checkout/_component/checkout-form'
import PaymentInfo from '@/app/checkout/_component/payment-info'
import { AccountResType } from '@/schemaValidations/account.schema'

const CheckoutAccordion = ({
  profile
}: {
  profile: AccountResType['data']
}) => {
  const [activeAccordion, setActiveAccordion] = useState('delivery')
  const [code, setCode] = useState('')
  const [amount, setAmount] = useState<number>(0)
  const [orderId, setOrderId] = useState<number>(0)
  return (
    <Accordion
      type='single'
      collapsible
      value={activeAccordion}
      onValueChange={setActiveAccordion}>
      <AccordionItem value='delivery'>
        <AccordionTrigger className='hover:no-underline'>
          <h2 className='text-2xl font-bold'>Thông tin giao hàng</h2>
        </AccordionTrigger>
        <AccordionContent>
          <CheckoutForm
            profile={profile}
            onFormValid={(code, amount, orderId) => {
              setCode(code)
              setActiveAccordion('payment')
              setAmount(amount)
              setOrderId(orderId)
            }}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='payment' disabled={activeAccordion !== 'payment'}>
        <AccordionTrigger className='hover:no-underline'>
          <h2 className='text-2xl font-bold'>Thanh toán</h2>
        </AccordionTrigger>
        <AccordionContent>
          <PaymentInfo codePayment={code} amount={amount} orderId={orderId} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CheckoutAccordion
