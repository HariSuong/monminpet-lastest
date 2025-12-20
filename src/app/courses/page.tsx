import React from 'react'
// app/cart/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khóa học',
  robots: {
    index: false,
    follow: false, // Google không cần đi theo các link trong trang này
  },
};



const Courses = () => {
  return <div>Courses</div>
}

export default Courses
