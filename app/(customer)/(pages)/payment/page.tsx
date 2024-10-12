'use client'
import { Input } from '@components/index'
import { useAppSelector } from '@hooks/hooks'
import { getCollectVoucher, getVoucher } from '@services/voucherService'
import { getImage } from '@utils/imageOptions'
import { convertNumberToPrice } from '@utils/moneyOptions'
import { Button, Label, Modal, Radio, Rating, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsBackpack4 } from 'react-icons/bs'
import { IoTimeOutline } from 'react-icons/io5'
import { MdOutlineLocationOn } from 'react-icons/md'
import { PiDoorOpenBold } from 'react-icons/pi'
import { TbBasketDiscount } from 'react-icons/tb'
import { TiDelete } from 'react-icons/ti'
import { CollectVoucher, PageResult } from 'types'
import qs from "query-string"
import { createBooking } from '@services/bookingService'

export default function Payment() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { control, handleSubmit, formState: { isSubmitting, isValid }, register } = useForm({ mode: "onTouched", });
  const booking = useAppSelector(state => state.booking.value);
  const user = useAppSelector(state => state.user.value);
  const [collectVouchers, setCollectVouchers] = useState<PageResult<CollectVoucher> | undefined>(undefined);
  const [currentPageSize, setCurrentPageSize] = useState<number>(5);
  const [voucherSelected, setVoucherSelected] = useState<CollectVoucher | null>(null);
  const [score, setScore] = useState<number>(0)
  const [code, setCode] = useState<string>('')
  const [totalPrice, setTotalPrice] = useState<number>(() => {
    if (booking?.totalTime && booking?.courtPrice) {
      return booking.totalTime * booking.courtPrice;
    }
    return 0;
  });

  const [value, setValue] = useState('');

  const url = qs.stringifyUrl({
    url: "", query: {
      "search": "",
      "currentPage": 1,
      "pageSize": currentPageSize,
      "type": 'notused',
    }
  });

  useEffect(() => {
    getCollectVoucher(user?.id, url)
      .then(x => {
        if (x.status === 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy mã giảm giá")
        }
      })
      .then((collectVouchers: PageResult<CollectVoucher>) => setCollectVouchers(collectVouchers))
      .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
  }, [user])

  async function handleSubmitForm(data: FieldValues) {
    createBooking({
      fullName: data.name,
      phone: data.phone,
      email: data.email,
      courtID: booking?.courtID,
      courtPrice: booking?.courtPrice,
      totalPrice: (totalPrice ?? 0) -
        (voucherSelected
          ? (voucherSelected?.percentage / 100) * ((booking?.courtPrice ?? 0) * (booking?.totalTime ?? 0))
          : 0)
        - (score ?? 0),
      userID: user?.id,
      point: score,
      bookingDate: booking?.playDate,
      startTime: booking?.startTime,
      endTime: booking?.endTime,
      collectVoucherID: voucherSelected?.collectVoucherID,
      paymentMethod: data.payment,
    })
      .then(x => {
        if (x.status === 201) {
          window.location.href = x.data
        } else if (x.status === 409) {
          toast.error("Đã có người đặt lịch này rồi. Vui lòng đặt lịch khác")
        } else if (x.status === 400) {
          toast.error("Thanh toán thất bại")
        } else {
          toast.error("Lỗi đặt lịch")
        }
      })
      .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
  }


  const handleScroll = (e: any) => {
    const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    if (bottom) {
      setCurrentPageSize(prev => prev + 5);
    }
  };

  const handlerUseVoucher = (voucher: CollectVoucher) => {
    if (voucher.facilityID !== null && voucher.facilityID !== booking?.facilityID) {
      toast.error("Vui lòng chọn mã giảm giả của cơ sở hoặc công ty Fieldy")
      return;
    }
    const [day, month, year] = voucher.startDate.split('-');
    if (new Date(`${year}-${month}-${day}`) > new Date()) {
      toast.error("Mã giảm giá chưa mở vui lòng thử lại sau")
      return;
    }
    if (voucher.isOutDate) {
      toast.error("Mã giảm giá đã hết hạn")
      return;
    }
    setVoucherSelected(voucher)
    setOpenModal(false);
  }

  const handlerChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handlerChangCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const handlerFindCode = () => {
    getVoucher(user?.id, code)
      .then(x => {
        if (x.status === 200) {
          return x.data
        } else if (x.status === 404) {
          toast.error("Không tìm thấy mã giảm giá")
          return undefined;
        } else {
          toast.error("Lỗi tìm mã giảm giá")
          return undefined;
        }
      }).then((collectVoucher: CollectVoucher) => {
        if (collectVoucher !== undefined) {
          setVoucherSelected(collectVoucher)
        }
      })
      .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
  }

  const handlerUseScore = () => {
    if (!Number.isInteger(Number(value))) {
      toast.error("Vui lòng nhập số");
      return;
    }

    let number = Number.parseInt(value)
    if (number < 0) {
      toast.error("Vui lòng nhập số lớn hơn 0")
      return;
    }

    if (user?.point && number > user.point) {
      toast.error("Vui lòng nhập số không lớn hơn số điểm của bạn")
      return;
    }
    setScore(number);
  }

  return (
    <>
      {booking ? <div className='py-20 mx-5 lg:mx-20 md:mx-10'>
        <form className='grid md:grid-cols-3 lg:md:gap-14 gap-5' onSubmit={handleSubmit(handleSubmitForm)}>
          <div className='sm:col-span-2 grid gap-4'>
            <div className='rounded-2xl border '>
              <div className='border-b-2 p-4'>
                <p className='text-xl font-black'>Thông tin đặt lịch</p>
              </div>
              <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4'>
                <Link target='_blank' href={`facility/${booking.facilityID}`} className='h-48 sm:h-36 lg:mr-10 col-span-1 mb-8 lg:mb-0'>
                  <Image className='w-full h-full rounded-xl' height={500} width={500} src={getImage(booking?.facilityImage) || ''} alt='ảnh cơ sở' />
                </Link>
                <div className='flex flex-col w-full col-span-2'>
                  <div className='flex justify-between'>
                    <p className='text-2xl font-bold'>{booking?.facilityName}</p>
                    <div className='flex items-center text-lg'>
                      <Rating className='mr-2'>
                        <Rating.Star className='h-6 w-6' />
                      </Rating>
                      {booking?.facilityRating}
                    </div>
                  </div>
                  <p className='flex text-sm mt-5'>
                    <PiDoorOpenBold size={20} className='mr-2' />
                    {booking?.facilityTime}
                  </p>
                  <p className='flex text-sm mt-3'>
                    <IoTimeOutline size={20} className='mr-2' />
                    {booking?.facilityOpen} - {booking?.facilityClose}
                  </p>
                  <p className='flex text-sm mt-3'>
                    <MdOutlineLocationOn size={20} className='mr-2' />
                    {booking?.facilityAddress}
                  </p>
                </div>
              </div>
              <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 p-4 gap-4'>
                <div className='bg-[#f5f5f6] rounded-lg p-3'>
                  <p className='font-medium'>Ngày chơi</p>
                  <p className='text-lg font-bold'>{booking?.playDate}</p>
                </div>
                <div className='bg-[#f5f5f6] rounded-lg p-3'>
                  <p className='font-medium'>Thời gian</p>
                  <p className='text-lg font-bold'>{booking?.startTime} - {booking?.endTime}</p>
                </div>
                <div className='bg-[#f5f5f6] rounded-lg p-3'>
                  <p className='font-medium'>Sân</p>
                  <p className='text-lg font-bold'>{booking?.courtName}</p>
                </div>
                <div className='bg-[#f5f5f6] rounded-lg p-3'>
                  <p className='font-medium'>Môn thể thao</p>
                  <p className='text-lg font-bold'>{booking?.sportName}</p>
                </div>
                {booking?.sportName === 'Bóng đá' && (
                  <div className='bg-[#f5f5f6] rounded-lg p-3'>
                    <p className='font-medium'>Loại sân</p>
                    <p className='text-lg font-bold'>Sân {booking?.numberPlayer} người</p>
                  </div>
                )}
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
                    type='text'
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
                  {voucherSelected && (
                    <div className='mb-4 relative group hover:cursor-pointer'>
                      <div className='rounded-lg border'>
                        <div className='grid grid-cols-3 place-items-center gap-2 p-2'>
                          <div className='col-span-1 p-5 w-full rounded-lg bg-gray-700 text-orange-500'>
                            <p className='mb-2 text-base text-center'>Fieldy</p>
                            <TbBasketDiscount className='mx-auto' size={30} />
                          </div>
                          <div className='col-span-2 place-self-start ml-4'>
                            <p className='text-xl font-bold mb-5'>Giảm {voucherSelected.percentage}%</p>
                            <p className='font-bold mb-2'>{voucherSelected.facilityID ? voucherSelected.facilityName : 'Tất cả các sân'}</p>
                            <p className='font-bold mb-2'>{voucherSelected.sportName ? voucherSelected.sportName : 'Tất cả các môn thể thao'}</p>
                            <p className='text-sm'>Ngày bắt đầu: {voucherSelected.startDate}</p>
                            <p className='text-sm'>Ngày hết hạn: {voucherSelected.endDate}</p>
                          </div>
                        </div>
                        <TiDelete onClick={() => setVoucherSelected(null)} size={25} className='text-red-500 absolute -top-1.5 -right-1.5 hidden group-hover:block' />
                      </div>
                    </div>
                  )}
                  <div className='flex items-center mb-5' onClick={() => setOpenModal(true)}>
                    <p className='mr-2 font-medium'>Túi mã giảm giá của bạn</p>
                    <div className='hover:text-slate-500 hover:cursor-pointer relative'>
                      <BsBackpack4 size={25} />
                      <div className='absolute -top-1 -right-1.5 text-xs w-4 leading-4 text-center text-white bg-red-600 rounded-full'>{collectVouchers?.results.length}</div>
                    </div>
                  </div>
                  {/* <p className='mb-2 font-medium'>Nhập mã giảm giá</p>
                  <div className='flex'>
                    <TextInput onChange={handlerChangCode} className='mr-2 w-60' placeholder='Mã giảm giá' type="text" />
                    <Button onClick={handlerFindCode} size='sm' className='mr-2' type='button'>Áp dụng</Button>
                  </div> */}
                </div>
              </div>
              <div className='rounded-2xl border'>
                <div className='border-b-2 p-4'>
                  <p className='text-xl font-black'>Sử dụng điểm</p>
                </div>
                <div className='p-4'>
                  <div className='flex mb-5'>
                    <p className='mr-2 font-medium'>Số điểm hiện tại của bạn: </p>
                    <p>{user?.point}</p>
                  </div>
                  <div className='flex'>
                    <TextInput onChange={handlerChangeScore} className='mr-2 w-60' placeholder='Số điểm' type="text" />
                    <Button onClick={handlerUseScore} size='sm' type='button'>Áp dụng</Button>
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
                    <p>{convertNumberToPrice(booking.courtPrice * booking.totalTime)}</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='mr-2 font-medium'>Mã giảm giá:</p>
                    {voucherSelected ?
                      <p className='text-red-500'>- {convertNumberToPrice((voucherSelected?.percentage / 100) * (booking.courtPrice * booking.totalTime))}</p>
                      : <>0</>}
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='mr-2 font-medium'>Điểm:</p>
                    {score > 0 ?
                      <p className='text-red-500'>- {convertNumberToPrice(score)}</p>
                      : <p>0</p>}
                  </div>
                </div>
                <div className='border-t-2 p-4 flex justify-between items-center'>
                  <p className='mr-2 font-medium'>Tổng tiền:</p>
                  <p className='font-bold'>
                    {convertNumberToPrice(
                      (totalPrice ?? 0) -
                      (voucherSelected
                        ? (voucherSelected?.percentage / 100) * ((booking?.courtPrice ?? 0) * (booking?.totalTime ?? 0))
                        : 0)
                      - (score ?? 0)
                    )}
                  </p>
                </div>
              </div>
              <div className='rounded-2xl border'>
                <div className='border-b-2 p-4'>
                  <p className='text-xl font-black'>Phương thức thanh toán</p>
                </div>
                <div className='p-4'>
                  <fieldset className="flex max-w-md flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Radio {...register("payment")} className='focus:ring-transparent hover:cursor-pointer' id="vnpay" value="vnpay" defaultChecked />
                      <Label className='hover:cursor-pointer' htmlFor="vnpay">Thanh toán bằng</Label>
                      <Image height={80} width={80} src='/assets/images/vnpay.png' alt='vnpay' />
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Radio className='focus:ring-transparent hover:cursor-pointer' id="cash" name="payment" value="cash" />
                      <Label className='hover:cursor-pointer' htmlFor="cash">Thanh toán tiền mặt</Label>
                    </div> */}
                  </fieldset>
                </div>
              </div>
              <Button type='submit'>Thanh toán</Button>
            </div>
          </div>
        </form>
      </div> :
        <div className='grid grid-flow-col py-20'>
          <div className='mx-auto'>
            <Image className='mx-auto' height={350} width={350} src='/assets/images/empty-booking.png' alt='Chưa có đặt lịch hẹn' />
            <div className='text-center mt-7'>
              <p className='text-3xl font-bold'>Bạn chưa có đặt lịch hẹn nào !</p>
              <Button onClick={() => router.push("/booking")} size='sm' className='mt-10 w-48 mx-auto'>
                <p>Quay lại đặt lịch hẹn</p>
              </Button>
            </div>
          </div>
        </div>
      }

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Túi mã giảm giá của bạn</Modal.Header>
        <Modal.Body className='max-h-96 space-y-4' onScroll={handleScroll}>
          {collectVouchers !== undefined && collectVouchers.results.map((collectVoucher: CollectVoucher, index) => (
            <div key={index} className='rounded-lg border p-1'>
              <div className='grid grid-cols-4 place-items-center gap-2 p-2'>
                <div className='col-span-1 p-5 w-full rounded-lg bg-gray-700 text-orange-500'>
                  <p className='mb-2 text-lg text-center'>Fieldy</p>
                  <TbBasketDiscount className='mx-auto' size={35} />
                </div>
                <div className='col-span-2 place-self-start ml-4'>
                  <p className='text-xl font-bold mb-5'>Giảm {collectVoucher.percentage}%</p>
                  <p className='font-bold mb-2'>{collectVoucher.facilityID ? collectVoucher.facilityName : 'Tất cả các sân'}</p>
                  <p className='font-bold mb-2'>{collectVoucher.sportName ? collectVoucher.sportName : 'Tất cả các môn thể thao'}</p>
                  <p>Ngày bắt đầu: {collectVoucher.startDate}</p>
                  <p>Ngày hết hạn: {collectVoucher.endDate}</p>
                </div>
                <div className='col-span-1'>
                  <Button onClick={() => handlerUseVoucher(collectVoucher)} type='button' size={"sm"}>Áp dụng</Button>
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  )
}
