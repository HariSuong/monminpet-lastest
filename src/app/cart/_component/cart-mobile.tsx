// components/MobileCartItems.tsx

import { Button } from '@/components/ui/button'
import Image from 'next/image'

import QuantityInput from '@/app/cart/_component/quantity'
import MobileCartAttributeSelect from '@/app/cart/_component/mobile-attr'
import { useCart } from '@/context/CartContext'

import CouponForm from '@/app/cart/_component/coupon-form'
import { TrashIcon } from '@radix-ui/react-icons'

const MobileCartItems = () => {
  const {
    cart,
    handleSizeChange,
    removeFromCart,
    updateQuantity,
    isAttributeInCart
  } = useCart()

  return (
    <div className='md:hidden block'>
      {cart.map(item => {
        const imageSrc = item.image || '/images/default-product.png'
        const sizeAttribute = item.attributes.find(
          attr => attr.attribute_id === 1
        )
        const tasteAttribute = item.attributes.find(
          attr => attr.attribute_id === 5
        )
        const volumeAttribute = item.attributes.find(
          attr => attr.attribute_id === 6
        )
        const weightAttribute = item.attributes.find(
          attr => attr.attribute_id === 7
        )

        console.log('tasteAttribute', tasteAttribute)

        return (
          <div key={item.id} className='w-full pb-4 mb-4'>
            <div className='flex items-center gap-2'>
              <Image
                src={imageSrc}
                alt={item.name}
                width={80}
                height={80}
                className='rounded-md'
              />
              <h3 className='font-bold space-x-1'>
                <span>{item.name} </span>
                <span className='text-sm text-gray-600 font-light'>
                  (
                  {sizeAttribute?.name ||
                    tasteAttribute?.name ||
                    volumeAttribute?.name ||
                    weightAttribute?.name ||
                    'Mặc định'}{' '}
                  )
                </span>
              </h3>
            </div>

            <div className={`flex items-center justify-end gap-4 mt-2`}>
              {/* Render Selects based on available attributes */}
              {item.attributes?.length > 0 && (
                <div>
                  <MobileCartAttributeSelect
                    item={item}
                    attributeId={1}
                    attributeName='Size'
                    handleAttributeChange={handleSizeChange}
                    isAttributeInCart={isAttributeInCart}
                  />
                  <MobileCartAttributeSelect
                    item={item}
                    attributeId={5}
                    attributeName='Hương vị'
                    handleAttributeChange={handleSizeChange}
                    isAttributeInCart={isAttributeInCart}
                  />
                  <MobileCartAttributeSelect
                    item={item}
                    attributeId={6}
                    attributeName='Thể tích'
                    handleAttributeChange={handleSizeChange}
                    isAttributeInCart={isAttributeInCart}
                  />
                  <MobileCartAttributeSelect
                    item={item}
                    attributeId={7}
                    attributeName='Khối lượng'
                    handleAttributeChange={handleSizeChange}
                    isAttributeInCart={isAttributeInCart}
                  />
                </div>
              )}

              <div className='flex items-center justify-end gap-2'>
                {/* Quantity Input */}
                <QuantityInput
                  itemId={item.id}
                  value={item.quantity}
                  onIncrease={id => updateQuantity(id, item.quantity + 1)}
                  onDecrease={id =>
                    item.quantity > 1 && updateQuantity(id, item.quantity - 1)
                  }
                  onChange={(id, newValue) => updateQuantity(id, newValue)}
                  price={item.price}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-red-500'
                  onClick={() => removeFromCart(item.id)}>
                  <TrashIcon className='w-5 h-5' />
                </Button>
              </div>
            </div>
          </div>
        )
      })}
      <div className='flex items-center justify-between mt-2'>
        {/* Coupon Form */}
        <CouponForm />
      </div>
    </div>
  )
}

export default MobileCartItems
