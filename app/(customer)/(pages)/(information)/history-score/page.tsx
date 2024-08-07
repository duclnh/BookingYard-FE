'use client'
import React, { useState } from 'react'
import { GrSubtractCircle } from 'react-icons/gr';
import { SiTicktick } from 'react-icons/si';
import { TiThSmall } from 'react-icons/ti';
import Image from 'next/image'

export default function HistoryScore() {
  const [currentSelect, setSelect] = useState(1);
  return (
    <div className='col-span-3 rounded-2xl border'>
      <div className='text-2xl font-bold border-b-2 px-5 py-3'>
        Lịch sử tích điểm
      </div>
      <div className="grid grid-cols-3 border">
        <div onClick={() => setSelect(1)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 1 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <TiThSmall className='mx-2' /> Tất cả
        </div>
        <div onClick={() => setSelect(2)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 2 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <SiTicktick className='mx-2' />
          Tích điểm
        </div>
        <div onClick={() => setSelect(3)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 3 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <GrSubtractCircle className='mx-2' />
          Dùng điểm
        </div>
      </div>
      <div className='p-5 space-y-4'>
        <div key={'test'} className='rounded-lg border'>
          <div className='grid grid-cols-4 place-items-center gap-2 p-2'>
            <Image height={100} width={100} src="/assets/images/slide1.png" alt='img' className='col-span-1 h-full w-full rounded-xl' />
            <div className='col-span-2 place-self-start ml-4 py-5'>
              <p className='text-xl font-bold mb-5'>Fieldy</p>
              <p>Ngày sủ dụng: 10/08/2024</p>
            </div>
            <div className='col-span-1'>
              <p className='text-2xl font-bold'>- 300</p>
            </div>
          </div>
        </div>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='rounded-lg border'>
            <div className='grid grid-cols-4 place-items-center gap-2 p-2'>
              <Image height={100} width={100} src="/assets/images/slide1.png" alt='img' className='col-span-1 h-full w-full rounded-xl' />
              <div className='col-span-2 place-self-start ml-4 py-5'>
                <p className='text-xl font-bold mb-5'>Fieldy</p>
                <p>Ngày tích điểm: 10/08/2024</p>
              </div>
              <div className='col-span-1'>
                <p className='text-2xl font-bold'>+ 300</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
