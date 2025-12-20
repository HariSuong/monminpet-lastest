import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronUp, ChevronDown } from 'lucide-react'

const QuantityInput = ({
  itemId,
  value,
  onIncrease,
  onDecrease,
  onChange,
  price
}: {
  itemId: string
  value: number
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onChange: (id: string, newValue: number) => void
  price: number
}) => {
  return (
    <div className='relative w-20 flex items-start justify-start border border-gray-300 rounded-md overflow-hidden'>
      <Input
        type='number'
        value={value}
        className='w-full text-center border-none outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
        onChange={e => {
          const newValue = parseInt(e.target.value, 10) || 1
          onChange(itemId, newValue) // Truyền itemId vào để xác định sản phẩm nào đang được thay đổi
        }}
        disabled={price <= 0}
      />
      {price > 0 && (
        <div className='flex flex-col absolute right-0 h-full'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => onIncrease(itemId)}
            className='px-2'>
            <ChevronUp className='w-4 h-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            className='px-2'
            onClick={() => onDecrease(itemId)}
            disabled={value <= 1}>
            <ChevronDown className='w-4 h-4' />
          </Button>
        </div>
      )}
    </div>
  )
}

export default QuantityInput
