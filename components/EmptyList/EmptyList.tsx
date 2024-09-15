import React from 'react'
import Image from 'next/image'

export default function EmptyList() {
    return (
        <div className='flex-col items-center justify-center'>
            <div className='py-14'>
                <Image className='mx-auto' height={90} width={90} src={"/assets/images/empty-box.png"} alt='empty-list' />
                <p className='text-center mt-3 font-bold text-2xl'>Danh sách trống</p>
                <p className='text-center mt-3 font-semibold text-lg'>Có vẻ như không có gì trong danh sách</p>
            </div>
        </div>
    )
}
