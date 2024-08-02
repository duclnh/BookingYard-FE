'use client'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { Carousel, Rating } from 'flowbite-react'
import MapEmbed from '@components/MapEmbed/MapEmbed '
import { MdZoomOutMap } from 'react-icons/md'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'
import { TbView360Number } from 'react-icons/tb'
import View360, { EquirectProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

export default function Facility() {
  const [openModalMap, setOpenModalMap] = useState(false);
  const [openModalImage, setOpenModalImage] = useState(false);
  const [openModal360, setOpenModal360] = useState(false);
  const [slideAuto, setSlideAuto] = useState(false)
  const projection = useMemo(() => new EquirectProjection({
    src: "/assets/images/360.jpg",
  }), []);
  return (
    <>
      <div className='sm:mx-20 mx-5 py-20'>
        <div className="grid grid-cols-4 gap-4 h-96">
          <Carousel slideInterval={5000} pauseOnHover={slideAuto} indicators={false} className='col-span-3'>
            <div className='relative group/item' onMouseOver={() => setSlideAuto(true)} onMouseOut={() => setSlideAuto(false)} onClick={() => setOpenModalImage(true)}>
              <Image height={1000} width={1000} className='rounded-2xl h-full' src="/assets/images/slide2.png" alt="dá" />
              <div className='absolute right-0 top-0  w-full h-full bg-[#302f2f] opacity-70 rounded-2xl flex justify-center items-center invisible group-hover/item:visible'>
                <MdZoomOutMap size={40} className='text-white' />
              </div>
            </div>
            <div className='relative group/item' onMouseOver={() => setSlideAuto(true)} onMouseOut={() => setSlideAuto(false)} onClick={() => setOpenModalImage(true)}>
              <Image height={1000} width={1000} className='rounded-2xl h-full' src="/assets/images/slide2.png" alt="dá" />
              <div className='absolute right-0 top-0  w-full h-full bg-[#302f2f] opacity-70 rounded-2xl flex justify-center items-center invisible group-hover/item:visible'>
                <MdZoomOutMap size={40} className='text-white' />
              </div>
            </div>
            <div className='relative group/item' onMouseOver={() => setSlideAuto(true)} onMouseOut={() => setSlideAuto(false)} onClick={() => setOpenModalImage(true)}>
              <Image height={1000} width={1000} className='rounded-2xl h-full' src="/assets/images/slide2.png" alt="dá" />
              <div className='absolute right-0 top-0  w-full h-full bg-[#302f2f] opacity-70 rounded-2xl flex justify-center items-center invisible group-hover/item:visible'>
                <MdZoomOutMap size={40} className='text-white' />
              </div>
            </div>
            <div className='relative group/item' onMouseOver={() => setSlideAuto(true)} onMouseOut={() => setSlideAuto(false)} onClick={() => setOpenModalImage(true)}>
              <Image height={1000} width={1000} className='rounded-2xl h-full' src="/assets/images/slide2.png" alt="dá" />
              <div className='absolute right-0 top-0  w-full h-full bg-[#302f2f] opacity-70 rounded-2xl flex justify-center items-center invisible group-hover/item:visible'>
                <MdZoomOutMap size={40} className='text-white' />
              </div>
            </div>
          </Carousel>
          <div className='col-span-1 flex flex-col justify-between'>
            <div className='relative'>
              <MapEmbed
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9318.999450695495!2d106.79499512440712!3d10.875690087176755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2sVNUHCM%20Student%20Cultural%20House!5e0!3m2!1sen!2s!4v1722617783521!5m2!1sen!2s'
                width=''
                height='200'
                className='w-full rounded-xl'
              />
              <div className='absolute top-2 right-3 bg-white p-2' onClick={() => setOpenModalMap(true)}>
                <MdZoomOutMap />
              </div>
            </div>
            <div className='relative' onClick={() => setOpenModal360(true)}>
              <Image height={395} width={395} className='rounded-2xl w-full sm:w-96' src="/assets/images/slide2.png" alt="dá" />
              <div className='absolute right-0 top-0  w-full h-full bg-[#302f2f] opacity-70 rounded-2xl flex justify-center items-center'>
                <TbView360Number size={40} className='text-white' />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-40 flex items-center'>
          <div className='text-3xl font-bold mr-3'>
            San van dong ha nam
          </div>
          <Rating className='mt-2'>
            <Rating.Star />
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
            <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
              73 reviews
            </a>
          </Rating>
        </div>
      </div>
      <div className={`${openModalMap ? '' : 'hidden'} fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full bg-gray-900 bg-opacity-50 dark:bg-opacity-80`}>
        <div className='h-full w-full relative'>
          <button className='absolute right-4 top-3 p-3 rounded-lg bg-white text-xl font-medium hover:cursor-pointer' onClick={() => setOpenModalMap(false)}>X</button>
          <div className='h-full flex flex-col items-center justify-center'>
            <div className='rounded-lg bg-white shadow dark:bg-gray-700 items-center justify-center w-[100%] h-[100%]'>
              <MapEmbed
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9318.999450695495!2d106.79499512440712!3d10.875690087176755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2sVNUHCM%20Student%20Cultural%20House!5e0!3m2!1sen!2s!4v1722617783521!5m2!1sen!2s'
                className=' w-[100%] h-[100%]'
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${openModal360 ? '' : 'hidden'} fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full bg-gray-900 bg-opacity-50 dark:bg-opacity-80`}>
        <div className='h-full w-full relative'>
          <button className='absolute right-4 top-3 p-3 rounded-lg bg-white text-xl font-medium hover:cursor-pointer' onClick={() => setOpenModal360(false)}>X</button>
          <div className='h-full flex flex-col items-center justify-center'>
            <div className='rounded-lg shadow dark:bg-gray-700 flex items-center justify-between w-[80%] h-[90%]'>
              <SlArrowLeftCircle className='text-white hover:cursor-pointer' size={40} />
              <View360 className="is-16by9 w-[90%] h-[100%]" projection={projection} />
              <SlArrowRightCircle className='text-white hover:cursor-pointer' size={40} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${openModalImage ? '' : 'hidden'} fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full bg-gray-900 bg-opacity-50 dark:bg-opacity-80`}>
        <div className='h-full w-full relative'>
          <button className='absolute right-4 top-3 p-3 rounded-lg bg-white text-xl font-medium hover:cursor-pointer' onClick={() => setOpenModalImage(false)}>X</button>
          <div className='h-full flex flex-col items-center justify-center'>
            <div className='rounded-lg shadow dark:bg-gray-700 flex items-center justify-between w-[80%] h-[90%]'>
              <SlArrowLeftCircle className='text-white hover:cursor-pointer' size={40} />
              <Image height={1000} width={1000} className='rounded-2xl h-full' src="/assets/images/slide2.png" alt="dá" />
              <SlArrowRightCircle className='text-white hover:cursor-pointer' size={40} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
