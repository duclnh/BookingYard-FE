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

export default function MyBooking() {
  const user = useAppSelector(state => state.user.value)
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const [openModalFeedback, setOpenModalFeedback] = useState(false);
  const [currentSelect, setSelect] = useState<string>('all');
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [bookings, setBookings] = useState<PageResult<MyBookingCourt> | undefined>({
    totalCount: 4,
    pageSize: 2,
    currentPage: 2,
    totalPages: 2,
    hasNext: false,
    hasPrevious: true,
    results: [
      {
        bookingID: "",
        facilityID: "e175daf6-b5a4-4d0e-544d-08dcd4d409d4",
        code: "EFGH123",
        image: "/facility/31fff3b5-663d-49af-b2b6-64fe034f1304.jpg",
        facilityName: "Tennis Court L",
        startTime: "2:00 PM",
        endTime: "4:00 PM",
        datePlay: "2024-10-13",
        dateBooking: "2024-09-27",
        totalPrice: 500000,
        statusBooking: true,
        isCheckIn: true,
        isFeedback: false,
        isDelete: true
      },
      {
        bookingID: "",
        facilityID: "dc6d6e88-dd7a-4ebc-df13-08dce1b6b5ad",
        code: "IJKL999",
        image: "/facility/31fff3b5-663d-49af-b2b6-64fe034f1304.jpg",
        facilityName: "Basketball Court M",
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        datePlay: "2024-10-14",
        dateBooking: "2024-09-26",
        totalPrice: 650000,
        statusBooking: false,
        isCheckIn: false,
        isFeedback: true,
        isDelete: false
      }
    ]
  });

  const url = qs.stringifyUrl({
    url: "", query: {
      "search": "",
      "currentPage": 1,
      "pageSize": currentPageSize,
      "type": currentSelect,
    }
  });

  // useEffect(() => {
  //   getMyBooking(user?.id, url)
  //     .then(x => {
  //       if (x.status === 200) {
  //         return x.data
  //       } else {
  //         toast.error("Lỗi lấy thông tin đặt lịch")
  //       }
  //     }).then((myBookings: PageResult<MyBookingCourt>) => setBookings(myBookings))
  //     .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại"))
  // }, [url])

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
                  <Image className='rounded-md' height={100} width={100} src={getImage(booking.image) || ''} alt="ảnh cơ sỏ" />
                  <div className='ml-4'>
                    <Link target='_blank' href={`/facility/${booking.facilityID}`} className='font-bold text-lg'>{booking.facilityName}</Link>
                    <div className='font-normal text-sm'>Mã đặt lịch: {booking.code}</div>
                  </div>
                </div>
                <div className='font-bold'>
                  {booking.statusBooking ? <p className='text-md bg-green-200 p-1 px-2 rounded-md font-medium text-green-600'>Đã xác nhận</p> : <p className='text-md bg-yellow-200 p-1 rounded-md font-medium text-yellow-600'>Chờ xác nhận</p>}
                </div>
                <div className='md:flex md:justify-end space-x-3'>
                  <Button size='xs' color='blue' href='/booking-detail' className='rounded-md'>Chi tiết</Button>
                  <Button size='xs' color='info' className='rounded-md' onClick={() => setOpenModalFeedback(true)}>Đánh giá</Button>
                  <Button size='xs' color='failure' className=' rounded-md px-2 mt-2 sm:mt-0' onClick={() => setOpenModalCancel(true)}>Hủy</Button>
                </div>
              </div>
              <div className="border-t-2">
                <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="font-bold">Thời gian chơi</div>
                    <div className='text-sm'>{booking.datePlay}</div>

                  </div>
                  <div>
                    <div className='font-bold'>Giờ chơi</div>
                    <div className='text-sm'>{booking.startTime} - {booking.endTime}</div>
                  </div>
                  <div className='mx-auto'>
                    <div className="font-bold">Ngày đặt lịch hẹn</div>
                    <div>Tue 06 Aug 4:00 PM</div>
                  </div>
                  <div className='md:text-center'>
                    <div className="font-bold">Giá tiền</div>
                    <div>$100</div>
                  </div>
                </div>
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
