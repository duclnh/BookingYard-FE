"use client"
import { Label } from 'flowbite-react'
import dynamic from 'next/dynamic';
import React from 'react'
const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
  ssr: false,
});

export default function PieChart({ className, label, orderBy }: { className: string, label?: string, orderBy?: React.ReactNode }) {
  const data = {
    labels: [
      'Bóng đá',
      'Bóng chuyền',
      'Bóng rổ',
      'Cầu lông',
      'Tennis'
    ],
    datasets: [{
      label: 'Số lần đặt sân',
      data: [120, 85, 60, 150, 40],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div className={className}>
      <div className='flex justify-between'>
        {label && (
          <div className='flex'>
            <div className='h-7 w-2 bg-teal-400 mr-2 rounded-sm'></div>
            <Label className='text-lg mb-10' value={label} />
          </div>
        )}
        {orderBy}
      </div>
      <Pie className='max-h-[300px]' data={data} />
    </div>
  )
}
