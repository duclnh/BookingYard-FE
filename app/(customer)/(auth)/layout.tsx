import Image from 'next/image'
import React from 'react'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen py-5'>
            <div className='w-[90%] max-w-[1300px] h-auto rounded-lg'>
                <div className='flex flex-wrap md:flex-nowrap gap-2 overflow-hidden'>
                    {children}
                </div>
            </div>
        </div>
    )
}


