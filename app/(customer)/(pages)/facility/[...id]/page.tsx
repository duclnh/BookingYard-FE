'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Button, Carousel, Label, Modal, Rating, Textarea } from 'flowbite-react'
import { MdHealthAndSafety, MdOutlineLocationOn, MdOutlineSportsKabaddi, MdPayments, MdReportGmailerrorred, MdZoomOutMap } from 'react-icons/md'
import { TbView360Number } from 'react-icons/tb'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FaCheckCircle } from 'react-icons/fa'
import { IoStorefrontSharp, IoTimeOutline } from 'react-icons/io5'
import { Input, ModalView } from '@components/index'
import View360, { EquirectProjection } from '@egjs/react-view360'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'
import "@egjs/react-view360/css/view360.min.css";
import { useForm } from 'react-hook-form'
import { getFacilityDetailBooking } from '@services/facilityService'
import { Convenience, FacilityDetail, Feature, SportCreate } from 'types'
import toast from 'react-hot-toast'
import { getImage, getImage360 } from '@utils/imageOptions'
import { PiDoorOpenBold } from 'react-icons/pi'
import Feedback from './feedback'
import { convertNumberToPrice } from '@utils/index'
import Booking from './booking'

export default function Facility({ params }: { params: { id: string } }) {
  const [modal360, setModal360] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [image360s, setImage360s] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [modalMap, setModalMap] = useState(false);
  const [slideAuto, setSlideAuto] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false);
  const [openModalReport, setOpenModalReport] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex360, setCurrentIndex360] = useState(0);
  const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
  const [facility, setFacility] = useState<FacilityDetail>();
  const [isHidden, setIsHidden] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [openBooking, setOpenModalBooking] = useState<boolean>(false);


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
      src: image360s[currentIndex360],
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

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.clientHeight;
      if (height >= 320) {
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }
    }
  }, [isExpanded]);

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
              <Image height={395} width={395} className='rounded-2xl !w-[100%] h-36 sm:h-56 sm:w-96' src={getImage(images[0]) || "/assets/images/slide1.png"} alt="360" />
              <div className='absolute right-0 top-0  w-full h-full bg-[#302f2f] opacity-70 rounded-2xl flex justify-center items-center'>
                <TbView360Number size={40} className='text-white' />
              </div>
            </div>
          </div>
        </div>
        {/* End slide */}

        <div className='grid sm:grid-cols-7 md:grid-cols-7 md:py-4 md:gap-10 sm:gap-10 mt-10 md:mt-0'>
          <div className='sm:col-span-4 md:col-span-5'>
            {/* Start information court */}
            <div className='flex sm:items-center justify-between'>
              <div className='xl:flex items-center'>
                <div className='sm:text-3xl text-2xl font-bold mr-3 max-w-[450px]'>
                  {facility?.facilityName}
                </div>
                <Rating className='mt-5 xl:mt-2'>
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
                <p className='min-w-14'>Báo cáo</p>
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
              <p onClick={() => setModalMap(true)} className='hover:underline hover:cursor-pointer'>{facility?.facilityAddress}</p>
            </p>
            <div className='mt-10'>
              <div className='text-2xl font-bold border-b-2 py-3'>Thông tin chi tiết sân</div>
              <div
                className={`mt-5 text-gray-700 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-full' : 'max-h-80'}`}
                dangerouslySetInnerHTML={{ __html: facility?.description || '' }}
              />
              <div ref={containerRef} className={`py-2 font-medium hover:cursor-pointer ${isHidden ? 'hidden' : ''}`}>
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
                    {facility?.sports.map((sport: SportCreate, index) => (
                      <div key={index} className='flex mt-2'>
                        <p className='mr-5 mt-1 h-1 w-1'><FaCheckCircle className='text-green-500' /></p>
                        <p>{sport.sportName}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {Array.isArray(facility?.convenient) && facility.convenient.length > 0 && facility.convenient.map((convenient: Convenience, index) => (

                  <div key={index}>
                    <div className='flex font-bold'>
                      {convenient.title === 'payment' && (
                        <p className='mr-5 mt-1 h-1 w-1'> <MdPayments size={19} /></p>
                      )}
                      {convenient.title === 'safe' && (
                        <p className='mr-5 mt-1 h-1 w-1'> <MdHealthAndSafety size={19} /></p>
                      )}
                      {convenient.title === 'entertainment' && (
                        <p className='mr-5 mt-1 h-1 w-1'> <IoStorefrontSharp /></p>
                      )}
                      {convenient.content}
                    </div>
                    <div className='mt-3'>
                      {convenient.feature?.map((feature: Feature, indexFeature) => (
                        <div key={indexFeature} className='flex mt-2'>
                          <p className='mr-5 mt-1 h-1 w-1'><FaCheckCircle className='text-green-500' /></p>
                          <p>{feature.title}</p>
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
          <div className='col-span-3 md:col-span-2'>
            <div className='border shadow-2xl p-4 rounded-2xl'>
              <p className='text-lg text-center font-bold'>Giá sân</p>
              <div className='flex items-center my-7 justify-center'>
                <p className=' text-xl sm:text-base lg:text-xl font-semibold'>{facility?.facilityMinPrice === facility?.facilityMaxPrice
                  ? convertNumberToPrice(facility?.facilityMinPrice || 0)
                  : convertNumberToPrice(facility?.facilityMinPrice || 0, facility?.facilityMaxPrice)}</p>
                <p className='text-xl sm:text-base lg:text-xl font-medium text-gray-400'>/ Giờ</p>
              </div>
              <p className='text-sm mb-2'>
                (<span className='text-red-500'>*</span>) Giá có thể chênh lệch theo giờ và các ngày đặc biệt
              </p>

              <Button onClick={() => setOpenModalBooking(true)} className='mt-3 w-full'>Đặt lịch ngay</Button>
            </div>
          </div>
        </div>
      </div>
      {/* Start Booking*/}
      <Booking
        facilityName={facility?.facilityName || ''}
        facilityAddress={facility?.facilityAddress || ''}
        facilityRating={facility?.facilityRating || 0}
        facilityTime={facility?.openDate || ''}
        facilityImage={facility?.facilityImages[0] || ''}
        facilityOpen={facility?.startTime || ''}
        facilityClose={facility?.endTime || ''}
        sports={facility?.sports}
        open={openBooking}
        facilityID={facility?.facilityID || ''}
        setOpen={setOpenModalBooking} />
      {/* End Booking*/}
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
              quality={100}
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
