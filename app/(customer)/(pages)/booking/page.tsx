'use client'
import { Button, Label, Rating, Select } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { TiLocation } from 'react-icons/ti'

export default function Booking() {
  const router = useRouter();
  return (
    <div className='mt-10 mx-5 md:mx-20 mb-20'>
      {/* Start Search */}
      <div className='bg-search-background p-24 rounded-xl xl:bg-[length:1400px_400px] lg:bg-[length:1400px_500px] md:bg-[length:1400px_600px] bg-[length:1400px_1000px] bg-center bg-no-repeat'>
        <div className='text-center md:text-left'>
          <h2 className='text-title font-extrabold text-3xl'>Đặt sân thể thao ngay</h2>
          <span className='text-slate-500'>Tìm kiếm sân thi đấu thể thao trên toàn quốc</span>
        </div>
        <div className='mt-10 grid grid-rows-1 sm:grid-cols-2 sm:gap-2  md:grid-cols-2 xl:grid-cols-4 xl:gap-10'>
          <div className="w-full mb-3 sm:mb-0">
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
          <div className="w-full mb-3 sm:mb-0">
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
          <div className="w-full mb-5">
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
          <Button className='h-10 my-auto bg-orange-500 mx-auto hover:!bg-orange-400 focus:ring-transparent'>
            <IoMdSearch className='font-bold mr-2' size={18} />
            <span>Tìm kiếm</span>
          </Button>
        </div>
      </div>
      {/* End Search */}
      {/* Start Filter */}
      <div className='mt-24 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16'>
        <Select className='w-full sm:w-72 xl:col-start-4 lg:col-start-3 sm:col-start-2 col-start-1'>
          <option value="">Sắp xếp</option>
          <option value="">Sắp xếp theo giá tăng dần</option>
          <option value="">Sắp xếp theo giá giảm dần</option>
          <option value="">Sắp xếp theo giảm giá tăng dần</option>
          <option value="">Sắp xếp theo giảm giá giảm dần</option>
          <option value="">Sắp xếp theo khoảng cánh tăng dần</option>
          <option value="">Sắp xếp theo khoảng cách giảm dần</option>
        </Select>
      </div>
      {/* End Filter */}
      {/* Start View List */}
      <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16'>
        {[...Array(8)].map((_, index) => (
          <div key={index} className='shadow-3xl rounded-2xl p-2 w-72 mx-auto'>
            <img className='rounded-lg' height={500} width={500} src="assets/images/contact.png" alt="img" />
            <div className='mx-2'>
              <div className='flex justify-between items-center py-4'>
                <Rating>
                  <Rating.Star />
                  <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                </Rating>
                <div>12km</div>
              </div>
              <div className='font-bold mb-5 text-center text-xl'>Sân bóng đá Hà Anh</div>
              <div className='flex text-sm'>
                <TiLocation size={25} className='mr-2' />
                146 Nam Hòa, phường Phước Long A, TP. Thủ Đức
              </div>
              <div className='py-5 flex justify-between items-center'>
                <div className='text-green-500 font-bold'>60.000d</div>
                <Button size='xs' color='dark' href='/facility' className='flex items-center text-sm px-3'>
                   Chi tiết
                  <FaArrowRight className='ml-2 mt-0.5' size={12} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* End View List */}
    </div>
  )
}
