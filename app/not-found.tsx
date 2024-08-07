import { Button } from 'flowbite-react'
import React from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import Image from 'next/image'
export default function NotFound() {
    return (
        <div className='bg-[#f3f4f6]'>
            <div className='flex flex-row-reverse justify-center items-center min-h-screen'>
                <Image height={600} width={600} src="/assets/images/error.svg" alt="error" />
                <div className='w-96'>
                    <div className='my-5 text-4xl font-black'> Oops, Không tìm thấy trang</div>
                    <div className='text-xl font-bold'>
                        Có vẻ có lỗi khi chuyển qua trang khác
                    </div>
                    <div className='my-5'>
                        Thật không may, có lỗi xảy ra và trang này không tồn tại. Hãy thử sử dụng chức năng tìm kiếm hoặc quay lại trang trước.
                    </div>
                    <Button size='sm' className='focus:ring-transparent w-48' href='/'>
                        <FaLongArrowAltLeft className='mr-1' size={20} />
                        Quay lại trang chủ
                    </Button>
                </div>
            </div>
        </div>
    )
}
