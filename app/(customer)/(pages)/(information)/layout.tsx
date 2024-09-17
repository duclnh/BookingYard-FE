'use client'
import React, { useEffect } from 'react'
import { CiLock } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { TiTicket } from 'react-icons/ti'
import Link from 'next/link'
import { TbBasketDiscount } from 'react-icons/tb'
import { FiUserCheck } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useAppSelector } from '@hooks/hooks'


export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const user = useAppSelector(state => state.user.value)
  
  return (
    <div className='mx-5 sm:-8 md:mx-20 lg:mx-30 xl:mx-40 grid grid-cols-1 gap-0 md:grid-cols-4 md:gap-3 lg:gap-10 py-16'>
      <div className='bg-[#f5f5f6] p-7 rounded-2xl mb-10 md:mb-0'>
        <div className='text-center border-b-2 border-white'>
          <Image className='mx-auto rounded-md' height={70} width={70} src={user?.imageUrl || '/assets/images/avatar-default.png'} alt="avatar" />
          <div className='mt-2'>
            <div className='text-lg font-medium'>{user?.name}</div>
            <div className='my-2'>{user?.point} điểm</div>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-1 mt-3'>
          <Link href="/profile" className={`flex items-center py-1 px-2 rounded-lg ${pathName == '/profile' ? 'text-white bg-cyan-800' : ''}`}>
            <FaRegUser className='mr-2' />
            Hồ sơ
          </Link>
          <Link href="/my-booking" className={`flex items-center py-1 px-2 rounded-lg ${pathName == '/my-booking' || pathName == '/booking-detail' ? 'text-white bg-cyan-800' : ''}`}>
            <TiTicket className='mr-2' />
            Đặt lịch hẹn
          </Link>
          <Link href="/my-voucher" className={`flex items-center py-1 px-2 rounded-lg ${pathName == '/my-voucher' ? 'text-white bg-cyan-800' : ''}`}>
            <TbBasketDiscount className='mr-2' />
            Mã giảm giá
          </Link>
          <Link href="/history-score" className={`flex items-center py-1 px-2 rounded-lg ${pathName == '/history-score' ? 'text-white bg-cyan-800' : ''}`}>
            <FiUserCheck className='mr-2' />
            Lịch sử tích điểm
          </Link>
          <Link href="/change-password" className={`flex items-center py-1 px-2 rounded-lg ${pathName == '/change-password' ? 'text-white bg-cyan-800' : ''}`}>
            <CiLock className='mr-2' />
            Đổi mật khẩu
          </Link>
          <Link href="/sign-in" className='flex items-center py-1 px-2'>
            <MdLogout className='mr-2' />
            Đăng xuất
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}

