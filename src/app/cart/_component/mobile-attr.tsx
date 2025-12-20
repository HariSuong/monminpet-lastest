// components/MobileCartAttributeSelect.tsx
import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { CartItem } from '@/types/cart'
import { useCart } from '@/context/CartContext'

interface MobileCartAttributeSelectProps {
  item: CartItem
  attributeId: number
  attributeName: string
  handleAttributeChange: (item: CartItem, selectedAttr: any) => void
  isAttributeInCart: (attrPaId: number, attrId: number) => boolean
}

const MobileCartAttributeSelect: React.FC<MobileCartAttributeSelectProps> = ({
  item,
  attributeId,
  attributeName,
  handleAttributeChange,
  isAttributeInCart
}) => {
  const attribute = item.attributes.find(
    attr => attr.attribute_id === attributeId
  )

  return (
    <>
      {item.attributes.some(attr => attr.attribute_id === attributeId) && (
        <Select
          value={attribute?.id.toString()}
          onValueChange={value => {
            const selectedAttr = (item.availableAttributes ?? [])
              .find(a => a.id === attributeId)
              ?.product_attribute.find(pa => pa.id === Number(value))

            if (selectedAttr) {
              handleAttributeChange(item, selectedAttr)
            }
          }}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={`Chọn ${attributeName}`} />
          </SelectTrigger>
          <SelectContent>
            {(item.availableAttributes ?? [])
              .find(a => a.id === attributeId)
              ?.product_attribute.map(pa => {
                const isDisabled = isAttributeInCart(attributeId, pa.id)
                return (
                  <SelectItem
                    key={pa.id}
                    value={pa.id.toString()}
                    disabled={isDisabled}
                    style={{
                      color: isDisabled ? 'gray' : 'black'
                    }}>
                    {pa.name} (+
                    {pa.price.toLocaleString('vi-VN', {
                      currency: 'VND'
                    })}
                    đ)
                  </SelectItem>
                )
              })}
          </SelectContent>
        </Select>
      )}
    </>
  )
}

export default MobileCartAttributeSelect
