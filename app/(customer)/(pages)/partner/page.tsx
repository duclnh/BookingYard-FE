import { Button } from 'flowbite-react'
import React from 'react'
import { FaPen, FaPhoneAlt } from 'react-icons/fa'
import Feature from './feature'
import Salient from './salient'
import Service from './service'
import Register from './register'


export default function Partner() {
  return (
    <>
      <div className='py-20 mx-5 md:mx-24'>
        <div className='lg:flex lg:flex-row-reverse lg:items-center'>
          <div>
            <img src="assets/images/partner1.png" alt="partner" className="h-96 mb-10 w-full" />
          </div>
          <div className='md:w-[800px]'>
            <div className='lg:text-6xl md:text-4xl text-3xl font-black'>
              <p>Phần mềm quản lý</p>
              <p>lịch hẹn đặt sân </p>
              <p>thể thao</p>
            </div>
            <p className='my-5 lg:text-2xl font-medium'>
              Đặt hẹn và quản lý lịch hẹn Sân thể thao: Sân đá bóng, Sân Tennis, Sân Bóng rổ, Sân Cầu lông,… tiện lợi và nhanh chóng với phần mềm FIELDY
            </p>
            <div className='flex'>
              <Button href='#trial' className='bg-black uppercase *:flex *:items-center'>
                <FaPen className='mx-2' />
                Đăng Kí Dùng Thử
              </Button>
              <Button href="tel:0766 860 068" className='ml-10 bg-[#65db52] hover:!bg-[#81ef70] uppercase *:flex *:items-center'>
                <FaPhoneAlt className='mx-2' />
                Liên Hệ Tư Vấn Ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Feature />
      <Salient />
      <Service />
      <Register />
    </>
  )
}
