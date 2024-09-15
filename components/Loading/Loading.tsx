import React from 'react'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className='fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-center justify-center flex bg-gray-900 bg-opacity-40 dark:bg-opacity-80'>
      <Image height={100} width={100} src={"/assets/images/loading.gif"} unoptimized alt='loading' />
    </div>
  )
}
