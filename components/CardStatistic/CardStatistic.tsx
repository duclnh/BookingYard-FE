import React from 'react'
import { IconType } from 'react-icons';

type Props = {
  title: string;
  amount: number;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
  icon: IconType;
}

export default function CardStatistic(props: Props) {
  return (
    <div className={`shadow-2xl border w-64 p-5 rounded-xl bg-gradient-to-r ${props.gradientFrom} ${props.gradientTo}`}>
      <div className='flex items-center justify-between'>
        <div className='text-white'>
          <p className='text-base font-medium'>{props.title}</p>
          <p className='text-2xl font-black'>{props.amount}</p>
        </div>
        <div className='bg-white rounded-full p-2'>
          <props.icon className={props.iconColor} size={30} />
        </div>
      </div>
    </div>
  )
}
