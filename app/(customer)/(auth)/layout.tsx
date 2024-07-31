import Image from 'next/image'
import React from 'react'

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen py-5 bg-slate-100'>
            <div className='w-[90%] max-w-[1300px] h-auto rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.3)] bg-white'>
                <div className='flex flex-wrap md:flex-nowrap gap-2 overflow-hidden'>
                    <Image width={100} height={100} className='w-full md:w-[65%] md:min-w-[65%] h-auto rounded-md object-fill object-left' src="/assets/images/login.jpg" alt="login" />            
                    <div className='w-full md:w-[35%] h-auto px-5 py-9'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}


