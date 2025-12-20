import CartList from '@/app/cart/_component/cart-list'
// app/cart/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giỏ hàng',
  robots: {
    index: false,
    follow: false, // Google không cần đi theo các link trong trang này
  },
};
export default function Cart() {
  return (
    <div className='container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-24 md:pt-32 md:pb-16 lg:py-40'>
      <CartList />
    </div>
  )
}
