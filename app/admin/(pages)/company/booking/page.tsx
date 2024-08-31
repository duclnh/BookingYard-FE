"use client"
import { CardStatistic, Heading } from '@components/index'
import { Button, Label, Modal, Pagination, Radio, Select, Table, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaEye } from 'react-icons/fa'
import { GrScheduleNew, GrSchedulePlay, GrSchedules } from 'react-icons/gr'
import { IoMdSearch } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri'

export default function Booking() {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [openModalCancel, setOpenModalCancel] = useState(false);
    const { control, handleSubmit, formState: { isSubmitting, isValid }, setValue } = useForm({ mode: "onTouched", });
    const sampleBookings = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            phone: '0123456789',
            court: 'Sân 1',
            sport: 'Cầu lông',
            time: '18:00 - 19:00',
            discountCode: 'GIAM10',
            points: 50,
            playDate: '2024-09-01',
            reason: "đasadasdsadsadsads",
            bookingDate: '2024-08-25',
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@example.com',
            phone: '0987654321',
            court: 'Sân 2',
            sport: 'Tennis',
            time: '19:00 - 20:00',
            discountCode: '',
            points: 100,
            playDate: '2024-09-02',
            reason: "đasadasdsadsadsads",
            bookingDate: '2024-08-26',
        },
        {
            id: 3,
            name: 'Trần Thị B',
            email: 'tranthib@example.com',
            phone: '0987654321',
            court: 'Sân 2',
            sport: 'Tennis',
            time: '19:00 - 20:00',
            discountCode: '',
            points: 100,
            playDate: '2024-09-02',
            reason: "đasadasdsadsadsads",
            bookingDate: '2024-08-26',
        },
        {
            id: 4,
            name: 'Trần Thị B',
            email: 'tranthib@example.com',
            phone: '0987654321',
            court: 'Sân 2',
            sport: 'Tennis',
            time: '19:00 - 20:00',
            discountCode: '',
            points: 100,
            playDate: '2024-09-02',
            reason: "đasadasdsadsadsads",
            bookingDate: '2024-08-26',
        },
        // Thêm các mục khác nếu cần
    ];
    return (
        <>
            <div className='py-5 w-full'>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Danh sách đặt lịch' center />
                <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
                    <CardStatistic
                        title='Tổng số đặt lịch'
                        amount={3000}
                        icon={GrSchedules}
                        gradientFrom='from-cyan-700'
                        gradientTo='to-cyan-500'
                        iconColor='text-cyan-700'
                    />
                    <CardStatistic
                        title='Đã thanh toán'
                        amount={3300}
                        icon={GrSchedulePlay}
                        gradientFrom='from-green-700'
                        gradientTo='to-green-500'
                        iconColor='text-green-700'
                    />
                    <CardStatistic
                        title='Đã Hủy'
                        amount={3300}
                        icon={GrScheduleNew}
                        gradientFrom='from-red-700'
                        gradientTo='to-red-500'
                        iconColor='text-red-700'
                    />
                </div>
                <div className='flex justify-center'>
                    <input className='border rounded-md px-3 sm:w-96 w-80' name='search' placeholder={'Tìm tên sân, người đặt'} />
                    <Button className='p-1'>
                        <IoMdSearch className='font-bold' size={18} />
                    </Button>
                </div>
                <div className='mt-20 bg-white'>
                    <div className='mt-10 flex justify-between mb-3'>
                        <div className='grid grid-cols-2 gap-2'>
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
                            <Controller
                                name='type'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Select
                                            {...field}
                                            className='focus:ring-transparent'
                                            id="sport"
                                        >
                                            <option value="">Tất cả</option>
                                            <option value="">Ngày</option>
                                            <option value="">Tuần</option>
                                            <option value="">Tháng</option>
                                            <option value="">Năm</option>

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
                        <Select className='ml-2'>
                            <option value="">Tất cả</option>
                            <option value="">Đã thanh toán</option>
                            <option value="">Đã hủy</option>
                        </Select>
                    </div>
                    <div className="border rounded-lg min-w-full max-w-[390px] overflow-x-auto">
                        <Table hoverable>
                            <Table.Head className='text-center'>
                                <Table.HeadCell>STT</Table.HeadCell>
                                <Table.HeadCell className='min-w-40'>Tên người đặt</Table.HeadCell>
                                {/* <Table.HeadCell className='min-w-32'>Email</Table.HeadCell> */}
                                {/* <Table.HeadCell className='min-w-40'>Số điện thoại</Table.HeadCell> */}
                                <Table.HeadCell className='min-w-32'>Cơ sở</Table.HeadCell>
                                <Table.HeadCell className='min-w-40'>Môn thể thao</Table.HeadCell>
                                {/* <Table.HeadCell className='min-w-32'>Giờ chơi</Table.HeadCell> */}
                                {/* <Table.HeadCell className='min-w-32'>Số giờ</Table.HeadCell> */}
                                {/* <Table.HeadCell className='min-w-32'>Mã giảm giá</Table.HeadCell> */}
                                {/* <Table.HeadCell className='min-w-32'>Số điểm</Table.HeadCell> */}
                                {/* <Table.HeadCell className='min-w-32'>Ngày chơi</Table.HeadCell> */}
                                <Table.HeadCell className='min-w-32'>Giá tiền</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Trạng thái</Table.HeadCell>
                                {/* <Table.HeadCell className='min-w-32'>Thanh toán</Table.HeadCell> */}
                                {/* <Table.HeadCell className='min-w-32'>Lý do hủy</Table.HeadCell> */}
                                <Table.HeadCell className='min-w-32'>Ngày đặt</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {sampleBookings.map((item, index) => (
                                    <Table.Row className='text-center' key={item.id}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell className='font-bold text-left'>{item.name}</Table.Cell>
                                        {/* <Table.Cell>{item.email}</Table.Cell> */}
                                        {/* <Table.Cell>{item.phone}</Table.Cell> */}
                                        <Table.Cell>{item.court}</Table.Cell>
                                        <Table.Cell>{item.sport}</Table.Cell>
                                        {/* <Table.Cell>{item.time}</Table.Cell> */}
                                        {/* <Table.Cell>{item.discountCode}</Table.Cell>
                                        <Table.Cell>{item.points}</Table.Cell> */}
                                        {/* <Table.Cell>{item.playDate}</Table.Cell> */}
                                        <Table.Cell className='font-bold'>40.000</Table.Cell>
                                        <Table.Cell>
                                            <p className='bg-green-200 text-green-500 p-1 rounded-md text-center font-bold'>
                                                Đã thanh toán
                                            </p>
                                        </Table.Cell>
                                        {/* <Table.Cell>VNPAY</Table.Cell> */}
                                        {/* <Table.Cell>{item.reason}</Table.Cell> */}
                                        <Table.Cell>{item.bookingDate}</Table.Cell>
                                        <Table.Cell className='flex space-x-2 justify-center'>
                                            <Button size='xs'>
                                                <FaEye size={16} />
                                            </Button>
                                            <Button color='failure' type='submit' size='xs'>
                                                <RiDeleteBinLine size={16} />
                                            </Button>
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
                                Có
                            </Button>
                            <Button size='md' color="gray" onClick={() => setOpenModalCancel(false)}>
                                Không
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
