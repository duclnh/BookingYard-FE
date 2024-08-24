"use client"
import { Button, Label, Modal, Pagination, Radio, Rating, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import { FaRegCalendarXmark } from 'react-icons/fa6'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { TiThSmall } from 'react-icons/ti'
import { VscFeedback } from 'react-icons/vsc'
import Image from 'next/image'

export default function MyBooking() {
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const [openModalFeedback, setOpenModalFeedback] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSelect, setSelect] = useState(1);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState(0);
  const onPageChange = (page: number) => setCurrentPage(page);

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

  return (
    <>
      <div className='col-span-3'>
        <div className='text-2xl font-bold px-5 py-3 border rounded-t-2xl'>
          Đặt lịch hẹn
        </div>
        <div className="grid grid-cols-4 border">
          <div onClick={() => setSelect(1)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 1 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
            <TiThSmall className='mx-2' /> Tất cả
          </div>
          <div onClick={() => setSelect(2)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 2 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
            <MdOutlineEditCalendar className='mx-2' />
            Chờ xác nhận
          </div>
          <div onClick={() => setSelect(3)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 3 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
            <VscFeedback className='mx-2' />
            Chưa đánh giá
          </div>
          <div onClick={() => setSelect(4)} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 4 ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
            <FaRegCalendarXmark className='mx-2' />
            Hủy
          </div>
        </div>
        <div className='py-3'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='w-full shadow-3xl mb-4'>
              <div className='flex justify-between items-center p-4'>
                <div className='flex'>
                  <Image height={50} width={50} src="/assets/images/logo.png" alt="dá" />
                  <div className='ml-4'>
                    <div className='font-bold text-lg'>San bong da ha nam</div>
                    <div className='font-normal text-sm'>Mã đặt lịch hẹn: DASDFGFDHDA</div>
                  </div>
                </div>
                <div className='font-bold'>Đã xác nhận</div>
                <div className='md:flex md:justify-end'>
                  {/* <Button size='xs' color='blue' href='/booking-detail' className='rounded-md mr-2'>Chi tiết</Button>
                  <Button size='xs' color='failure' className=' rounded-md px-2 mt-2 sm:mt-0' onClick={() => setOpenModalCancel(true)}>Hủy</Button> */}
                  <Button size='xs' color='info' className='rounded-md mr-2' onClick={() => setOpenModalFeedback(true)}>Đánh giá</Button>
                </div>
              </div>
              <div className="border-t-2">
                <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="font-bold">Thời gian chơi</div>
                    <div className='text-sm'>Ngày: Tue 06 Aug</div>
                    <div className='text-sm'>Giờ: 3:00AM - 4:00AM</div>
                  </div>
                  <div>
                    <div className="font-bold">Trạng thái thanh toán</div>
                    Đã thanh toán
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
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              layout="pagination"
              currentPage={currentPage}
              totalPages={1000}
              onPageChange={onPageChange}
              previousLabel=""
              nextLabel=""
              showIcons
            />
          </div>
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
                <Radio className='checked:!ring-transparent' id="united-state" name="countries" value="USA" defaultChecked />
                <Label htmlFor="united-state">United States</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio className='checked:!ring-transparent' id="germany" name="countries" value="Germany" />
                <Label htmlFor="germany">Germany</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio className='checked:!ring-transparent' id="spain" name="countries" value="Spain" />
                <Label htmlFor="spain">Spain</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio className='checked:!ring-transparent' id="uk" name="countries" value="United Kingdom" />
                <Label htmlFor="uk">United Kingdom</Label>
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
