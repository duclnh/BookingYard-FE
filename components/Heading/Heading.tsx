import React from 'react'

type Props = {
  title: string,
  subtitle?: string,
  center?: boolean,
  className?: string,
}

export default function Heading({ title, subtitle, center, className }: Props) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className={`text-2xl font-bold ${className}`}>
        {title}
      </div>
      {subtitle != null && (
        <div className='font-light text-neutral-500 mt-2'>
          {subtitle}
        </div>
      )}
    </div>
  )
}
