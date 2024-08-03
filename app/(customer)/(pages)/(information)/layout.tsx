import React from 'react'
import { CiLock } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { TiTicket } from 'react-icons/ti'
import Link from 'next/link'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-5 sm:-8 md:mx-20 lg:mx-30 xl:mx-40 grid grid-cols-1 gap-0 md:grid-cols-4 md:gap-3 lg:gap-10 py-16'>
      <div className='bg-[#f5f5f6] p-7 rounded-2xl mb-10 md:mb-0'>
        <div className='text-center'>
          <img className='mx-auto' height={70} width={70} src="assets/images/avatar-default.png" alt="avatar" />
          <div className='mt-2'>
            <div className='text-lg font-medium'>Le Ngoc Huynh Duc</div>
            <div className='mt-2'> 300 điểm</div>
          </div>
        </div>
        <div className='divide-solid h-1 bg-white my-4'></div>
        <div className='grid grid-cols-1 gap-3'>
          <Link href="/profile" className='flex items-center'>
            <FaRegUser className='mr-2' />
            Hồ sơ
          </Link>
          <Link href="/my-booking" className='flex items-center'>
            <TiTicket className='mr-2' />
            Đặt lịch hẹn của tôi
          </Link>
          <Link href="/change-password" className='flex items-center'>
            <CiLock className='mr-2' />
            Đổi mật khẩu
          </Link>
          <Link href="/sign-in" className='flex items-center'>
            <MdLogout className='mr-2' />
            Đăng xuất
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}

