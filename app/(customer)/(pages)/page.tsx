"use client"
import React, { useEffect, useState } from 'react'
import { Button, Carousel, Rating } from 'flowbite-react'
import { ChatBox } from '@components/index'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import BackToTop from '@components/BackToTop/BackToTop'
import Image from 'next/image'
import { IoTimeOutline } from 'react-icons/io5'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbBasketDiscount } from 'react-icons/tb'
import { collectVoucher, getFacilityHome, getFeedbackHome, getVoucherHome } from '@services/index'
import toast from 'react-hot-toast'
import { FacilityHome, FeedbackHome, VoucherHome } from 'types'
import { getImage } from '@utils/imageOptions'
import { convertNumberToPrice } from '@utils/index'
import { useAppSelector } from '@hooks/hooks'
export default function Home() {

  const [currentIndexVoucher, setCurrentIndexVoucher] = useState(0);
  const [currentIndexFeedBack, setCurrentIndexFeedBack] = useState<number>(0);
  const [currentIndexFacility, setCurrentIndexFacility] = useState<number>(0);
  const [feedbacks, setFeedbacks] = useState<FeedbackHome[]>([]);
  const [facilities, setFacilities] = useState<FacilityHome[]>([]);
  const [vouchers, setVouchers] = useState<VoucherHome[]>([])
  const user = useAppSelector(state => state.user.value);
  useEffect(() => {
    getVoucherHome()
      .then(x => {
        if (x.status == 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy danh sách mâ giảm giá")
        }
      }).then((voucher: VoucherHome[]) => {
        setVouchers(voucher)
      }).catch(() => {
        toast.error("Lỗi hệ thống vui lòng thử lại sau")
      })

    getFacilityHome()
      .then(x => {
        if (x.status == 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy danh sách cơ sở")
        }
      }).then((facility: FacilityHome[]) => {
        setFacilities(facility)
      }).catch(() => {
        toast.error("Lỗi hệ thống vui lòng thử lại sau")
      })

    getFeedbackHome()
      .then(x => {
        if (x.status == 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy cảm nhận khách hàng")
        }
      }).then((feedbacks: FeedbackHome[]) => {
        setFeedbacks(feedbacks)
      }).catch(() => {
        toast.error("Lỗi hệ thống vui lòng thử lại sau")
      })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      handlePrevVoucher()
      handlePrevFacility()
      handlePrevFeedback()
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevVoucher = () => {
    setCurrentIndexVoucher((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextVoucher = () => {
    setCurrentIndexVoucher((prevIndex) => Math.min(prevIndex + 1, vouchers.length - 3));
  };

  const handlePrevFacility = () => {
    setCurrentIndexFacility((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextFacility = () => {
    setCurrentIndexFacility((prevIndex) => Math.min(prevIndex + 1, facilities.length));
  };


  const handlePrevFeedback = () => {
    setCurrentIndexFeedBack((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextFeedback = () => {
    setCurrentIndexFeedBack((prevIndex) => Math.min(prevIndex + 1, feedbacks.length - 3));
  };

  const handlerCollectVoucher = (voucherID: string) => {
    if (user === undefined) {
      toast.error("Vui lòng đăng nhập");
    } else {
      collectVoucher(user?.id, voucherID)
        .then(x => {
          if (x.status == 201) {
            toast.success("Lấy mã giảm giá thành công")
          } else if (x.status == 409) {
            toast.error("Bạn đã có mã giảm giá này rồi")
          } else if (x.status == 404) {
            toast.error("Mã giảm giá này không tồn tại")
          }
          else {
            if (x.data.title.includes('Cannot collect voucher: It has already been fully redeemed.')) {
              toast.error("Mã giảm giá đã hết")
            } else if (x.data.title.includes('Cannot collect voucher. This voucher has already expired.')) {
              toast.error("Mã giảm giá này đã hết hạn")
            } else {
              toast.error("Lỗi hệ thống vui lòng thử lại sau")
            }
          }
        }).catch(() => {
          toast.error("Lỗi hệ thống vui lòng thử lại sau")
        })
    }
  }

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
          <div className='flex justify-center items-center'>
            <IoIosArrowDropleft
              onClick={handlePrevVoucher}
              className='absolute top-1/3 left-3 z-30 text-gray-600 cursor-pointer transform hidden group-hover:block animate-fade-right'
              size={40}
            />
            {vouchers !== undefined && (
              <div className='flex overflow-hidden'>
                <div
                  className='flex transition-transform duration-300'
                  style={{
                    transform: `translateX(-${(currentIndexVoucher / vouchers.length) * (100)}%)`,
                    width: `${vouchers.length * (420 + (window.innerWidth < 501 ? 67 : 0))}px`,
                  }}
                >
                  {vouchers.map((voucher: VoucherHome, index) => (
                    <div key={index} className='min-w-[470px] md:min-w-[405px] h-full mx-2'>
                      <div className='rounded-lg border shadow-2xl'>
                        <div className='flex justify-between items-center min-w-96 p-1.5'>
                          <div className='flex justify-between items-center'>
                            <div className='h-full w-28  p-5 rounded-lg bg-gray-700 text-orange-500'>
                              <p className='mb-2 text-lg text-center'>Fieldy</p>
                              <TbBasketDiscount className='mx-auto' size={35} />
                            </div>
                            <div className='ml-3'>
                              <p className='text-xl font-bold mb-2'>{`Giảm ${voucher.percentage}%`}</p>
                              {voucher.facilityName ?
                                <p className='max-w-44 text-sm mb-2 font-semibold'>{voucher.facilityName}</p>
                                : <p className='max-w-44 text-sm mb-2 font-semibold'>
                                  Tất cả các sân
                                </p>}
                              <p className='text-sm font-semibold'>{voucher.sportName ? voucher.sportName : 'Tất cả môn thể thao'}</p>
                            </div>
                          </div>
                          <button onClick={() => handlerCollectVoucher(voucher.voucherID)} className='bg-orange-400 p-1.5 rounded-md text-white font-medium text-xs hover:cursor-pointer'>Sưu tầm </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <IoIosArrowDropright
              onClick={handleNextVoucher}
              className='absolute top-1/3 right-3 z-30 text-gray-600 cursor-pointer transform hidden group-hover:block animate-fade-left'
              size={40}
            />
          </div>
        </div>
      </div>
      <div className='md:py-5md:mx-14 lg:mx-32 mb-20'>
        <div className='lg:text-6xl md:text-4xl text-3xl font-black text-center'>
          Những sân nổi bật
        </div>
        <div className='pt-20 group relative'>
          <div className='flex justify-center items-center'>
            <IoIosArrowDropleft
              onClick={handlePrevFacility}
              className='absolute top-1/2 left-5 z-30 text-gray-600 cursor-pointer transform hidden group-hover:block animate-fade-right'
              size={40}
            />
            {facilities !== undefined && (
              <div className='flex overflow-hidden'>
                <div
                  className='flex transition-transform duration-300'
                  style={{
                    transform: `translateX(-${(currentIndexFacility / facilities.length) * (100)}%)`,
                    width: `${facilities.length * (420 + (window.innerWidth < 501 ? 67 : 0))}px`,
                  }}
                >
                  {facilities.map((facility: FacilityHome, index) => (
                    <div key={index} className='min-w-[470px] md:min-w-[405px] h-full mx-2'>
                      <div className='border rounded-lg px-5 lg:py-6 md:py-4 py-2 hover:cursor-pointer h-full shadow-2xl'>
                        <Image
                          height={1000}
                          width={1000}
                          className='h-60 w-full rounded-xl'
                          src={getImage(facility.facilityImage) || ''}
                          alt={facility.facilityName}
                        />
                        <div className='mt-4'>
                          <div className='flex justify-between'>
                            <div className='text-xl font-bold max-w-72 h-16'>{facility.facilityName}</div>
                            <div className='flex items-center text-lg h-full'>
                              <Rating className='mr-2'>
                                <Rating.Star className='h-6 w-6' />
                              </Rating>
                              {facility.facilityRating}
                            </div>
                          </div>
                          <div className='flex flex-col min-h-[150px] justify-between'>
                            <div>
                              <p className='flex text-sm mt-3'>
                                <IoTimeOutline size={20} className='mr-2' />
                                {facility.startTime} - {facility.endTime}
                              </p>
                              <p className='flex text-sm mt-3'>
                                <p className='h-2 w-2 mr-5'><MdOutlineLocationOn size={20} /></p>
                                {facility.facilityAddress}
                              </p>
                            </div>
                            <div className='font-medium text-lg flex justify-between'>
                              <div className='text-green-500 font-bold'>
                                {facility.facilityMinPrice === facility.facilityMaxPrice
                                  ? convertNumberToPrice(facility.facilityMinPrice)
                                  : convertNumberToPrice(facility.facilityMinPrice, facility.facilityMaxPrice)}
                              </div>
                              <Button size='sm' href={`/facility/${facility.facilityID}`} className='text-sm px-3'>
                                Đặt lịch
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <IoIosArrowDropright
              onClick={handleNextFacility}
              className='absolute top-1/2 right-5 z-30 text-gray-600 cursor-pointer transform hidden group-hover:block animate-fade-left'
              size={40}
            />
          </div>
        </div>
      </div>
      <div className='md:py-5md:mx-14 lg:mx-32 mb-20'>
        <div className='lg:text-6xl md:text-4xl text-3xl font-black text-center'>
          Cảm nhận từ khách hàng
        </div>
        <div className='pt-20 group relative'>
          <div className='flex justify-center items-center'>
            <IoIosArrowDropleft
              onClick={handlePrevFeedback}
              className='absolute top-1/2 left-5 z-30 text-gray-600 cursor-pointer transform hidden group-hover:block animate-fade-right'
              size={40}
            />
            {feedbacks !== undefined && (
              <div className='flex overflow-hidden'>
                <div
                  className='flex transition-transform duration-300'
                  style={{
                    transform: `translateX(-${(currentIndexFeedBack / feedbacks.length) * (100)}%)`,
                    width: `${feedbacks.length * (420 + (window.innerWidth < 501 ? 67 : 0))}px`,
                  }}
                >
                  {feedbacks.map((feedback, index) => (
                    <div key={index} className='md:min-w-[405px] min-w-[470px]  h-full mx-2'>
                      <div className='border rounded-lg px-5 lg:py-6 md:py-4 py-2 hover:cursor-pointer h-full shadow-2xl'>
                        <div className='flex justify-between items-start'>
                          <div className='flex'>
                            <Image
                              height={1000}
                              width={1000}
                              className='h-12 w-12 rounded-full'
                              src={getImage(feedback.avatar) || '/assets/images/avatar-default.png'}
                              alt='img'
                            />
                            <div className='ml-3'>
                              <p className='text-lg font-medium'>{feedback.name}</p>
                              <p className='text-sm'>{feedback.typeFeedback === 'Customer' ? 'Khách hàng' : 'Chủ sân'}</p>
                            </div>
                          </div>
                          {feedback.rating && (
                            <Rating className='mt-1'>
                              {Array.from({ length: 5 }, (_, index) => (
                                <Rating.Star key={index} filled={index < feedback.rating} />
                              ))}
                            </Rating>
                          )}
                        </div>
                        <p className='mt-12 font-medium'>
                          {`"${feedback.content}"`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <IoIosArrowDropright
              onClick={handleNextFeedback}
              className='absolute top-1/2 right-5 z-30 text-gray-600 cursor-pointer transform hidden group-hover:block animate-fade-left'
              size={40}
            />
          </div>
        </div>
      </div>
      <ChatBox />
      <BackToTop />
    </>
  )
}

