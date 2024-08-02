"use client"
import MapEmbed from '@components/MapEmbed/MapEmbed '
import { Button, Textarea, TextInput } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { BsGlobe } from 'react-icons/bs'
import { FiPhone } from 'react-icons/fi'
import { HiMiniInboxStack } from 'react-icons/hi2'
import { IoIosPhonePortrait } from 'react-icons/io'
import { MdHeadsetMic, MdOutlineEmail } from 'react-icons/md'

export default function Contact() {
  return (
    <div className='py-14 mx-5 sm:mx-24'>
      <div className='text-left mb-24'>
        <div className='lg:text-6xl md:text-4xl text-3xl font-black md:w-[50%]'>
          <p>  Liên Hệ Đặt Sân</p>  Đăng Ký Làm Chủ Sân Nhanh Chóng
        </div>
        <div className='mt-3 font-medium lg:text-2xl md:w-[70%]'>
          Đặt sân bóng nhanh chóng và dễ dàng. Đăng ký làm chủ sân để quản lý và cho thuê sân của bạn.
          Liên hệ với chúng tôi ngay hôm nay!
        </div>
      </div>
      <div className='mx-5 sm:mx-20'>
        <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-10'>
          <div className='w-ful rounded-3xl text-center p-5 shadow-3xl'>
            <div className='h-16 w-16 mx-auto rounded-full bg-[#e7f6f8]'>
              <div className='flex items-center h-16'>
                <MdHeadsetMic size={25} className='mx-auto text-[#17a2b8]' />
              </div>
            </div>
            <div className='my-5 font-bold text-xl'>Điện thoại</div>
            <div className='text-sm'></div>
            <div className='mt-3 grid sm:grid-cols-2 gap-3 mx-auto w-[60%] sm:w-full'>
              <Link href='tel:0766 860 068' className='flex items-center justify-center leading-8 font-medium bg-[#edecfb] text-[#5143d9] hover:bg-[#e1dff8] rounded-md'>
                <IoIosPhonePortrait className='mr-1' />
                0766 860 068
              </Link>
              <Link href='tel:(222)4567 586' className='flex items-center justify-center leading-8 font-medium bg-[#f5f5f6] text-black hover:bg-[#e2e2e3] rounded-md'>
                <FiPhone className='mr-1' />
                {'(222)4567 586'}
              </Link>
            </div>
          </div>
          <div className='w-ful rounded-3xl text-center p-5 shadow-3xl'>
            <div className='h-16 w-16 mx-auto rounded-full bg-[#fbe9eb]'>
              <div className='flex items-center h-16'>
                <HiMiniInboxStack size={25} className='mx-auto text-[#d6293e]' />
              </div>
            </div>
            <div className='my-5 font-bold text-xl'>Email</div>
            <div className='text-sm'></div>
            <div className='mt-3'>
              <div className='flex items-center justify-center leading-8 font-medium'>
                <MdOutlineEmail size={25} className='mx-2' />
                fieldy@gmail.com
              </div>
            </div>
          </div>
          <div className='w-ful rounded-3xl text-center p-5 shadow-3xl'>
            <div className='h-16 w-16 mx-auto rounded-full bg-[#fff2e7]'>
              <div className='flex items-center h-16'>
                <BsGlobe size={25} className='mx-auto text-[#fd7e14]' />
              </div>
            </div>
            <div className='my-5 font-bold text-xl'>Mạng xã hội</div>
            <div className='text-sm'></div>
            <div className='mt-3 grid grid-cols-4 mx-auto'>
              <Link href="#">
                <img className='mx-auto' height={30} width={30} src="assets/images/facebook.png" alt="facebook" />
              </Link>
              <Link href="#">
                <img className='mx-auto' height={30} width={30} src="assets/images/youtube.png" alt="youtube" />
              </Link>
              <Link href="#">
                <img className='mx-auto' height={30} width={30} src="assets/images/instagram.png" alt="instagram" />
              </Link>
              <Link href="#">
                <img className='mx-auto' height={30} width={30} src="assets/images/tiktok.png" alt="tiktok" />
              </Link>
            </div>
          </div>
        </div>
        <div className='mt-10 py-10 sm:py-20 grid md:grid-cols-2 gap-16 sm:gap-32'>
          <img width={1000} src='assets/images/contact.png' alt='contact' />
          <div className='rounded-lg bg-[#f5f5f6] p-8'>
            <div className='text-2xl font-bold'>
              Gửi đến chúng tôi
            </div>
            <form className="mt-10 flex max-w-md flex-col gap-4">
              <div>
                <TextInput placeholder='Họ Tên (*)' type="text" required />
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <TextInput type="email" placeholder="Số Điện Thoại (*)" required />
                <TextInput type="email" placeholder="Email (*)" required />
              </div>
              <div>
                <Textarea placeholder="Nội dung..." required rows={3} />
              </div>
              <ReCAPTCHA className="captcha" style={{ transform: "scale(0.85)", transformOrigin: "0 0" }} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
              <Button className='w-40 bg-black hover:!bg-[#302f2f]' type="submit">Gửi</Button>
            </form>
          </div>
        </div>
        <MapEmbed 
          src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15674.345653387507!2d106.8053171!3d10.8429291!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1722531503452!5m2!1sen!2s'
          className='w-full'
          height="550"
        />
      </div>
    </div>
  )
}
