import { Button } from 'flowbite-react'
import React from 'react'
import { FaPen, FaPhoneAlt } from 'react-icons/fa'
import Feature from './feature'
import Salient from './salient'
import Service from './service'
import Register from './register'
import Image from 'next/image'

export default function Partner() {
  return (
    <>
      <div className='py-20 mx-5 md:mx-24'>
        <div className='lg:flex lg:flex-row-reverse lg:items-center'>
          <div>
            <Image src="/assets/images/partner1.png" alt="partner" height={100} width={1000} className="mb-10" />
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
              <Button color='success' href="tel:0766 860 068" className='ml-10 uppercase *:flex *:items-center'>
                <FaPhoneAlt className='mx-2' />
                Liên Hệ Tư Vấn Ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Feature />
      <Salient />
      {/* <Service /> */}
      <Register />
    </>
  )
}
