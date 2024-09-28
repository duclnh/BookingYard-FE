'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Button, Carousel, Label, Modal, Rating, Textarea } from 'flowbite-react'
import { MdHealthAndSafety, MdOutlineLocationOn, MdOutlineSportsKabaddi, MdPayments, MdReportGmailerrorred, MdZoomOutMap } from 'react-icons/md'
import { TbView360Number } from 'react-icons/tb'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FaCheckCircle } from 'react-icons/fa'
import { IoStorefrontSharp, IoTimeOutline } from 'react-icons/io5'
import { Input, InputDate, ModalView } from '@components/index'
import View360, { EquirectProjection } from '@egjs/react-view360'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'
import "@egjs/react-view360/css/view360.min.css";
import { useForm } from 'react-hook-form'
import { getFacilityDetailBooking } from '@services/facilityService'
import { Convenience, FacilityDetail, Feature } from 'types'
import toast from 'react-hot-toast'
import { getImage, getImage360 } from '@utils/imageOptions'
import { PiDoorOpenBold } from 'react-icons/pi'
import Feedback from './feedback'

export default function Facility({ params }: { params: { id: string } }) {
  const [modal360, setModal360] = useState(false);
  const [image360s, setImage360s] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [modalMap, setModalMap] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [slideAuto, setSlideAuto] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false);
  const [openModalReport, setOpenModalReport] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex360, setCurrentIndex360] = useState(0);
  const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
  const [facility, setFacility] = useState<FacilityDetail>();

  useEffect(() => {
    getFacilityDetailBooking(params.id)
      .then(x => {
        if (x.status === 200) {
          return x.data;
        }
      })
      .then((facility: FacilityDetail) => {
        facility.convenient = JSON.parse(facility.convenient.toString());
        setImage360s(facility.facility360s.reduce((img: string[], link: string) => {
          img.push(getImage360(link) || '');
          return img;
        }, []));
        setImages(facility.facilityImages);
        setFacility(facility);
      })
      .catch(() => {
        toast.error("Lỗi hệ thống vui lòng thử lại sau");
      });
  }, []); 
  
  const projection = useMemo(() => {
    return new EquirectProjection({
      src: image360s[currentIndex],
    });
  }, [image360s, currentIndex360])
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
    setCurrentIndex360((prevIndex) => (prevIndex === 0 ? image360s.length - 1 : prevIndex - 1));
  };

  const nextImage360 = () => {
    if ((image360s.length - 1) == currentIndex360) return;
    setCurrentIndex360((prevIndex) => (prevIndex === image360s.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className='lg:mx-20 sm:mx-10 mx-5 lg:py-20 py-10 '>
        {/* Start slide */}
        <div className="grid md:grid-cols-4 md:gap-4 gap-5 md:mb-20">
          <Carousel slideInterval={5000} pauseOnHover={slideAuto} indicators={false} className='md:col-span-3 max-h-[600px]'>
            {facility?.facilityImages?.map((image, index) => (
              <div key={index} className='relative group/item' onMouseOver={() => setSlideAuto(true)} onMouseOut={() => setSlideAuto(false)} onClick={() => setModalImage(true)}>
                <Image height={1000} width={1000} className='rounded-2xl h-[100%] w-full' src={getImage(image) || ''} alt={`image ${index}`} />
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
                src={`https://maps.google.com/maps?q=${facility?.latitude},${facility?.longitude}&hl=es;&output=embed`}
                className='w-full rounded-xl xl:h-[190%] lg:h-[145%] md:h-[105%] sm:h-[100%]'
                loading="lazy"
                allowFullScreen
              />
              <div className='absolute top-2 right-3 bg-white p-2' onClick={() => setModalMap(true)}>
                <MdZoomOutMap />
              </div>
            </div>
            <div className='relative hover:cursor-pointer w-full' onClick={() => setModal360(true)}>
              <Image height={395} width={395} className='rounded-2xl !w-[100%] sm:w-96' src={getImage(images[0]) || "/assets/images/slide1.png"} alt="360" />
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
                <div className='text-3xl font-bold mr-3 max-w-[450px]'>
                  {facility?.facilityName}
                </div>
                <Rating className='mt-2'>
                  <Rating.Star />
                  <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{facility?.facilityRating}</p>
                  <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                  <a href="#feedback" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                    {facility?.numberFeedback} Lượt đánh giá
                  </a>
                </Rating>
              </div>
              <p className='flex text-sm mt-3 hover:cursor-pointer' onClick={() => setOpenModalReport(true)}>
                <MdReportGmailerrorred size={20} className='mr-2' />
                Báo cáo
              </p>
            </div>
            <p className='flex text-sm mt-5'>
              <PiDoorOpenBold size={20} className='mr-2' />
              {facility?.openDate}
            </p>
            <p className='flex text-sm mt-3'>
              <IoTimeOutline size={20} className='mr-2' />
              {facility?.startTime} - {facility?.endTime}
            </p>
            <p className='flex text-sm mt-3'>
              <MdOutlineLocationOn size={20} className='mr-2' />
              {facility?.facilityAddress}
            </p>
            <div className='mt-10'>
              <div className='text-2xl font-bold border-b-2 py-3'>Thông tin chi tiết sân</div>
              <div
                className={`mt-5 text-gray-700 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-full' : 'max-h-80'}`}
                dangerouslySetInnerHTML={{ __html: facility?.description || '' }}
              />
              <div className="py-2 font-medium hover:cursor-pointer">
                {isExpanded ? (
                  <div onClick={() => setIsExpanded(false)} className='flex items-center'>
                    Thu gọn
                    <IoIosArrowUp className='ml-1' />
                  </div>
                ) : (
                  <div onClick={() => setIsExpanded(true)} className='flex items-center'>
                    Xêm thêm
                    <IoIosArrowDown className='ml-1' />
                  </div>
                )}
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
                    {facility?.sports.map((sport, index) => (
                      <div key={index} className='flex items-center mt-2'>
                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                        {sport}
                      </div>
                    ))}
                  </div>
                </div>
                {Array.isArray(facility?.convenient) && facility.convenient.length > 0 && facility.convenient.map((convenient: Convenience, index) => (

                  <div key={index}>
                    <div className='flex items-center font-bold'>
                      {convenient.title === 'payment' && (
                        <MdPayments size={20} className='mr-2' />
                      )}
                      {convenient.title === 'safe' && (
                        <MdHealthAndSafety size={20} className='mr-2' />
                      )}
                      {convenient.title === 'entertainment' && (
                        <IoStorefrontSharp size={20} className='mr-2' />
                      )}
                      {convenient.content}
                    </div>
                    <div className='mt-3'>
                      {convenient.feature?.map((feature: Feature, indexFeature) => (
                        <div key={indexFeature} className='flex items-center mt-2'>
                          <FaCheckCircle size={14} className='mr-3 text-green-500' />
                          {feature.title}
                        </div>
                      ))}
                    </div>
                  </div>

                ))}
              </div>
            </div>
            {/* End convenient */}
            <Feedback
              facilityID={params.id || ''}
              rating={facility?.facilityRating || 0}
              numberRating={facility?.numberFeedback || 0}
              percentOneStar={facility?.percentOneStar || 0}
              percentTwoStar={facility?.percentTwoStar || 0}
              percentThreeStar={facility?.percentThreeStar || 0}
              percentFourStar={facility?.percentFourStar || 0}
              percentFiveStar={facility?.percentFiveStar || 0}
            />
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
                <InputDate handlerChange={() => { }} name='date' multiple={false} minDate={new Date()} row='mb-6 grid lg:grid-cols-3 sm:grid-cols-2' label='Chọn ngày:' labelClassName='mr-4 col-span-1 font-medium' />
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
          {image360s && image360s.length > 0 && (
            <View360 className="is-16by9 h-full w-full" projection={projection} />
          )}
          <SlArrowRightCircle className={`${currentIndex360 == (image360s.length - 1) ? 'text-gray-500' : 'text-white'} mx-2`} cursor='pointer' size={40} onClick={nextImage360} />
        </div>
      </ModalView>
      {/*End view 360 */}

      {/*Start view Image */}
      <ModalView key={'View Images'} toggle={modalImage} setToggle={setModalImage}>
        <div className='rounded-lg shadow dark:bg-gray-700 w-[100%] h-[100%] group'>
          <SlArrowLeftCircle className={`${currentIndex == 0 ? 'text-gray-500' : 'text-white'} mx-2 absolute top-1/2 left-3`} cursor='pointer' size={40} onClick={prevImage} />
          <div className='mb-5'>
            <Image
              height={600}
              width={1100}
              className='select-none w-full max-h-[775px]'
              src={getImage(images[currentIndex]) || "/assets/images/slide1.png"}
              alt='Slide'
            />
          </div>
          <SlArrowRightCircle className={`${currentIndex == (images.length - 1) ? 'text-gray-500' : 'text-white'} mx-2 absolute top-1/2 right-3`} cursor='pointer' size={40} onClick={nextImage} />
        </div>
      </ModalView>
      {/*End view Image */}

      {/*Start view Map */}
      <ModalView key={'View Map'} toggle={modalMap} setToggle={setModalMap}>
        <div className='rounded-lg bg-white shadow dark:bg-gray-700 items-center justify-center w-[100%] h-[100%]'>
          <iframe
            src={`https://maps.google.com/maps?q=${facility?.latitude},${facility?.longitude}&hl=es;&output=embed`}
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
