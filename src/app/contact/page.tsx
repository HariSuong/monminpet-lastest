import React from 'react'
// app/cart/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ',
  robots: {
    index: false,
    follow: false, // Google không cần đi theo các link trong trang này
  },
};
const Contact = () => {
  return <div>Contact</div>
}

export default Contact
