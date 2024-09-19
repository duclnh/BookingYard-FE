"use client"
import React, { useEffect, useState } from 'react'
import { Carousel, Rating } from 'flowbite-react'
import { ChatBox, Loading } from '@components/index'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import BackToTop from '@components/BackToTop/BackToTop'
import Image from 'next/image'
import Link from 'next/link'
import { IoTimeOutline } from 'react-icons/io5'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbBasketDiscount } from 'react-icons/tb'
export default function Home() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: '/assets/images/slide1.png', title: 'Tiêu đề 1' },
    { src: '/assets/images/slide2.png', title: 'Tiêu đề 2' },
    { src: '/assets/images/slide3.png', title: 'Tiêu đề 3' },
    { src: '/assets/images/slide4.png', title: 'Tiêu đề 4' },
    { src: '/assets/images/slide5.png', title: 'Tiêu đề 5' },
    { src: '/assets/images/slide6.png', title: 'Tiêu đề 6' },
    { src: '/assets/images/slide7.png', title: 'Tiêu đề 7' }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, 5000]);

  const itemsPerPage = 3;
  const totalItems = images.length;

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : totalItems - itemsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex < totalItems - itemsPerPage ? prevIndex + 1 : 0));
  };

  return (
    <>
      <div className='md:py-5 md:mx-14 lg:mx-32 px-5'>
        <h4 className='lg:text-6xl md:text-4xl text-3xl font-black text-center'>
          DỊCH VỤ ĐẶT SÂN THỂ THAO TRỰC TUYẾN TIỆN LỢI
        </h4>
        <div className="my-10 h-56 sm:h-[400px] xl:h-[500px] 2xl:h-[500px]">
          <Carousel pauseOnHover>
            <Image height={1000} width={1000} src="/assets/images/slide.png" alt="slide" />
            <Image height={1000} width={1000} src="/assets/images/slide1.png" alt="slide1" />
            <Image height={1000} width={1000} src="/assets/images/slide2.png" alt="slide2" />
            <Image height={1000} width={1000} src="/assets/images/slide3.png" alt="slide3" />
            <Image height={1000} width={1000} src="/assets/images/slide4.png" alt="slide4" />
            <Image height={1000} width={1000} src="/assets/images/slide5.png" alt="slide5" />
            <Image height={1000} width={1000} src="/assets/images/slide6.png" alt="slide6" />
            <Image height={1000} width={1000} src="/assets/images/slide7.png" alt="slide7" />
          </Carousel>
        </div>
      </div>
      <div className='py-20'>
        <div className='md:mx-14 lg:mx-32 group relative'>
          <div
            className='flex flex-row'
            style={{ transition: 'transform 0.3s ease' }}
          >
            {[...Array(3)].map((_, index) => (
              <div key={index} className='rounded-lg border mr-14'>
                <div className='grid grid-cols-3 place-items-center gap-2 p-2 w-96'>
                  <div className='col-span-1 p-5 w-full rounded-lg bg-gray-700 text-orange-500'>
                    <p className='mb-2 text-lg text-center'>Fieldy</p>
                    <TbBasketDiscount className='mx-auto' size={35} />
                  </div>
                  <div className='col-span-2 place-self-auto ml-4'>
                    <p className='text-xl font-bold mb-2'>Giảm 10%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <IoIosArrowDropleft
            className='absolute top-1/3 left-3 z-30 text-gray-600 cursor-pointer transform hidden group-hover:block animate-fade-right'
            size={40}
          />
          <IoIosArrowDropright
            className='absolute top-1/3 right-3 z-30 text-gray-600 cursor-pointer transform hidden group-hover:block animate-fade-left'
            size={40}
          />
        </div>
      </div>
      <div className='md:py-5md:mx-14 lg:mx-32 mb-20'>
        <div className='lg:text-6xl md:text-4xl text-3xl font-black text-center'>
          Những sân nội bật
        </div>
        <div className='mt-20 group relative'>
          <div className='overflow-hidden'>
            <div
              className='flex flex-row'
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`, transition: 'transform 0.3s ease' }}
            >
              {images.map((image, index) => (
                <div key={index} className='flex-shrink-0 sm:w-1/3 px-5'>
                  <Link href="/facility">
                    <Image
                      height={1000}
                      width={1000}
                      className='h-96 w-full rounded-xl'
                      src={image.src}
                      alt='img'
                    />
                    <div className='mt-4'>
                      <div className='flex justify-between'>
                        <div className='text-2xl font-bold'>{image.title}</div>
                        <div className='flex items-center text-lg'>
                          <Rating className='mr-2'>
                            <Rating.Star className='h-6 w-6' />
                          </Rating>
                          4.5
                        </div>
                      </div>
                      <p className='flex text-sm mt-3'>
                        <IoTimeOutline size={20} className='mr-2' />
                        8:00 - 22:00
                      </p>
                      <p className='flex text-sm mt-3'>
                        <MdOutlineLocationOn size={20} className='mr-2' />
                        146 Nam Hòa, phường Phước Long A, TP. Thủ Đức
                      </p>
                      <div className='font-medium text-lg mt-5'>340 / giờ</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <IoIosArrowDropleft
            onClick={handlePrev}
            className='absolute top-1/3 left-5 z-30 text-white cursor-pointer transform hidden group-hover:block animate-fade-right'
            size={40}
          />
          <IoIosArrowDropright
            onClick={handleNext}
            className='absolute top-1/2 right-5 z-30 text-white cursor-pointer transform hidden group-hover:block animate-fade-left'
            size={40}
          />
        </div>
      </div>
      <div className='md:py-5md:mx-14 lg:mx-32 mb-20'>
        <div className='lg:text-6xl md:text-4xl text-3xl font-black text-center'>
          Cảm nhận từ khách hàng
        </div>
        <div className='pt-20 group relative'>
          <div
            className='flex space-x-10'
            style={{ transition: 'transform 0.3s ease' }}
          >
            {[...Array(3)].map((image, index) => (
              <div key={index} className=''>
                <div className='border rounded-lg px-5 lg:py-10 md:py-8 py-6'>
                  <div className='flex justify-between items-start'>
                    <div className='flex'>
                      <Image
                        height={1000}
                        width={1000}
                        className='h-14 w-14 rounded-full'
                        src='/assets/images/slide2.png'
                        alt='img'
                      />
                      <div className='ml-3'>
                        <p className='text-lg font-medium'>Hoành Anh Tinh Anh</p>
                        <p className='text-sm'>Khách Hàng</p>
                      </div>
                    </div>
                    <Rating className='mt-1'>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                  </div>
                  <p className='mt-12 font-medium'>
                    {"\"A home that perfectly blends sustainability with luxury until discovered Ecoland Residence. The moment I stepped community, I knew it was where I wanted to live.\""}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <IoIosArrowDropleft
            onClick={handlePrev}
            className='absolute top-1/2 left-3 z-30 text-gray-600 cursor-pointer transform hidden group-hover:block animate-fade-right'
            size={40}
          />
          <IoIosArrowDropright
            onClick={handleNext}
            className='absolute top-1/2 right-3 z-30 text-gray-600 cursor-pointer transform hidden group-hover:block animate-fade-left'
            size={40}
          />
        </div>
      </div>
      <ChatBox />
      <BackToTop />
    </>
  )
}

