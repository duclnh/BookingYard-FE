"use client"
import { CardStatistic, Heading } from '@components/index'
import { Label, Table } from 'flowbite-react'
import React from 'react'
import { GrSchedules } from 'react-icons/gr'
import dynamic from 'next/dynamic'

const MapFacility = dynamic(() => import('@components/MapFacility/MapFacility'), {
  ssr: false,
});

const PieChart = dynamic(() => import('@components/PieChart/PieChart'), {
  ssr: false,
});

const LineChart = dynamic(() => import('@components/LineChart/LineChart'), {
  ssr: false,
});

export default function DashBoard() {
  return (
    <div className='py-5 w-full'>
      <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tổng quan hoạt động' center />
      <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10 place-items-center'>
        <CardStatistic
          title='Doanh thu'
          amount={3000}
          icon={GrSchedules}
          gradientFrom='from-cyan-700'
          gradientTo='to-cyan-500'
          iconColor='text-cyan-700'
        />
        <CardStatistic
          title='Đặt lịch'
          amount={3300}
          icon={GrSchedules}
          gradientFrom='from-green-700'
          gradientTo='to-green-500'
          iconColor='text-green-700'
        />
        <CardStatistic
          title='Hủy đặt lịch'
          amount={3300}
          icon={GrSchedules}
          gradientFrom='from-red-700'
          gradientTo='to-red-500'
          iconColor='text-red-700'
        />
      </div>
      <div className='border shadow-3xl p-5 rounded-xl'>
        <div className='grid lg:grid-cols-4 gap-5'>
          <LineChart className='lg:col-span-3 h-full w-full xl:border-r-2 pr-6' label='Doanh thu' />
          <PieChart orderBy={
            <select className='h-9 text-xs rounded-md'>
              <option>Đặt lịch</option>
              <option>Đã hủy</option>
            </select>
          }
            className='lg:col-span-1 w-full'
            label='Thể thao'
          />
        </div>
      </div>
    </div>
  )
}
