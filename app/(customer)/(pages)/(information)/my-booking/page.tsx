"use client"
import { Button, Label, Modal, Radio, Rating, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaRegCalendarXmark } from 'react-icons/fa6'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { TiThSmall } from 'react-icons/ti'
import { VscFeedback } from 'react-icons/vsc'
import Image from 'next/image'
import qs from "query-string";
import { getMyBooking } from '@services/bookingService'
import { useAppSelector } from '@hooks/hooks'
import { MyBooking as MyBookingCourt, PageResult } from 'types'
import toast from 'react-hot-toast'
import { getImage } from '@utils/imageOptions'
import Link from 'next/link'
import { convertNumberToPrice } from '@utils/moneyOptions'

export default function MyBooking() {
  const user = useAppSelector(state => state.user.value)
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const [openModalFeedback, setOpenModalFeedback] = useState(false);
  const [currentSelect, setSelect] = useState<string>('all');
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [bookings, setBookings] = useState<PageResult<MyBookingCourt> | undefined>();

  const url = qs.stringifyUrl({
    url: "", query: {
      "search": "",
      "currentPage": 1,
      "pageSize": currentPageSize,
      "type": currentSelect,
    }
  });

  useEffect(() => {
    getMyBooking(user?.id, url)
      .then(x => {
        if (x.status === 200) {
          console.log(x.data)
          return x.data
        } else {
          toast.error("Lỗi lấy thông tin đặt lịch")
        }
      }).then((myBookings: PageResult<MyBookingCourt>) => setBookings(myBookings))
      .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại"))
  }, [currentPageSize, currentSelect])

  const handleMouseOver = (index: any) => {
    setHoveredStar(index);
  };

  const handleMouseOut = () => {
    setHoveredStar(null);
  };

  const handlerMouseClick = (index: any) => {
    setSelectedStar(index);
  };

  const handlerCloseFeedback = () => {
    setOpenModalFeedback(false)
    setSelectedStar(0)
    setHoveredStar(null)
  }

  const handlerCheckDate = (date: string, startTime: string) => {
    // Get the current date and time
    const currentDate = new Date();

    // Parse the date string (assumed format: DD-MM-YYYY)
    const dateParts = date.split("-");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript
    const year = parseInt(dateParts[2], 10);

    // Parse the start time string (assumed format: HH:mm)
    const timeParts = startTime.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    // Combine the date and time into a single Date object
    const inputDate = new Date(year, month, day, hours, minutes);

    // Subtract 6 hours from the current date
    const sixHoursAgo = new Date(currentDate.getTime() - 6 * 60 * 60 * 1000);

    // Compare the input date and time to six hours ago
    if (inputDate < sixHoursAgo) {
      return true;
    }

    return false;
  };


  const handleScroll = (e: any) => {
    const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    if (bottom) {
      setCurrentPageSize(prev => prev + 5);
    }
  };

  return (
    <>
      <div className='col-span-3'>
        <div className='text-2xl font-bold px-5 py-3 border rounded-t-2xl'>
          Đặt lịch hẹn
        </div>
        <div className="grid grid-cols-4 border">
          <div onClick={() => setSelect('all')} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 'all' ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
            <TiThSmall className='mx-2' /> Tất cả
          </div>
          <div onClick={() => setSelect('waiting')} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 'waiting' ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
            <MdOutlineEditCalendar className='mx-2' />
            Chờ xác nhận
          </div>
          <div onClick={() => setSelect('feedback')} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 'feedback' ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
            <VscFeedback className='mx-2' />
            Chưa đánh giá
          </div>
          <div onClick={() => setSelect('cancel')} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 'cancel' ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
            <FaRegCalendarXmark className='mx-2' />
            Hủy
          </div>
        </div>
        <div className='py-3 max-h-[650px] hover:overflow-y-auto px-1'>
          {bookings !== undefined && bookings.results.map((booking: MyBookingCourt, index) => (
            <div key={index} className='w-full shadow-3xl mb-4 hover:cursor-pointer'>
              <div className='flex justify-between items-center p-4'>
                <div className='flex'>
                  {booking.facilityLogo ?
                    <Image className='rounded-[50%]' height={100} width={100} src={getImage(booking.facilityLogo) || ''} alt="logo cơ sở" />
                    : <Image className='rounded-md' height={100} width={100} src={getImage(booking.facilityImage) || ''} alt="ảnh cơ sở" />}
                  <div className='ml-4'>
                    <Link target='_blank' href={`/facility/${booking.facilityID}`} className='font-bold text-lg'>
                      <p className='max-w-60'>{booking.facilityName}</p>
                    </Link>
                    <div className='font-normal text-sm'>Mã đặt lịch: {booking.paymentCode}</div>
                  </div>
                </div>
                <div className='font-bold'>
                  {booking.isDeleted ? <p className='text-md bg-red-200 p-1 px-2 rounded-md font-medium text-red-600'>Đã hủy</p> :
                    booking.bookingStatus ? <p className='text-md bg-green-200 p-1 px-2 rounded-md font-medium text-green-600'>Đã xác nhận</p> : <p className='text-md bg-yellow-200 p-1 rounded-md font-medium text-yellow-600'>Chờ xác nhận</p>}
                </div>
                <div className='md:flex md:justify-end space-x-3'>
                  <Button size='xs' color='blue' href={`/booking-detail/${booking.bookingID}`} className='rounded-md'>Chi tiết</Button>
                  {booking.isCheckIn && booking.isFeedback == false && (
                    <Button size='xs' color='info' className='rounded-md' onClick={() => setOpenModalFeedback(true)}>Đánh giá</Button>
                  )}
                  {booking.isDeleted == false && booking.bookingStatus == false || handlerCheckDate(booking.playDate, booking.startTime) ?
                    <Button size='xs' color='failure' className=' rounded-md px-2 mt-2 sm:mt-0' onClick={() => setOpenModalCancel(true)}>Hủy</Button>
                    : <></>}
                </div>
              </div>
              <div className="border-t-2">
                <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="font-bold">Thời gian chơi</div>
                    <div className='text-sm'>{booking.playDate}</div>

                  </div>
                  <div>
                    <div className='font-bold'>Giờ chơi</div>
                    <div className='text-sm'>{booking.startTime} - {booking.endTime}</div>
                  </div>
                  <div className='mx-auto'>
                    <div className="font-bold">Ngày đặt lịch hẹn</div>
                    <div className='text-sm'>{booking.bookingDate}</div>
                  </div>
                  <div className='md:text-center'>
                    <div className="font-bold">Giá tiền</div>
                    <div className='font-bold text-xl'>{convertNumberToPrice(booking.totalPrice)}</div>
                  </div>
                </div>
                <p className='text-sm mb-2 px-1 text-center pb-3'>
                  (<span className='text-red-500'>*</span>) Bạn có thể hủy lịch hẹn trước giờ chơi 6 giờ. Và số tiền đã thanh toán sẽ được quy đổi ra số điểm
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal key={"cancel"} show={openModalCancel} size="md" onClose={() => setOpenModalCancel(false)} popup>
        <Modal.Header>
          <p className='text-lg'>Bạn có muốn xóa lịch này không ?</p>
        </Modal.Header>
        <Modal.Body>
          <form className="mt-5">
            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-8 text-center font-bold">Chọn lý do hủy</legend>

              <div className="flex items-center gap-2">
                <Radio className='checked:!ring-transparent' id="reason1" name="reasons" value="Đổi giờ chơi" defaultChecked />
                <Label htmlFor="reason1">Đổi giờ chơi</Label>
              </div>

              <div className="flex items-center gap-2">
                <Radio className='checked:!ring-transparent' id="reason2" name="reasons" value="Bận không đi được" />
                <Label htmlFor="reason2">Bận không đi được</Label>
              </div>

              <div className="flex items-center gap-2">
                <Radio className='checked:!ring-transparent' id="reason3" name="reasons" value="Lý do cá nhân" />
                <Label htmlFor="reason3">Lý do cá nhân</Label>
              </div>

              <div className="flex items-center gap-2">
                <Radio className='checked:!ring-transparent' id="reason4" name="reasons" value="Thời tiết xấu" />
                <Label htmlFor="reason4">Thời tiết xấu</Label>
              </div>
            </fieldset>
            <div className="mb-2 block mt-3">
              <Label htmlFor="other" value="Lý do khác" />
            </div>
            <Textarea className='mb-5' id="other" placeholder="Nội dung..." rows={4} />
            <div className="flex justify-center gap-4">
              <Button size='md' color="failure" onClick={() => setOpenModalCancel(false)}>
                {"Có"}
              </Button>
              <Button size='md' color="gray" onClick={() => setOpenModalCancel(false)}>
                Không
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal key={"feedback"} show={openModalFeedback} size="md" onClose={() => setOpenModalFeedback(false)} popup>
        <Modal.Header>
          Đánh giá
        </Modal.Header>
        <Modal.Body>
          <form className="mt-5">
            <p className='text-center font-bold'>Đánh giá để nhận điểm tích lũy và sau này bạn có thể dùng để thanh toán</p>
            <div className="mb-2 block mt-3">
              <Label htmlFor="rating" value="Chọn số sao" />
              <div className='flex justify-center'>
                <Rating className='mt-2'>
                  {[...Array(5)].map((star, index) => (
                    <Rating.Star
                      key={index}
                      onMouseOver={() => handleMouseOver(index)}
                      onClick={() => handlerMouseClick(index)}
                      onMouseOut={() => handleMouseOut()}
                      className='h-16 w-16 hover:cursor-pointer'
                      filled={index <= (hoveredStar !== null ? hoveredStar : selectedStar)}
                    />
                  ))}
                </Rating>
              </div>
            </div>
            <div className="mb-2 block mt-3">
              <Label htmlFor="comment" value="Nội dung" />
              <Textarea className='mb-5 mt-2' id="comment" placeholder="Nội dung..." rows={4} required />
            </div>
            <div className="flex justify-center gap-4">
              <Button type='submit' size='md' color="info">
                Đánh giá
              </Button>
              <Button size='md' color="gray" onClick={handlerCloseFeedback}>
                Không
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
