// @ts-nocheck

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { CartAttributeOption, CartItem } from '@/types/cart'
import { Attribute } from '@/types/products'

interface CartAttributeSelectProps {
  item: CartItem
  attributeId: number
  attributeName: string
  handleAttributeChange: (
    item: CartItem,
    selectedAttr: CartAttributeOption
  ) => void
  isAttributeInCart: (attrPaId: number, attrId: number) => boolean
}

const CartAttributeSelect: React.FC<CartAttributeSelectProps> = ({
  item,
  attributeId,
  attributeName,
  handleAttributeChange,
  isAttributeInCart
}) => {
  let availableAttributesGroups: Attribute[] | Attribute[] = [] // Explicitly type as an array of Attribute

  if (Array.isArray(item.availableAttributes)) {
    availableAttributesGroups = item.availableAttributes
  } else if (
    item.availableAttributes &&
    typeof item.availableAttributes === 'object'
  ) {
    // Nếu availableAttributes là một object (trường hợp của sản phẩm quà tặng)
    availableAttributesGroups = [item.availableAttributes as Attribute]
  }

  const attribute = item.attributes.find(
    attr => attr.attribute_id === attributeId
  )

  // console.log('attribute', attribute)
  console.log('attributeId', attributeId)
  console.log('availableAttributes', item.availableAttributes)

  return (
    <>
      {/* <span className='block text-sm font-medium'>{attributeName}</span> */}
      {item.attributes?.length > 0 && (
        <Select
          value={attribute?.id.toString()}
          onValueChange={value => {
            let selectedAttr
            if (availableAttributesGroups.length > 0) {
              selectedAttr = availableAttributesGroups
                .find(a => a.id === attributeId)
                ?.product_attribute.find(pa => pa.id === Number(value))
            } else if (availableAttributesGroups.length === 1) {
              // Trường hợp availableAttributes là object
              selectedAttr = availableAttributesGroups[0]
            }

            if (selectedAttr) {
              handleAttributeChange(item, selectedAttr)
            }
          }}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={`Chọn ${attributeName}`} />
          </SelectTrigger>
          <SelectContent>
            {availableAttributesGroups.length > 0 ? (
              availableAttributesGroups
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
                      {pa.name} (+{pa.price.toLocaleString()}đ)
                    </SelectItem>
                  )
                })
            ) : availableAttributesGroups.length === 1 ? (
              <SelectItem
                key={availableAttributesGroups[0].id}
                value={availableAttributesGroups[0].id.toString()}
                disabled={isAttributeInCart(
                  availableAttributesGroups[0].attribute_id,
                  availableAttributesGroups[0].id
                )}
                style={{
                  color: isAttributeInCart(
                    availableAttributesGroups[0].attribute_id,
                    availableAttributesGroups[0].id
                  )
                    ? 'gray'
                    : 'black'
                }}>
                {availableAttributesGroups[0].name} (+
                {availableAttributesGroups[0].price.toLocaleString()}đ)
              </SelectItem>
            ) : null}
          </SelectContent>
        </Select>
      )}

      {!item.attributes?.length && 'Mặc định'}
    </>
  )
}

export default CartAttributeSelect
