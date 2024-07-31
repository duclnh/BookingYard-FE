import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  title: string,
  subtitle: string,
  bgColor: string,
  icon: IconType
}

export default function CardFeature(props: Props) {
  return (
    <div className='w-full bg-white rounded-3xl text-center p-5'>
      <div className={`h-24 w-24 ${props.bgColor} mx-auto rounded-2xl`}>
        <div className='flex items-center h-24'>
          <props.icon size={50} className='mx-auto text-white' />
        </div>
      </div>
      <div className='my-5 font-medium text-xl'>{props.title}</div>
      <div className='text-sm'>{props.subtitle}</div>
    </div>
  )
}
