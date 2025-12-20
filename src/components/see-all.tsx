'use client'

import Link from 'next/link'

const SeeAll = ({ to }: { to: string }) => {
  return (
    <Link
      href={to}
      className='text-sm font-normal hover:text-slate-400 sm:block'>
      Xem tất cả
      {/* <span aria-hidden='true'> &rarr;</span> */}
      <span aria-hidden='true'> {' >'} </span>
    </Link>
  )
}

export default SeeAll
