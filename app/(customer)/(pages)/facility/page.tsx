'use client'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { Button, Carousel, CustomFlowbiteTheme, Label, Modal, Rating, Textarea } from 'flowbite-react'
import { MdHealthAndSafety, MdOutlineLocationOn, MdOutlineSportsKabaddi, MdPayments, MdReportGmailerrorred, MdZoomOutMap } from 'react-icons/md'
import { TbView360Number } from 'react-icons/tb'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FaCheckCircle } from 'react-icons/fa'
import { IoStorefrontSharp, IoTimeOutline } from 'react-icons/io5'
import { Input, InputDate, ModalView } from '@components/index'
import View360, { EquirectProjection } from '@egjs/react-view360'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'
import { useRouter } from 'next/navigation'
import "@egjs/react-view360/css/view360.min.css";
import { useForm } from 'react-hook-form'

export default function Facility() {
  const [modal360, setModal360] = useState(false);
  const [modalMap, setModalMap] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [slideAuto, setSlideAuto] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false);
  const [openModalReport, setOpenModalReport] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex360, setCurrentIndex360] = useState(0);
  const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
  const router = useRouter();

  const customTheme: CustomFlowbiteTheme["ratingAdvanced"] = {
    progress: {
      label: 'text-sm font-medium text-black dark:text-cyan-500'
    }
  };

  // const customToolTipTheme: CustomFlowbiteTheme["tooltip"] = {
  //   "base": "absolute z-10 inline-block rounded-lg text-sm font-medium",
  //   "arrow": {
  //     "base": "absolute z-10 h-4 w-4 rotate-45",
  //     "style": {
  //       "light": "bg-white border",
  //     },
  //     "placement": "-5px",
  //   },
  // };

  const times = ["5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",];
  const images = ['/assets/images/slide1.png', '/assets/images/slide2.png', '/assets/images/slide3.png'];

  const projection = useMemo(() => new EquirectProjection({
    src: images[currentIndex360],
  }), [currentIndex360]);

  const prevImage = () => {
    if (currentIndex == 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    if ((images.length - 1) == currentIndex) return;
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  const prevImage360 = () => {
    if (currentIndex360 == 0) return;
    setCurrentIndex360((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage360 = () => {
    if ((images.length - 1) == currentIndex360) return;
    setCurrentIndex360((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  return (
    <>
      <div className='lg:mx-20 sm:mx-10 mx-5 lg:py-20 py-10 '>
        {/* Start slide */}
        <div className="grid md:grid-cols-4 md:gap-4 gap-5 md:mb-20">
          <Carousel slideInterval={3000} pauseOnHover={slideAuto} indicators={false} className='md:col-span-3'>
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
              <iframe
                title='map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9318.999450695495!2d106.79499512440712!3d10.875690087176755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2sVNUHCM%20Student%20Cultural%20House!5e0!3m2!1sen!2s!4v1722617783521!5m2!1sen!2s'
                className='w-full rounded-xl xl:h-[190%] lg:h-[145%] md:h-[105%] sm:h-[100%]'
                loading="lazy"
                allowFullScreen
              />
              <div className='absolute top-2 right-3 bg-white p-2' onClick={() => setModalMap(true)}>
                <MdZoomOutMap />
              </div>
            </div>
            <div className='relative hover:cursor-pointer w-full' onClick={() => setModal360(true)}>
              <Image height={395} width={395} className='rounded-2xl !w-[100%] sm:w-96' src={images[0]} alt="dá" />
              <div className='absolute right-0 top-0  w-full h-full bg-[#302f2f] opacity-70 rounded-2xl flex justify-center items-center'>
                <TbView360Number size={40} className='text-white' />
              </div>
            </div>
          </div>
        </div>
        {/* End slide */}

        <div className='grid sm:grid-cols-5 md:grid-cols-5 md:py-4 md:gap-10 gap-10 mt-10 md:mt-0'>
          <div className='sm:col-span-1 md:col-span-3'>
            {/* Start information court */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='text-3xl font-bold mr-3'>
                  San van dong ha nam
                </div>
                <Rating className='mt-2'>
                  <Rating.Star />
                  <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                  <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                  <a href="#feedback" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                    73 Lượt đánh giá
                  </a>
                </Rating>
              </div>
              <p className='flex text-sm mt-3 hover:cursor-pointer' onClick={() => setOpenModalReport(true)}>
                <MdReportGmailerrorred size={20} className='mr-2' />
                Báo cáo
              </p>
            </div>
            <p className='flex text-sm mt-3'>
              <IoTimeOutline size={20} className='mr-2' />
              8:00 - 22:00
            </p>
            <p className='flex text-sm mt-3'>
              <MdOutlineLocationOn size={20} className='mr-2' />
              146 Nam Hòa, phường Phước Long A, TP. Thủ Đức
            </p>
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
                className="py-2 font-medium hover:cursor-pointer"
              >
                {isExpanded ?
                  <div onClick={() => setIsExpanded(false)} className='flex items-center'>
                    Thu gọn
                    <IoIosArrowUp className='ml-1' />
                  </div>
                  :
                  <div onClick={() => setIsExpanded(true)} className='flex items-center'>
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
            <div className='mt-10' id='feedback'>
              <div className='text-2xl font-bold border-b-2 py-3'>Đánh giá của khách hàng</div>
              <div className='grid grid-cols-3 mt-10 gap-10 place-items-start'>
                <div className='col-span-1'>
                  <div className='text-center'>
                    <p className='text-6xl font-bold'>4.5</p>
                    <p className='mt-2'>Dựa trên 120 lượt đánh giá</p>
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
          <div className='col-span-2'>
            <div className='border rounded-l py-5'>
              <div className='text-center text-xl font-bold p-5'>Đặt lịch hẹn</div>
              <div className='p-3'>
                <div className='mb-6 grid lg:grid-cols-3 grid-cols-2'>
                  <label htmlFor="sport" className='mr-2.5 col-span-1 font-medium'>Chọn môn thể thao:</label>
                  <div className='col-span-2 grid lg:grid-cols-3 grid-cols-2 gap-2'>
                    <div className='p-1 text-sm text-center border rounded-md hover:cursor-pointer bg-[#424040] text-white'>
                      Bóng đá
                    </div>
                    <div className='p-1 text-sm text-center border rounded-md hover:cursor-pointer'>
                      Bóng chuyền
                    </div>
                    <div className='p-1 text-sm text-center border rounded-md hover:cursor-pointer'>
                      Cầu lông
                    </div>
                    <div className='p-1 text-sm text-center border rounded-md hover:cursor-pointer'>
                      Bóng rổ
                    </div>
                  </div>
                </div>
                <div className='mb-6 grid lg:grid-cols-3 grid-cols-2'>
                  <label htmlFor="date" className='mr-4 col-span-1 font-medium'>Chọn loại sân:</label>
                  <div className='col-span-2 grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-3 gap-2'>
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className={`py-1 px-3 text-sm w-full text-center border rounded-md hover:cursor-pointer ${(index + 1) == 1 ? 'bg-[#424040] text-white' : ''}`}>
                        <p>{index + 1} người</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='mb-6 grid lg:grid-cols-3 grid-cols-2'>
                  <label htmlFor="date" className='mr-4 col-span-1 font-medium'>Chọn sân:</label>
                  <div className='col-span-2 grid sm:grid-cols-3 grid-cols-2 gap-2'>
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className={`py-1 px-2 text-sm w-full text-center border rounded-md hover:cursor-pointer ${(index + 1) == 1 ? 'bg-[#424040] text-white' : ''}`}>
                        <p>Sân {index + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <InputDate handlerChange={() => {}}  name='date' multiple={false} minDate={new Date()} row='mb-6 grid lg:grid-cols-3 sm:grid-cols-2' label='Chọn ngày:' labelClassName='mr-4 col-span-1 font-medium' />
                <div className='mb-6 grid lg:grid-cols-3 grid-cols-2'>
                  <label htmlFor="date" className='mr-4 col-span-1 font-medium'>Chọn giờ bắt đầu:</label>
                  <div className='col-span-2 grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-4 gap-2'>
                    {times.map((_, index) => (
                      <p key={index} className={`py-1 text-sm w-full text-center border rounded-md hover:cursor-pointer ${(index + 1) == 1 ? 'bg-[#424040] text-white' : ''}`}>
                        {times[index]}
                      </p>
                    ))}
                  </div>
                </div>
                <div className='mb-6 grid lg:grid-cols-3 grid-cols-2'>
                  <label htmlFor="date" className='mr-4 col-span-1 font-medium'>Chọn số giờ:</label>
                  <div className='col-span-2 grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-4 gap-2'>
                    {[...Array(5)].map((_, index) => (
                      <p key={index} className={`py-1 text-sm w-full text-center border rounded-md hover:cursor-pointer ${(index + 1) == 1 ? 'bg-[#424040] text-white' : ''}`}>
                        {index + 1}
                      </p>
                    ))}
                  </div>
                </div>
                <div className='mb-8 grid lg:grid-cols-3 grid-cols-2'>
                  <label htmlFor="date" className='mr-4 col-span-1 font-medium'>Giá  tiền:</label>
                  <div className='text-lg font-bold'>31312</div>
                </div>
                <Button size='sm' href='/payment' className='mx-auto py-1 w-32 px-4 rounded-md'>Đặt lịch</Button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/*Start view 360 */}
      <ModalView key={'View 360'} toggle={modal360} setToggle={setModal360}>
        <div className='rounded-lg shadow dark:bg-gray-700 flex items-center justify-between w-[100%] h-[100%]'>
          <SlArrowLeftCircle className={`${currentIndex360 == 0 ? 'text-gray-500' : 'text-white'} mx-2`} cursor='pointer' size={40} onClick={prevImage360} />
          <View360 className="is-16by9 h-full w-full" projection={projection} />
          <SlArrowRightCircle className={`${currentIndex360 == (images.length - 1) ? 'text-gray-500' : 'text-white'} mx-2`} cursor='pointer' size={40} onClick={nextImage360} />
        </div>
      </ModalView>
      {/*End view 360 */}

      {/*Start view Image */}
      <ModalView key={'View Images'} toggle={modalImage} setToggle={setModalImage}>
        <div className='rounded-lg shadow flex items-center justify-between w-[100%] h-[100%]'>
          <SlArrowLeftCircle className={`${currentIndex == 0 ? 'text-gray-500' : 'text-white'} mx-2`} cursor='pointer' size={40} onClick={prevImage} />
          <div className=''>
            <div className='mb-5 h-[600px]'>
              <Image
                height={600}
                width={1100}
                className='select-none h-full w-full'
                src={images[currentIndex]}
                alt='Slide'
              />
            </div>
            <div className='flex justify-center overflow-hidden'>
              {[...Array(images.length)].map((_, index) => (
                <div key={index} className='mx-2 mb-2'>
                  <Image
                    height={90}
                    width={90}
                    className='select-none rounded-md hover:scale-105 hover:cursor-pointer'
                    src={images[index]}
                    alt='Thumbnail'
                    onClick={() => setCurrentIndex(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <SlArrowRightCircle className={`${currentIndex == (images.length - 1) ? 'text-gray-500' : 'text-white'} mx-2`} cursor='pointer' size={40} onClick={nextImage} />
        </div>
      </ModalView>
      {/*End view Image */}

      {/*Start view Map */}
      <ModalView key={'View Map'} toggle={modalMap} setToggle={setModalMap}>
        <div className='rounded-lg bg-white shadow dark:bg-gray-700 items-center justify-center w-[100%] h-[100%]'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9318.999450695495!2d106.79499512440712!3d10.875690087176755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2sVNUHCM%20Student%20Cultural%20House!5e0!3m2!1sen!2s!4v1722617783521!5m2!1sen!2s'
            className=' w-[100%] h-[100%]'
            loading="lazy"
            allowFullScreen
          />
        </div>
      </ModalView>
      {/*End view Map */}

      {/* Start Report */}
      <Modal show={openModalReport} size="md" onClose={() => setOpenModalReport(false)} popup>
        <Modal.Header>
          <p className='text-lg ml-4'>Báo cáo</p>
        </Modal.Header>
        <Modal.Body>
          <form className="mt-5">
            <p className='text-center font-bold'>Bạn hãy nhập thông tin dưới dây để báo cáo đến quản trị viên</p>
            <div className="mb-2 block mt-3">
              <Input label="Email" name='email' control={control} />
            </div>
            <div className="mb-2 block mt-3">
              <Input label="Số điện thoại" name='phone' control={control} />
            </div>
            <div className="mb-2 block mt-3">
              <Label htmlFor="comment" value="Nội dung" />
              <Textarea className='mb-5 mt-2 focus:ring-black focus:border-black' id="comment" placeholder="Nội dung..." rows={4} required />
            </div>
            <div className="flex justify-center gap-4">
              <Button type='submit' size='md' color="info">
                Gửi
              </Button>
              <Button size='md' color="gray" onClick={() => setOpenModalReport(false)}>
                Không
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* End Report */}
    </>
  )
}
