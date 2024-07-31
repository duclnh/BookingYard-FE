import React from 'react'

type Props = {
  title: string,
  subtitle: string,
  dotColor: string,
}

export default function SalientFeature(props: Props) {
  return (
    <div className='mb-10 sm:mb-0'>
      <div className='flex items-center'>
        <div className={`${props.dotColor} h-4 w-4 rounded-full`}>
        </div>
        <div className='ml-3 font-semibold text-lg'>{props.title}</div>
      </div>
      <div className='ml-7 text-base'>{props.subtitle}</div>
    </div>
  )
}
