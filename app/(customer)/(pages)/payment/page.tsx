'use client'
import { Input } from '@components/index'
import { Button, Label, Modal, Radio, Rating, TextInput } from 'flowbite-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { BsBackpack4 } from 'react-icons/bs'
import { FaArrowLeft } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbBasketDiscount } from 'react-icons/tb'
import { TiDelete } from 'react-icons/ti'

export default function Payment() {
  const [openModal, setOpenModal] = useState(false);
  const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
  async function handleSubmitForm(data: FieldValues) {

  }
  return (
    <>
      <div className='py-20 mx-5 lg:mx-20 md:mx-10'>
        <form className='grid md:grid-cols-3 lg:md:gap-14 gap-5' onSubmit={handleSubmit(handleSubmitForm)}>
          <div className='sm:col-span-2 grid gap-4'>
            <div className='rounded-2xl border '>
              <div className='border-b-2 p-4'>
                <p className='text-xl font-black'>Thông tin đặt lịch</p>
              </div>
              <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4'>
                <div className='h-48  sm:h-36 lg:mr-10 col-span-1 mb-8 lg:mb-0'>
                  <Image className='w-full h-full rounded-xl' height={500} width={500} src='/assets/images/slide1.png' alt='img' />
                </div>
                <div className='flex flex-col w-full col-span-2'>
                  <div className='flex justify-between'>
                    <p className='text-2xl font-bold'>Sân động hòa an</p>
                    <div className='flex items-center text-lg'>
                      <Rating className='mr-2'>
                        <Rating.Star className='h-6 w-6' />
                      </Rating>
                      4.5
                    </div>
                  </div>
                  <p className='flex text-sm mt-3'>
                    <IoTimeOutline size={20} className='mr-2' />
                    8:00 - 22:00
                  </p>
                  <p className='flex text-sm mt-3'>
                    <MdOutlineLocationOn size={20} className='mr-2' />
                    146 Nam Hòa, phường Phước Long A, TP. Thủ Đức
                  </p>
                </div>
              </div>
              <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 p-4 gap-4'>
                <div className='bg-[#f5f5f6] rounded-lg p-3'>
                  <p className='font-medium'>Ngày chơi</p>
                  <p className='text-lg font-bold'>23-01-2002</p>
                </div>
                <div className='bg-[#f5f5f6] rounded-lg p-3'>
                  <p className='font-medium'>Thời gian</p>
                  <p className='text-lg font-bold'>8:00 - 9:00</p>
                </div>
                <div className='bg-[#f5f5f6] rounded-lg p-3'>
                  <p className='font-medium'>Sân</p>
                  <p className='text-lg font-bold'>Sân 5</p>
                </div>
                <div className='bg-[#f5f5f6] rounded-lg p-3'>
                  <p className='font-medium'>Môn thể thao</p>
                  <p className='text-lg font-bold'>Bóng đá</p>
                </div>
                <div className='bg-[#f5f5f6] rounded-lg p-3'>
                  <p className='font-medium'>Loại sân</p>
                  <p className='text-lg font-bold'>Sân 7 người</p>
                </div>
              </div>
            </div>
            <div className='rounded-2xl border'>
              <div className='border-b-2 p-4'>
                <p className='text-xl font-black'>Thông tin khách hàng</p>
              </div>
              <div className='p-4'>
                <div className='mb-3'>
                  <Input
                    label='Họ Tên (*)'
                    type='text'
                    name='name'
                    control={control}
                    rules={{
                      required: "Vui lòng nhập họ và tên",
                    }}
                  />
                </div>
                <div className='grid grid-cols-2 gap-10'>
                  <Input
                    label='Email (*)'
                    type='email'
                    name='email'
                    control={control}
                    rules={{
                      required: "Vui lòng nhập email",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email không hợp lệ",
                      },
                    }}
                  />
                  <Input
                    label='Số Điện Thoại (*)'
                    type='txt'
                    name='phone'
                    control={control}
                    rules={{
                      required: "Vui lòng nhập số điện thoại", pattern: {
                        value: /^0\d{9,11}$/,
                        message: "Số điện thoại không hợp lệ. Bắt đầu số 0 và có 10 hoặc 12 chữ số.",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='sm:col-span-1'>
            <div className='grid gap-4'>
              <div className='rounded-2xl border w-full'>
                <div className='border-b-2 p-4'>
                  <p className='text-xl font-black'>Mã giảm giá</p>
                </div>
                <div className='p-4'>
                  <div className='mb-4 relative group hover:cursor-pointer'>
                    <div className='rounded-lg border'>
                      <div className='grid grid-cols-3 place-items-center gap-2 p-2'>
                        <div className='col-span-1 p-5 w-full rounded-lg bg-gray-700 text-orange-500'>
                          <p className='mb-2 text-base text-center'>Fieldy</p>
                          <TbBasketDiscount className='mx-auto' size={30} />
                        </div>
                        <div className='col-span-2 place-self-start ml-4'>
                          <p className='text-xl font-bold mb-5'>Giảm 10%</p>
                          <p className='text-sm'>Ngày bắt đầu: 10/08/2024</p>
                          <p className='text-sm'>Ngày hết hạn 20/08/2024</p>
                        </div>
                      </div>
                      <TiDelete size={25} className='text-red-500 absolute top-0 right-0 hidden group-hover:block' />
                    </div>
                  </div>
                  <div className='flex items-center mb-5' onClick={() => setOpenModal(true)}>
                    <p className='mr-2 font-medium'>Túi mã giảm giá của bạn</p>
                    <div className='hover:text-slate-500 hover:cursor-pointer relative'>
                      <BsBackpack4 size={25} />
                      <div className='absolute -top-1 -right-1.5 text-xs w-4 leading-4 text-center text-white bg-red-600 rounded-full'>5</div>
                    </div>
                  </div>
                  <p className='mb-2 font-medium'>Nhập mã giảm giá</p>
                  <div className='flex'>
                    <TextInput className='mr-2 w-60' placeholder='Mã giảm giá' type="text" />
                    <Button size='sm' className='mr-2' type='button'>Áp dụng</Button>
                  </div>
                </div>
              </div>
              <div className='rounded-2xl border'>
                <div className='border-b-2 p-4'>
                  <p className='text-xl font-black'>Sử dụng điểm</p>
                </div>
                <div className='p-4'>
                  <div className='flex mb-5'>
                    <p className='mr-2 font-medium'>Số điểm hiện tại của bạn: </p>
                    <p>300</p>
                  </div>
                  <div className='flex'>
                    <TextInput className='mr-2 w-60' placeholder='Số điểm' type="text" />
                    <Button size='sm' type='button'>Áp dụng</Button>
                  </div>
                </div>
              </div>
              <div className='rounded-2xl border'>
                <div className='border-b-2 p-4'>
                  <p className='text-xl font-black'>Tổng tiền thanh toán</p>
                </div>
                <div className='p-4'>
                  <div className='flex justify-between items-center'>
                    <p className='mr-2 font-medium'>Giá tiền:</p>
                    <p>{'60.000'}</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='mr-2 font-medium'>Mã giảm giá:</p>
                    <p>{'-4.000'}</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='mr-2 font-medium'>Điểm:</p>
                    <p>{'-2.000'}</p>
                  </div>
                </div>
                <div className='border-t-2 p-4 flex justify-between items-center'>
                  <p className='mr-2 font-medium'>Tổng tiền:</p>
                  <p>{'54.000'}</p>
                </div>
              </div>
              <div className='rounded-2xl border'>
                <div className='border-b-2 p-4'>
                  <p className='text-xl font-black'>Phương thức thanh toán</p>
                </div>
                <div className='p-4'>
                  <fieldset className="flex max-w-md flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Radio className='focus:ring-transparent hover:cursor-pointer' id="vnpay" name="payment" value="vnpay" defaultChecked />
                      <Label className='hover:cursor-pointer' htmlFor="vnpay">Thanh toán bằng</Label>
                      <Image height={80} width={80} src='/assets/images/vnpay.png' alt='vnpay' />
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio className='focus:ring-transparent hover:cursor-pointer' id="cash" name="payment" value="cash" />
                      <Label className='hover:cursor-pointer' htmlFor="cash">Thanh toán tiền mặt</Label>
                    </div>
                  </fieldset>
                </div>
              </div>
              <Button type='submit'>Thanh toán</Button>
            </div>
          </div>
        </form>
      </div>
      <div className='grid grid-flow-col py-20'>
        <div className='mx-auto'>
          <Image className='mx-auto' height={350} width={350} src='/assets/images/empty-booking.png' alt='Chưa có đặt lịch hẹn' />
          <div className='text-center mt-7'>
            <p className='text-3xl font-bold'>Bạn chưa có đặt lịch hẹn nào !</p>
            <Button href='/booking' size='sm' className='mt-10 w-48 mx-auto'>
              <FaArrowLeft className='mr-2 mt-0.5' size={16} />
              <p>Quay lại đặt lịch hẹn</p>
            </Button>
          </div>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Túi mã giảm giá của bạn</Modal.Header>
        <Modal.Body className='max-h-96 space-y-4'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='rounded-lg border'>
              <div className='grid grid-cols-4 place-items-center gap-2 p-2'>
                <div className='col-span-1 p-5 w-full rounded-lg bg-gray-700 text-orange-500'>
                  <p className='mb-2 text-lg text-center'>Fieldy</p>
                  <TbBasketDiscount className='mx-auto' size={35} />
                </div>
                <div className='col-span-2 place-self-start ml-4'>
                  <p className='text-xl font-bold mb-5'>Giảm 10%</p>
                  <p>Ngày bắt đầu: 10/08/2024</p>
                  <p>Ngày hết hạn 20/08/2024</p>
                </div>
                <div className='col-span-1'>
                  <Button type='button' className=''>Áp dụng</Button>
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  )
}
