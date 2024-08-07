import React from 'react'
import { Footer } from "flowbite-react";
import { FaApple, FaGooglePlay, FaLocationDot } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image'

export default function FooterComponent() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="lg:flex justify-between sm:mx-12">
          <div className='w-80'>
            <Image height={100} width={100} className='mb-5 select-none' src={"/assets/images/logo.png"} alt='logo' />
            <p className='font-bold'>Quản lí lịch hẹn - giải pháp số dành cho cơ sở tập luyện và sân thể thao</p>
            <div className="flex space-x-6 mb-10 mt-4 sm:justify-start">
              <Link href="#">
                <img className='mx-auto select-none' height={30} width={30} src="assets/images/facebook.png" alt="facebook" />
              </Link>
              <Link href="#">
                <img className='mx-auto select-none' height={30} width={30} src="assets/images/youtube.png" alt="youtube" />
              </Link>
              <Link href="#">
                <img className='mx-auto select-none' height={30} width={30} src="assets/images/instagram.png" alt="instagram" />
              </Link>
              <Link href="#">
                <img className='mx-auto select-none' height={30} width={30} src="assets/images/tiktok.png" alt="tiktok" />
              </Link>
            </div>
            <div className='w-full mt-4 '>
              <a href='#' className='flex items-center rounded-lg border border-black p-1 w-4/5'>
                <FaApple className='mx-1' size={25} />
                <span className='font-semibold'>TẢI XUỐNG CHO IOS</span>
              </a>
              <a href='#' className='flex items-center rounded-lg border border-black p-1 w-4/5 mt-5 mb-5 sm:mb-0'>
                <FaGooglePlay className='mx-2' size={20} />
                <span className='font-semibold'>TẢI XUỐNG CHO ANDROID</span>
              </a>
            </div>
          </div>
          <div className="lg:w-[800px] grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-1">
            <div>
              <Footer.Title className='font-extrabold text-lg text-black' title="Về FIELDY" />
              <Footer.LinkGroup col>
                <Footer.Link className='font-medium text-base text-black' href="#">Giới thiệu</Footer.Link>
                <Footer.Link className='font-medium text-base text-black' href="#">Khách hàng</Footer.Link>
                <Footer.Link className='font-medium text-base text-black' href="#">Liên hệ</Footer.Link>
                <Footer.Link className='font-medium text-base text-black' href="#">Chính sách</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className='font-extrabold text-lg text-black' title="Sản Phẩm" />
              <Footer.LinkGroup col>
                <Footer.Link className='font-medium text-base text-black' href="#">Quản lí sân</Footer.Link>
                <Footer.Link className='font-medium text-base text-black' href="#">Đặt lịch trực tuyến</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className='font-extrabold text-lg text-black' title="Liên hệ" />
              <Footer.LinkGroup col>
                <Footer.Link className='font-medium text-base text-black *:flex' href="https://www.google.com/maps/place/FPT+University+HCMC/@10.8429291,106.8053171,15z/data=!4m6!3m5!1s0x31752731176b07b1:0xb752b24b379bae5e!8m2!3d10.8411276!4d106.809883!16s%2Fg%2F11j2zx_fz_?entry=ttu" target='_blank'>
                  <div className='mt-1'>
                    <FaLocationDot size={17} />
                  </div>
                  <span className='ml-4'>
                    Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh 700000, Việt Nam
                  </span>
                </Footer.Link>
                <Footer.Link className='font-medium text-base text-black *:flex *:items-center' href="#">
                  <MdEmail size={16} />
                  <span className='ml-3'>
                    fieldy@gmail.com
                  </span>
                </Footer.Link>
                <Footer.Link className='font-medium text-base text-black *:flex *:items-center' href="tel:0766 860 068">
                  <BsFillTelephoneOutboundFill size={15} />
                  <span className='underline ml-3'>0766 860 068</span>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full text-center">
          <Footer.Copyright href="#" by="Công ty cổ phần Fiedly." year={2024} />
        </div>
      </div>
    </Footer>
  )
}