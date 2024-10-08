"use client"
import { ModalView } from '@components/index'
import { getBookingDetail } from '@services/bookingService'
import { getImage } from '@utils/imageOptions'
import { convertNumberToPrice } from '@utils/moneyOptions'
import { Label, Textarea } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { BiSolidDiscount } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { CgScan } from 'react-icons/cg'
import { FaRegMoneyBillAlt, FaRegUser } from 'react-icons/fa'
import { FaPeopleRobbery } from 'react-icons/fa6'
import { FiUserCheck } from 'react-icons/fi'
import { GiReceiveMoney } from 'react-icons/gi'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { IoIosTimer } from 'react-icons/io'
import { IoPhonePortraitOutline, IoWalletOutline } from 'react-icons/io5'
import { LuClipboardEdit } from 'react-icons/lu'
import { MdOutlineDateRange, MdOutlinePriceCheck } from 'react-icons/md'
import { PiCourtBasketballLight } from 'react-icons/pi'
import { TbClockCancel, TbStatusChange } from 'react-icons/tb'
import { TiDownloadOutline, TiLocation } from 'react-icons/ti'
import { BookingDetail as BookingDetailCourt } from 'types'

export default function BookingDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const [bookingDetail, setBookingDetails] = useState<BookingDetailCourt | undefined>(undefined)

  const downloadImage = () => {
    const image = imgRef.current;
    if (image) {
      const link = document.createElement('a');
      link.href = image.src;
      link.download = 'QrCode.png';
      link.click();
    }
  };

  useEffect(() => {
    getBookingDetail(params.id)
      .then(x => {
        if (x.status === 200) {
          return x.data;
        }
      })
      .then((bookingDetail: BookingDetailCourt) => {
        setBookingDetails(bookingDetail);
      })
      .catch(() => {
        toast.error("Lỗi hệ thống vui lòng thử lại sau");
      });
  }, []);

  const copyImage = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    try {
      const targetElement = event.currentTarget as HTMLDivElement;
      if (imgRef.current) {
        const response = await fetch(imgRef.current.src);
        const blob = await response.blob();
        const data = [new ClipboardItem({ [blob.type]: blob })];
        await navigator.clipboard.write(data);

        const toolTip = document.createElement("div");
        toolTip.className = "absolute rounded-lg tool-tip text-center text-lg";
        toolTip.innerHTML = "Đã sao chép";
        targetElement.appendChild(toolTip);
        setTimeout(() => {
          targetElement.removeChild(toolTip);
        }, 1000);
      } else {
        console.error('Image element not found');
      }
    } catch (error) {
      console.error('Error copying image: ', error);
    }
  };
  return (
    <>
      <div className='col-span-3 rounded-2xl border'>
        <div className='text-2xl font-bold border-b-2 px-5 py-3'>
          <div className='flex'>
            <HiArrowNarrowLeft onClick={() => router.back()} className='mt-1 hover:cursor-pointer' />
            <p className='w-full text-center'> Chi tiết đặt lịch hẹn</p>
          </div>
        </div>
        <div className='p-10'>
          <div className='flex justify-between items-center'>
            {bookingDetail?.facilityLogo ?
              <Image className='rounded-[50%]' height={100} width={100} src={getImage(bookingDetail?.facilityLogo) || ''} alt="logo cơ sở" />
              : <Image className='rounded-md' height={100} width={100} src={getImage(bookingDetail?.facilityImage) || ''} alt="ảnh cơ sở" />}
            <Link href={`/facility/${bookingDetail?.facilityID}`} className='ml-5 text-2xl font-medium mx-10'>
              <div className='text-center'>{bookingDetail?.facilityName}</div>
              <div className='flex text-sm mt-3'>
                <TiLocation size={20} className='mr-1' />
                <p className='text-center'>{bookingDetail?.fullAddress}</p>
              </div>
            </Link>
            <Image onClick={() => setOpenModal(true)} ref={imgRef} className='hover:cursor-pointer' height={120} width={120} src="/assets/images/QR_Code.svg" alt="qrcode" />
          </div>
          <div className='mt-10 grid lg:grid-cols-2 lg:gap-16'>
            <div>
              <div className='flex items-center mt-4'>
                <CgScan size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Mã đặt lịch:</div>
                  <div className='float-end font-medium'>{bookingDetail?.paymentCode}</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <PiCourtBasketballLight size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Sân:</div>
                  <div className='float-end font-medium'>{bookingDetail?.courtName}</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <FaRegUser size={20} className='ml-0.5 mr-2.5' />
                <div className='w-full'>
                  <div className='float-start'>Người đặt:</div>
                  <div className='float-end font-medium'>{bookingDetail?.bookingName}</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <IoPhonePortraitOutline size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Số điện thoại:</div>
                  <div className='float-end font-medium'>{bookingDetail?.bookingPhone}</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <IoWalletOutline size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Phương thức thanh toán:</div>
                  <div className='float-end font-medium'>{bookingDetail?.paymentMethod}</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <GiReceiveMoney size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Trạng thái thanh toán:</div>
                  <div className='float-end font-medium'>{bookingDetail?.paymentStatus ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                </div>
              </div>
              {bookingDetail?.reason && (
                <>
                  <div className="mb-2 flex items-center mt-4">
                    <TbClockCancel size={22} className='mr-2' />  
                    <div className='float-start'>Lý do huỷ</div>
                  </div>
                  <Textarea readOnly className='mb-5' id="other" value={bookingDetail?.reason} rows={4} />
                </>
              )}
            </div>
            <div>
              <div className='flex items-center mt-4'>
                <MdOutlineDateRange size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Ngày đặt:</div>
                  <div className='float-end font-medium'>{bookingDetail?.bookingDate}</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <FaPeopleRobbery size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Ngày chơi:</div>
                  <div className='float-end font-medium'>{bookingDetail?.playDate}</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <IoIosTimer size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Thời gian:</div>
                  <div className='float-end font-medium'>{bookingDetail?.startTime} - {bookingDetail?.endTime}</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <FiUserCheck size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Check in:</div>
                  <div className='float-end font-medium'>{bookingDetail?.isCheckIn ? 'Đã check in' : 'Chưa check in'}</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <MdOutlinePriceCheck size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Giá:</div>
                  <div className='flex justify-end'>
                    <p className='float-end font-medium text-lg'>{`${convertNumberToPrice(bookingDetail?.courtPrice || 0)} / Giờ`}</p>
                  </div>
                </div>
              </div>
              {bookingDetail?.voucherID && (
                <div className='flex items-center mt-4'>
                  <BiSolidDiscount size={25} className='mr-2' />
                  <div className='w-full'>
                    <div className='float-start'>Mã giảm giá:</div>
                    <div className='float-end font-medium'>{bookingDetail?.voucherName}</div>
                  </div>
                </div>
              )}
              <div className='flex items-center mt-4'>
                <FaRegMoneyBillAlt size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Số tiền thanh toán:</div>
                  <div className='float-end font-medium text-lg'>{convertNumberToPrice(bookingDetail?.totalPrice || 0)}</div>
                </div>
              </div>
              <div className='flex items-center mt-3'>
                <TbStatusChange size={25} className='mr-2 mb-1' />
                <div className='w-full'>
                  <div className='float-start'>Trạng thái:</div>
                  <div className='float-end font-medium'>
                    {bookingDetail?.isDeleted ? <p className='text-md bg-red-200 p-1 px-2 rounded-md font-medium text-red-600'>Đã hủy</p> :
                      bookingDetail?.isFeedback ? <p className='text-md bg-green-200 p-1 px-2 rounded-md font-medium text-green-600'>Đã đánh giá</p> : !bookingDetail?.isCheckIn ? <p className='text-md bg-green-200 p-1 px-2 rounded-md font-medium text-green-600'>Đã xác nhận</p> : <p className='text-md bg-yellow-200 p-1 rounded-md font-medium text-yellow-600'>Đã check in</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalView toggle={openModal} setToggle={setOpenModal}>
        <div className='rounded-lg bg-white shadow dark:bg-gray-700 items-center justify-center'>
          <img className='p-5' height={450} width={450} src={imgRef.current ? imgRef.current.src : ''} alt="qrcode" />
          <div className="flex justify-center background-danger pb-5">
            <div className="mx-2 flex items-center text-xl mr-5 hover:cursor-pointer" onClick={() => downloadImage()}>
              <TiDownloadOutline size={25} className='mr-2' /> Tải xuống
            </div>
            <div className="relative mx-2 flex items-center text-xl ml-5 hover:cursor-pointer" onClick={(event) => copyImage(event)}>
              <LuClipboardEdit size={25} className='mr-2' /> Sao chép
            </div>
          </div>
        </div>
      </ModalView>
    </>
  )
}
