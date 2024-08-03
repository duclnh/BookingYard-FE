'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Carousel, CustomFlowbiteTheme, Flowbite, Progress, Rating } from 'flowbite-react'
import { MdHealthAndSafety, MdOutlineSportsKabaddi, MdPayments, MdZoomOutMap } from 'react-icons/md'
import { TbView360Number } from 'react-icons/tb'
import { TiLocation } from 'react-icons/ti'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FaCheckCircle } from 'react-icons/fa'
import { IoStorefrontSharp } from 'react-icons/io5'
import { MapEmbed, Modal360, ModalImage, ModalMap } from '@components/index'
export default function Facility() {
  const [modal360, setModal360] = useState(false);
  const [modalMap, setModalMap] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [slideAuto, setSlideAuto] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false);

  const customTheme: CustomFlowbiteTheme["ratingAdvanced"] = {
    progress: {
      label: 'text-sm font-medium text-black dark:text-cyan-500'
    }
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className='lg:mx-20 sm:mx-10 mx-5 lg:py-20 py-10'>
        {/* Start slide */}
        <div className="grid md:grid-cols-4 md:gap-4 gap-5 md:mb-20">
          <Carousel slideInterval={5000} pauseOnHover={slideAuto} indicators={false} className='md:col-span-3'>
            {[...Array(6)].map((_, index) => (
              <div key={index} className='relative group/item' onMouseOver={() => setSlideAuto(true)} onMouseOut={() => setSlideAuto(false)} onClick={() => setModalImage(true)}>
                <Image priority height={1000} width={1000} className='rounded-2xl h-full w-full' src="/assets/images/slide2.png" alt="dá" />
                <div className='absolute right-0 top-0  w-full h-full bg-[#302f2f] opacity-70 rounded-2xl flex justify-center items-center invisible group-hover/item:visible'>
                  <MdZoomOutMap size={40} className='text-white' />
                </div>
              </div>
            ))}
          </Carousel>
          <div className='md:col-span-1 md:flex md:flex-col md:justify-between'>
            <div className='relative mb-5 md:mb-0'>
              <MapEmbed
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9318.999450695495!2d106.79499512440712!3d10.875690087176755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2sVNUHCM%20Student%20Cultural%20House!5e0!3m2!1sen!2s!4v1722617783521!5m2!1sen!2s'
                className='w-full rounded-xl xl:h-[190%] lg:h-[145%] md:h-[105%] sm:h-[100%]'
              />
              <div className='absolute top-2 right-3 bg-white p-2' onClick={() => setModalMap(true)}>
                <MdZoomOutMap />
              </div>
            </div>
            <div className='relative hover:cursor-pointer' onClick={() => setModal360(true)}>
              <Image height={395} width={395} className='rounded-2xl w-full sm:w-96' src="/assets/images/slide2.png" alt="dá" />
              <div className='absolute right-0 top-0  w-full h-full bg-[#302f2f] opacity-70 rounded-2xl flex justify-center items-center'>
                <TbView360Number size={40} className='text-white' />
              </div>
            </div>
          </div>
        </div>
        {/* End slide */}

        <div className='grid sm:grid-cols-5 md:grid-cols-5 md:py-4 gap-28'>
          <div className='sm:col-span-1 md:col-span-3'>
            {/* Start information court */}
            <div className='flex items-center'>
              <div className='text-3xl font-bold mr-3'>
                San van dong ha nam
              </div>
              <Rating className='mt-2'>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                  73 Lượt đánh giá
                </a>
              </Rating>
            </div>
            <div className='flex text-sm mt-3'>
              <TiLocation size={20} className='mr-1' />
              146 Nam Hòa, phường Phước Long A, TP. Thủ Đức
            </div>
            <div className='mt-10'>
              <div className='text-2xl font-bold border-b-2 py-3'>Thông tin chi tiết sân</div>
              <div
                className={`text-gray-700 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-full' : 'max-h-44'
                  }`}
              >
                <p className='mt-3'>
                  Demesne far-hearted suppose venture excited see had has. Dependent on so extremely delivered by. Yet no jokes worse her why. Bed one supposing breakfast day fulfilled off depending questions.
                </p>
                <p className='mt-3'>
                  Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. Water timed folly right aware if oh truth. Large above be to means. Dashwood does provide stronger is.
                </p>
                <p className='mt-3'>
                  We focus a great deal on the understanding of behavioral psychology and influence triggers which are crucial for becoming a well-rounded Digital Marketer. We understand that theory is important to build a solid foundation, we understand that theory alone isnt going to get the job done so thats why this rickets is packed with practical hands-on examples that you can follow step by step.
                </p>
                <p className='mt-3'>
                  Behavioral psychology and influence triggers which are crucial for becoming a well-rounded Digital Marketer. We understand that theory is important to build a solid foundation, we understand that theory alone isnt going to get the job done so thats why this tickets is packed with practical hands-on examples that you can follow step by step.
                </p>
              </div>
              <div
                onClick={toggleReadMore}
                className="py-2 font-medium hover:cursor-pointer"
              >
                {isExpanded ?
                  <div className='flex items-center'>
                    Thu gọn
                    <IoIosArrowUp className='ml-1' />
                  </div>
                  :
                  <div className='flex items-center'>
                    Xêm thêm
                    <IoIosArrowDown className='ml-1' />
                  </div>
                }
              </div>
            </div>
            {/* End information court */}
            {/* Start convenient */}
            <div className='mt-10'>
              <div className='text-2xl font-bold border-b-2 py-3'>Các tiện ích ở sân</div>
              <div className='grid grid-cols-2 mt-5 gap-10  '>
                <div>
                  <div className='flex items-center font-bold'>
                    <MdOutlineSportsKabaddi size={20} className='mr-2' />
                    Các sân thể thao
                  </div>
                  <div className='mt-3'>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Bể bơi
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Bóng chuyền
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Bóng đá
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Bống rổ
                    </div>
                  </div>
                </div>
                <div>
                  <div className='flex items-center font-bold'>
                    <MdPayments size={20} className='mr-2' />
                    Các phương thức thanh toán
                  </div>
                  <div className='mt-3'>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Thẻ tín dụng (Visa, Master card)
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Momo
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Chuyển khoản
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Tiền mặt
                    </div>
                  </div>
                </div>
                <div>
                  <div className='flex items-center font-bold'>
                    <IoStorefrontSharp size={20} className='mr-2' />
                    Các dịch vụ giải trí
                  </div>
                  <div className='mt-3'>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Nhà hàng
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Quán nước
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Căn tin
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Karoke
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Cửa hàng tiện lợi
                    </div>
                  </div>
                </div>
                <div>
                  <div className='flex items-center font-bold'>
                    <MdHealthAndSafety size={20} className='mr-2' />
                    Các dịch vụ an toàn và chăm sóc
                  </div>
                  <div className='mt-3'>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Bảo vệ
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Nhà gửi xe
                    </div>
                    <div className='flex items-center mt-2'>
                      <FaCheckCircle size={14} className='mr-3 text-green-500' />
                      Chăm sóc y tế
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End convenient */}
            {/* Start feedback */}
            <div className='mt-10'>
              <div className='text-2xl font-bold border-b-2 py-3'>Đánh giá của khách hàng</div>
              <div className='grid grid-cols-3 mt-10 gap-10 place-items-start'>
                <div className='col-span-1'>
                  <div className='text-center'>
                    <p className='text-6xl font-bold'>4.5</p>
                    <p className='mt-2'>Dựa trên 120 lươt đánh giá</p>
                  </div>
                </div>
                <div className='col-span-2 w-full'>
                  <Rating.Advanced percentFilled={70} theme={customTheme} className="mb-2">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                    </Rating>
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={60} theme={customTheme} className="mb-2">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={50} theme={customTheme} className="mb-2">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                    </Rating>
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={40} theme={customTheme} className="mb-2">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                    </Rating>
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={30} theme={customTheme} className="mb-2">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                    </Rating>
                  </Rating.Advanced>
                </div>
              </div>
              <div className='mt-10 overflow-hidden max-h-[400px] overflow-y-hidden hover:overflow-y-auto'>
                {[...Array(7)].map((_, index) => (
                  <div key={index} className='flex justify-between items-start mb-10'>
                    <div className='flex'>
                      <div className='min-w-8'>
                        <Image height={40} width={40} src="/assets/images/avatar-default.png" alt='avatar' className='rounded-full mt-1' />
                      </div>
                      <div className='ml-3'>
                        <div className='text-xl font-bold mb-1'>Jacqueline Miller</div>
                        <div className='flex items-center mb-3'>
                          <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                          </Rating>
                        </div>
                        <div className='max-w-[490px] text-gray-700 mb-5'>
                          <p>Demesne far-hearted suppose venture excited see had has. Dependent on so extremely delivered by. Yet no jokes worse her why. Bed one supposing breakfast day fulfilled off depending questions.</p>
                        </div>
                        <div className='flex'>
                          <Image height={100} width={100} src="/assets/images/slide2.png" className='rounded-lg hover:cursor-pointer mr-3' onClick={() => setModalImage(true)} alt="das" />
                          <Image height={100} width={100} src="/assets/images/slide2.png" className='rounded-lg hover:cursor-pointer mr-3' onClick={() => setModalImage(true)} alt="das" />
                          <Image height={100} width={100} src="/assets/images/slide2.png" className='rounded-lg hover:cursor-pointer mr-3' onClick={() => setModalImage(true)} alt="das" />
                          <div className='hover:cursor-pointer relative'>
                            <Image height={100} width={100} src="/assets/images/slide2.png" className='rounded-lg hover:cursor-pointer' alt="das" />
                            <div className='absolute right-0 top-0 w-full h-full bg-[#302f2f] opacity-70 rounded-lg flex justify-center items-center text-white font-bold'>
                              + 999
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='text-gray-500 pr-3'>
                      Stayed 13 Nov 2022
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* End feedback */}
          </div>
          <div className='col-span-2 border rounded-lg'>
            <div className='text-center text-xl font-bold p-5'>Đặt lịch hẹn</div>
            <div>
              <div>
                <label htmlFor=""></label>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Modal360 toggle={modal360} setToggle={setModal360} />
      <ModalMap toggle={modalMap} setToggle={setModalMap} />
      <ModalImage toggle={modalImage} setToggle={setModalImage} />
    </>
  )
}
