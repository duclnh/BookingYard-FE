"use client"
import { Button, Modal } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaRegCalendarXmark } from 'react-icons/fa6'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { TiThSmall } from 'react-icons/ti'
import { VscFeedback } from 'react-icons/vsc'

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className='col-span-3'>
        <div className='text-2xl font-bold px-5 py-3 border rounded-t-2xl'>
          Đặt lịch của tôi
        </div>
        <div className="grid grid-cols-4 py-2 border">
          <div className='mx-auto flex items-center'>
            <TiThSmall className='mx-2' /> Tất cả
          </div>
          <div className='mx-auto flex items-center'>
            <MdOutlineEditCalendar className='mx-2' />
            Chờ xác nhận
          </div>
          <div className='mx-auto flex items-center'>
            <VscFeedback className='mx-2' />
            Chưa đánh giá
          </div>
          <div className='mx-auto flex items-center'>
            <FaRegCalendarXmark className='mx-2' />
            Hủy
          </div>
        </div>
        <div className='py-3'>
          <div className='w-full shadow-3xl mb-4'>
            <div className='flex justify-between items-center p-4'>
              <div className='flex'>
                <img height={50} width={50} src="assets/images/logo.png" alt="dá" />
                <div className='ml-4'>
                  <div className='font-bold text-lg'>San bong da ha nam</div>
                  <div className='font-normal text-sm'>Mã đặt lịch: DASDFGFDHDA</div>
                </div>
              </div>
              <div className='font-bold'>Đã xác nhận</div>
              <div className='md:flex md:justify-end'>
                <button onClick={() => router.push("/booking-detail")} className='bg-blue-500 h-7 text-white rounded-md px-2 mr-2'>Chi tiết</button>
                <button className='bg-red-600 h-7 text-white rounded-md px-2 mt-2 sm:mt-0' onClick={() => setOpenModal(true)}>Hủy</button>
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
                  <div className="font-bold">Ngày đặt lịch</div>
                  <div>Tue 06 Aug 4:00 PM</div>
                </div>
                <div className='md:text-center'>
                  <div className="font-bold">Giá tiền</div>
                  <div>$100</div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full shadow-3xl mb-4'>
            <div className='flex justify-between items-center p-4'>
              <div className='flex'>
                <img height={50} width={50} src="assets/images/logo.png" alt="dá" />
                <div className='ml-4'>
                  <div className='font-bold text-lg'>San bong da ha nam</div>
                  <div className='font-normal text-sm'>Mã đặt lịch: DASDFGFDHDA</div>
                </div>
              </div>
              <div className='font-bold'>Đã xác nhận</div>
              <div className='md:flex md:justify-end'>
                <button className='bg-blue-500 h-7 text-white rounded-md px-2 mr-2'>Chi tiết</button>
                <button className='bg-red-600 h-7 text-white rounded-md px-2 mt-2 sm:mt-0'>Hủy</button>
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
                  <div className="font-bold">Ngày đặt lịch</div>
                  <div>Tue 06 Aug 4:00 PM</div>
                </div>
                <div className='md:text-center'>
                  <div className="font-bold">Giá tiền</div>
                  <div>$100</div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full shadow-3xl mb-4'>
            <div className='flex justify-between items-center p-4'>
              <div className='flex'>
                <img height={50} width={50} src="assets/images/logo.png" alt="dá" />
                <div className='ml-4'>
                  <div className='font-bold text-lg'>San bong da ha nam</div>
                  <div className='font-normal text-sm'>Mã đặt lịch: DASDFGFDHDA</div>
                </div>
              </div>
              <div className='font-bold'>Đã xác nhận</div>
              <div className='md:flex md:justify-end'>
                <button className='bg-blue-500 h-7 text-white rounded-md px-2 mr-2'>Chi tiết</button>
                <button className='bg-red-600 h-7 text-white rounded-md px-2 mt-2 sm:mt-0'>Hủy</button>
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
                  <div className="font-bold">Ngày đặt lịch</div>
                  <div>Tue 06 Aug 4:00 PM</div>
                </div>
                <div className='md:text-center'>
                  <div className="font-bold">Giá tiền</div>
                  <div>$100</div> {/* Thêm giá tiền ở đây */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có muốn xóa lịch hẹn này không ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Có"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Không
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
