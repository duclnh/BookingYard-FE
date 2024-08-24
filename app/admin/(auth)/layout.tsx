import React from 'react'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen py-5 bg-admin-login-background'>
            <div className='w-[90%] max-w-[900px] h-auto rounded-lg shadow-3xl bg-white'>
                <div className='flex flex-wrap md:flex-nowrap gap-2 overflow-hidden'>
                    {children}
                </div>
            </div>
        </div>
    )
}


