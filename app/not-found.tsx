import { Button } from 'flowbite-react'
import React from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'

export default function NotFound() {
    return (
        <div className='bg-[#f3f4f6]'>
            <div className='flex flex-col justify-center items-center min-h-screen'>
                <img height={100} width={500} src="assets/images/error.svg" alt="error" />
                <div className='my-5 text-blue-700 text-6xl font-black'>404</div>
                <div className='text-5xl font-black'>
                    Ồ không, đã xảy ra lỗi!
                </div>
                <div className='my-5'>
                    Có thể đã xảy ra lỗi hoặc trang này không tồn tại nữa.
                </div>
                <div>
                    <Button className='focus:ring-transparent' href='/'>
                    <FaLongArrowAltLeft className='mr-2' size={20} />
                        Quay lại trang chủ
                    </Button>
                </div>
            </div>
        </div>
    )
}
