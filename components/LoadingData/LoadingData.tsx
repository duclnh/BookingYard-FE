import React from 'react'
import Image from 'next/image'

export default function LoadingData() {
    return (
        <div className='flex-col items-center justify-center'>
            <div className='py-28'>
                <Image className='mx-auto' height={100} width={100} src={"/assets/images/loading.gif"} alt='loading' />
            </div>
        </div>
    )
}
