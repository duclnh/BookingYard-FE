"use client"
import { CardStatistic, Heading, ModalView } from '@components/index'
import { useAppSelector } from '@hooks/hooks'
import { cancelBooking, getBookingFacility } from '@services/index'
import { Button, Label, Modal, Pagination, Popover, Radio, Select, Spinner, Table, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { FaEye, FaImage, FaRegMoneyBillAlt, FaRegUser } from 'react-icons/fa'
import { FaPeopleRobbery } from 'react-icons/fa6'
import { IoIosTimer, IoMdSearch } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri'
import qs from "query-string";
import toast from 'react-hot-toast'
import { BookingDetail, PageResult } from 'types'
import { convertNumberToPrice } from '@utils/moneyOptions'
import { CgScan } from 'react-icons/cg'
import { PiCourtBasketballLight } from 'react-icons/pi'
import { BsPeople } from 'react-icons/bs'
import { IoPhonePortraitOutline, IoWalletOutline } from 'react-icons/io5'
import { GiReceiveMoney } from 'react-icons/gi'
import { TbBasketDiscount, TbClockCancel, TbStatusChange } from 'react-icons/tb'
import { MdOutlineDateRange, MdOutlinePriceCheck } from 'react-icons/md'
import { FiUserCheck } from 'react-icons/fi'
import { BiSolidDiscount } from 'react-icons/bi'
import Image from 'next/image'
import { getImage } from '@utils/index'

export default function Booking() {
    const user = useAppSelector(state => state.manager.value);
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [openModalCancel, setOpenModalCancel] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const { control, handleSubmit, reset, formState: { isSubmitting, isValid }, setValue, register } = useForm({ mode: "onTouched", });
    const [bookings, setBookings] = useState<PageResult<BookingDetail> | undefined>(undefined)
    const [change, setChange] = useState<boolean>(false);
    const [bookingDetail, setBookingDetail] = useState<BookingDetail | undefined>(undefined)
    const [modalImage, setModalImage] = useState(false);
    const [image, setImage] = useState<string | undefined>(undefined);
    const url = qs.stringifyUrl({
        url: "", query: {
            "search": "",
            "currentPage": currentPage,
            "pageSize": 10,
        }
    });

    useEffect(() => {
        getBookingFacility(user?.facilityID, url)
            .then(x => {
                if (x.status === 200) {
                    return x.data
                } else {
                    toast.error("Lỗi lấy thông tin đặt lịch")
                }
            })
            .then((bookings: PageResult<BookingDetail>) => setBookings(bookings))
            .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
    }, [change])

    const handlerCancelBooking = (data: FieldValues) => {
        if (data.otherReason === '' && data.reasons === null) {
            toast.error('Vui lòng nhập nội dung hủy')
            return;
        }
        cancelBooking({
            bookingID: data.bookingID,
            reason: data.otherReason !== '' ? data.otherReason : data.reasons
        })
            .then(x => {
                if (x.status === 200) {
                    toast.success(`Huỷ đặt lịch ${data.codeBooking} thành công`)
                    setOpenModalCancel(false)
                    setChange(!change)
                } else {
                    toast.error(`Huỷ đặt lịch ${data.codeBooking} thất bại`)
                }
            })
            .catch(() => toast.error('Lỗi hệ thống vui lòng thử lại'))
    }
    return (
        <>
            <div className='py-5 w-full'>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Danh sách đặt lịch' center />
                <div className='flex justify-center'>
                    <input className='border rounded-md px-3 sm:w-96 w-80' name='search' placeholder={'Tìm tên sân, người đặt'} />
                    <Button className='p-1'>
                        <IoMdSearch className='font-bold' size={18} />
                    </Button>
                </div>
                <div className='mt-20'>
                    <div className='mt-10 flex justify-between mb-3'>
                        <div className='grid grid-cols-2 space-x-2'>
                            <Controller
                                name='sport'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Select
                                            {...field}
                                            className='focus:ring-transparent'
                                            id="sport"
                                        >
                                            <option value="">Môn thể thao</option>
                                            <option value="">Bóng đá</option>
                                            <option value="">Bóng chuyền</option>
                                        </Select>
                                        {fieldState.error && (
                                            <div className="text-red-500 text-sm mt-2">
                                                {fieldState.error.message}
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <Select className=''>
                            <option value="">Tất cả</option>
                            <option value="">Chưa thanh toán</option>
                            <option value="">Đã hủy</option>
                        </Select>
                    </div>
                    <div className="border rounded-lg min-w-full max-w-[390px] overflow-x-auto">
                        <Table hoverable bgcolor='white'>
                            <Table.Head className='text-center'>
                                <Table.HeadCell>Mã đặt lịch</Table.HeadCell>
                                <Table.HeadCell className='min-w-40'>Tên người đặt</Table.HeadCell>
                                {/* <Table.HeadCell className='min-w-32'>Email</Table.HeadCell>
                                <Table.HeadCell className='min-w-40'>Số điện thoại</Table.HeadCell> */}
                                <Table.HeadCell className='min-w-32'>Sân</Table.HeadCell>
                                {/* <Table.HeadCell className='min-w-40'>Môn thể thao</Table.HeadCell> */}
                                <Table.HeadCell className='min-w-32'>Giờ chơi</Table.HeadCell>
                                {/* <Table.HeadCell className='min-w-32'>Mã giảm giá</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Số điểm</Table.HeadCell> */}
                                <Table.HeadCell className='min-w-32'>Ngày chơi</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Giá tiền</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Trạng thái</Table.HeadCell>
                                {/* <Table.HeadCell className='min-w-32'>Thanh toán</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Lý do hủy</Table.HeadCell> */}
                                {/* <Table.HeadCell className='min-w-32'>Ngày đặt</Table.HeadCell> */}
                                <Table.HeadCell className='min-w-32'>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {bookings !== undefined && bookings.results.map((item: BookingDetail, index) => (
                                    <Table.Row className='text-center' key={item.bookingID}>
                                        <Table.Cell>{item.paymentCode}</Table.Cell>
                                        <Table.Cell className='font-bold text-left'>{item.bookingName}</Table.Cell>
                                        {/* <Table.Cell>{item.email}</Table.Cell>
                                        <Table.Cell>{item.phone}</Table.Cell> */}
                                        <Table.Cell>{item.courtName}</Table.Cell>
                                        {/* <Table.Cell>{item.sport}</Table.Cell> */}
                                        <Table.Cell>{item.startTime}-{item.endTime}</Table.Cell>
                                        {/* <Table.Cell>{item.discountCode}</Table.Cell>
                                        <Table.Cell>{item.points}</Table.Cell> */}
                                        <Table.Cell>{item.playDate}</Table.Cell>
                                        <Table.Cell className='font-bold'>{convertNumberToPrice(item.ownerPrice)}</Table.Cell>
                                        <Table.Cell>
                                            {item.isDeleted ? <p className='bg-red-200 text-red-500 p-1 rounded-md text-center font-bold'>
                                                Đã hủy
                                            </p> : item.paymentStatus ? <p className='bg-green-200 text-green-500 p-1 rounded-md text-center font-bold'>
                                                Đã thanh toán
                                            </p> : <p className='bg-yellow-200 text-yellow  -500 p-1 rounded-md text-center font-bold'>
                                                Chưa thanh toán
                                            </p>}
                                        </Table.Cell>
                                        {/* <Table.Cell>VNPAY</Table.Cell>
                                        <Table.Cell>{item.reason}</Table.Cell> */}
                                        {/* <Table.Cell>{item.bookingDate}</Table.Cell> */}
                                        <Table.Cell className='flex space-x-2'>
                                            <Button onClick={() => {
                                                setImage(item.courtImage)
                                                setBookingDetail(item)
                                                setOpenModalDetail(true)
                                            }} size='xs'>
                                                <FaEye size={16} />
                                            </Button>
                                            {!item.isDeleted && (
                                                <Button onClick={() => {
                                                    setValue("bookingID", item.bookingID)
                                                    setValue("codeBooking", item.paymentCode)
                                                    setOpenModalCancel(true)
                                                }
                                                } color='failure' type='submit' size='xs'>
                                                    <RiDeleteBinLine size={16} />
                                                </Button>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                    <div className="flex justify-end">
                        <Pagination
                            layout="pagination"
                            currentPage={currentPage}
                            totalPages={bookings?.totalPages || 0}
                            onPageChange={onPageChange}
                            previousLabel=""
                            nextLabel=""
                            showIcons
                        />
                    </div>
                </div>
            </div>
            <Modal className='z-10' key={"detail"} show={openModalDetail} size="3xl" onClose={() => setOpenModalDetail(false)} popup>
                <Modal.Header className='border-b-2'>
                    <p className='text-lg ml-4'>Chi tiết đặt lịch</p>
                </Modal.Header>
                <Modal.Body>
                    <div className='grid lg:grid-cols-2 lg:gap-16'>
                        <div>
                            <div className='flex items-center mt-4'>
                                <CgScan size={25} className='mr-2' />
                                <div className='w-full'>
                                    <div className='float-start'>Mã đặt lịch:</div>
                                    <div className='float-end font-medium'>{bookingDetail?.paymentCode}</div>
                                </div>
                            </div>
                            <div className='flex items-center mt-4 hover:cursor-pointer'>
                                <PiCourtBasketballLight size={25} className='mr-2' />
                                <div className='w-full'>
                                    <div className='float-start'>Sân:</div>

                                    <Popover
                                        aria-labelledby="image-popover"
                                        trigger='hover'
                                        content={<>
                                            <div className='flex justify-center mx-auto space-x-5 mt-3 p-3'>
                                                <FaImage onClick={() => setModalImage(true)
                                                } size={18} />
                                                {/* <TbView360Number onClick={() => setModal360(true)
                        } size={18} /> */}
                                            </div>
                                        </>} >
                                        <div className='float-end font-medium'>{bookingDetail?.courtName}</div>
                                    </Popover>
                                </div>
                            </div>
                            {bookingDetail?.sportName === 'Bóng đá' && (
                                <div className='flex items-center mt-4'>
                                    <BsPeople size={25} className='mr-2' />
                                    <div className='w-full'>
                                        <div className='float-start'>Loại sân:</div>
                                        <div className='float-end font-medium'>Sân {bookingDetail.numberPlayer} người</div>
                                    </div>
                                </div>
                            )}
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

                            {/* {bookingDetail?.usedPoint !== undefined && (
                                <div className='flex items-center mt-4'>
                                    <SiSecurityscorecard size={23} className='mr-2' />
                                    <div className='w-full'>
                                        <div className='float-start'>Điểm đã sử dụng:</div>
                                        <div className='flex justify-end'>
                                            <div className='float-end font-medium'>{bookingDetail?.usedPoint} điểm</div>
                                        </div>
                                    </div>
                                </div>
                            )} */}

                            {bookingDetail?.voucherID && (
                                <div className='flex items-center mt-4'>
                                    <BiSolidDiscount size={25} className='mr-2' />
                                    <div className='w-full'>
                                        <div className='float-start'>Mã giảm giá:</div>
                                        <Popover
                                            aria-labelledby="voucher-popover"
                                            trigger='hover'
                                            content={
                                                <div className='rounded-lg border'>
                                                    <div className='grid grid-cols-3 place-items-center gap-2 p-2'>
                                                        <div className='col-span-0.5 p-5 w-full rounded-lg bg-gray-700 text-orange-500'>
                                                            <p className='mb-2 text-lg text-center'>Fieldy</p>
                                                            <TbBasketDiscount className='mx-auto' size={35} />
                                                        </div>
                                                        <div className='col-span-2 place-self-start ml-4'>
                                                            <p className='text-xl font-bold mb-2'>{`Giảm ${bookingDetail.percentage}% ${bookingDetail.voucherName}`}</p>
                                                            {bookingDetail.facilityName !== null ? <p className='font-semibold'>{bookingDetail.facilityName}</p> : <p className='font-semibold'>Tất cả các sân</p>}
                                                            <p className='font-semibold'>{bookingDetail.sportName ? bookingDetail.sportName : 'Tất cả môn thể thao'}</p>
                                                            <p>Ngày bắt đầu: {bookingDetail.voucherStartDate}</p>
                                                            <p>Ngày hết hạn {bookingDetail.voucherEndDate}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <div className='float-end font-medium hover:cursor-pointer'>{bookingDetail?.voucherCode} {`Giảm ${bookingDetail.percentage}%`}</div>
                                        </Popover>
                                    </div>
                                </div>
                            )}
                            <div className='flex items-center mt-4'>
                                <FaRegMoneyBillAlt size={25} className='mr-2' />
                                <div className='w-full'>
                                    <div className='float-start'>Số tiền nhận được:</div>
                                    <div className='float-end font-medium text-lg'>{convertNumberToPrice(bookingDetail?.ownerPrice || 0)}</div>
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
                </Modal.Body>
            </Modal>
            <Modal className='z-10' key={"cancel"} show={openModalCancel} size="md" onClose={() => setOpenModalCancel(false)} popup>
                <Modal.Header>
                    <p className='text-lg'>Bạn có muốn xóa lịch này không ?</p>
                </Modal.Header>
                <Modal.Body>
                    <form method='POST' className="mt-5" onSubmit={handleSubmit(handlerCancelBooking)}>
                        <fieldset className="flex max-w-md flex-col gap-4">
                            <legend className="mb-8 text-center font-bold">Chọn lý do hủy</legend>
                            <div className="flex items-center gap-2">
                                <Radio onInput={() => setValue('otherReason', '')} {...register("reasons")} className='checked:!ring-transparent' id="reason1" value="Đổi giờ chơi" />
                                <Label htmlFor="reason1">Đổi giờ chơi</Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Radio onInput={() => setValue('otherReason', '')} {...register("reasons")} className='checked:!ring-transparent' id="reason2" value="Bận không đi được" />
                                <Label htmlFor="reason2">Trùng lịch</Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Radio onInput={() => setValue('otherReason', '')} {...register("reasons")} className='checked:!ring-transparent' id="reason3" value="Lý do cá nhân" />
                                <Label htmlFor="reason3">Sân đóng cửa</Label>
                            </div>
                        </fieldset>
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="other" value="Lý do khác" />
                        </div>
                        <Textarea onInput={() => setValue("reasons", '')} {...register("otherReason")} className='mb-5' id="other" placeholder="Nội dung..." rows={4} />
                        <div className="flex justify-center gap-4">
                            <Button disabled={isSubmitting} size='md' type='submit' color="failure">
                                {isSubmitting ? <Spinner /> : "Có"}
                            </Button>
                            <Button size='md' color="gray" onClick={() => {
                                setOpenModalCancel(false)
                                reset()
                            }}>
                                Không
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {/*Start view Image */}
            <ModalView key={'View Images'} toggle={modalImage} setToggle={setModalImage}>
                <div className='rounded-lg shadow dark:bg-gray-700 w-[100%] h-[100%]'>
                    {image !== undefined && (
                        <div className='mb-5'>
                            <Image
                                height={600}
                                width={1100}
                                quality={100}
                                className='select-none w-full max-h-[775px]'
                                src={getImage(image) || "/assets/images/slide1.png"}
                                alt='Slide'
                            />
                        </div>
                    )}
                </div>
            </ModalView>
            {/*End view Image */}
        </>
    )
}
