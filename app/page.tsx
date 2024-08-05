"use client"
import React from 'react'
import Header from '@components/Header/Header'
import FooterComponent from '@components/Footer/Footer'
import { Button, Carousel, Label, Select } from 'flowbite-react'
import { ChatBox } from '@components/index'
import { IoMdSearch } from 'react-icons/io'
import BackToTop from '@components/BackToTop/BackToTop'

export default function Home() {
  return (
    <>
      <Header />
      <div className='md:py-5 md:mx-32 px-5'>
        <h4 className='lg:text-6xl md:text-4xl text-3xl font-black text-center'>
          DỊCH VỤ ĐẶT SÂN THỂ THAO TRỰC TUYẾN TIỆN LỢI
        </h4>
        <div className="my-10 h-56 sm:h-[400px] xl:h-[500px] 2xl:h-[500px]">
          <Carousel pauseOnHover>
            <img src="assets/images/slide.png" alt="slide" />
            <img src="assets/images/slide1.png" alt="slide1" />
            <img src="assets/images/slide2.png" alt="slide2" />
            <img src="assets/images/slide3.png" alt="slide3" />
            <img src="assets/images/slide4.png" alt="slide4" />
            <img src="assets/images/slide5.png" alt="slide5" />
            <img src="assets/images/slide6.png" alt="slide6" />
            <img src="assets/images/slide7.png" alt="slide7" />
          </Carousel>
        </div>
      </div>
      <div className='shadow-3xl p-10 mx-5 md:mx-20 mb-20 rounded-3xl'>
        <div className='text-center md:text-left'>
          <h2 className='text-title font-extrabold text-3xl'>Đặt sân thể thao ngay</h2>
          <span className='text-slate-500'>Tìm kiếm sân thi đấu thể thao trên toàn quốc</span>
        </div>
        <div className='mt-10 grid grid-rows-1 sm:grid-cols-2 sm:gap-2  md:grid-cols-2 xl:grid-cols-4 xl:gap-10'>
          <div className="max-w-md mb-3 sm:mb-0">
            <div className="mb-2 block">
              <Label htmlFor="type" value="Chọn môn thể thao" />
            </div>
            <Select id="type" required>
              <option value=''>Môn thể thao</option>
              <option value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
            </Select>
          </div>
          <div className="max-w-md mb-3 sm:mb-0">
            <div className="mb-2 block">
              <Label htmlFor="province" value="Chọn Thành Phố/Tỉnh" />
            </div>
            <Select id="province" required>
              <option value=''>Thành Phố Của Bạn</option>
              <option value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
            </Select>
          </div>
          <div className="max-w-md mb-5">
            <div className="mb-2 block">
              <Label htmlFor="district" value="Chọn Quận/Huyện" />
            </div>
            <Select id="district" required>
              <option value=''>Quận Của Bạn</option>
              <option value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
            </Select>
          </div>
          <Button color='' className='h-10 my-auto bg-orange-500 mx-auto hover:!bg-orange-400 focus:ring-transparent'>
            <IoMdSearch className='font-bold mr-2' size={18} />
            <span>Tìm kiếm</span>
          </Button>
        </div>
      </div>
      <ChatBox />
      <BackToTop />
      <FooterComponent />
    </>
  )
}

