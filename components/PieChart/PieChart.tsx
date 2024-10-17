"use client"
import { Label } from 'flowbite-react'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { CourtBookings } from 'types';
const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
  ssr: false,
});

export default function PieChart({ className, label, orderBy, courtBookings }:
  { className: string, label?: string, orderBy?: React.ReactNode, courtBookings: CourtBookings[] | undefined }) {
  const colors = [
    'rgb(255, 99, 132)',   // Red
    'rgb(54, 162, 235)',   // Blue
    'rgb(255, 205, 86)',   // Yellow
    'rgb(75, 192, 192)',   // Aqua
    'rgb(153, 102, 255)',  // Purple
    'rgb(255, 159, 64)',   // Orange
    'rgb(201, 203, 207)',  // Grey
    'rgb(255, 206, 86)',   // Light Yellow
    'rgb(66, 245, 96)',    // Green
    'rgb(255, 87, 34)',    // Deep Orange
    'rgb(0, 255, 255)',    // Cyan
    'rgb(139, 195, 74)',   // Lime
    'rgb(96, 125, 139)',   // Blue Grey
    'rgb(233, 30, 99)',    // Pink
    'rgb(156, 39, 176)'    // Deep Purple
  ];

  const [value, setValue] = useState<{ sportName: string[], amount: number[], color: string[] }>(
    {
      sportName: [],
      amount: [],
      color: []
    }
  );
  useEffect(() => {
    if (courtBookings !== undefined) {
      const sports = courtBookings.reduce(
        (acc: { sportName: string[], amount: number[], color: string[] }, booking: CourtBookings, index) => {
          acc.sportName.push(booking.sportName);
          acc.amount.push(booking.count);
          acc.color.push(colors[index])
          return acc;
        },
        { sportName: [], amount: [], color: [] }
      )
      setValue(sports)
    }
  }, [courtBookings])
  const data = {
    labels: value.sportName,
    datasets: [{
      label: 'Số lần đặt sân',
      data: value.amount,
      backgroundColor: value.color,
      hoverOffset: 4
    }]
  };
  console.log(value)

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
