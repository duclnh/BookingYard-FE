'use client'
import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import { TbBasketDiscount, TbClockBolt, TbClockCancel, TbClockCheck } from 'react-icons/tb';
import { TiThSmall } from 'react-icons/ti';

export default function MyVoucher() {
  const [currentSelect, setSelect] = useState(1);
  return (
    <div className='col-span-3 rounded-2xl border'>
      <div className='text-2xl font-bold border-b-2 px-5 py-3'>
        Mã giảm giá
      </div>
      <div className="grid grid-cols-4 border">
        <div onClick={() => setSelect(1)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 1 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <TiThSmall className='mx-2' /> Tất cả
        </div>
        <div onClick={() => setSelect(2)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 2 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <TbClockBolt className='mx-2' />
          Chưa sử dụng
        </div>
        <div onClick={() => setSelect(3)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 3 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <TbClockCheck className='mx-2' />
          Đã sử dụng
        </div>
        <div onClick={() => setSelect(4)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 4 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <TbClockCancel className='mx-2' />
          Đã hết hạn
        </div>
      </div>
      <div className='p-5 space-y-4'>
        {[...Array(5)].map((_, index) => (
          <div key={index} className='rounded-lg border'>
            <div className='grid grid-cols-5 place-items-center gap-2 p-2'>
              <div className='col-span-0.5 p-5 w-full rounded-lg bg-gray-700 text-orange-500'>
                <p className='mb-2 text-lg text-center'>Fieldy</p>
                <TbBasketDiscount className='mx-auto' size={35} />
              </div>
              <div className='col-span-2 place-self-start ml-4'>
                <p className='text-xl font-bold mb-2'>Giảm 10%</p>
                <p>Sân: sân vận động Hà Nam</p>
                <p>Ngày bắt đầu: 10/08/2024</p>
                <p>Ngày hết hạn 20/08/2024</p>
              </div>
              <div className='col-span-1'>
                <p className='font-bold'>Bóng đá</p>
              </div>
              <div className='col-span-1'>
                <Button type='button' className=''>Sử dụng</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
