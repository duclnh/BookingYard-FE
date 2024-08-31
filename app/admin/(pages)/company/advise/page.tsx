"use client"
import { CardStatistic, Heading } from '@components/index'
import { Button, Label, Modal, Pagination, Select, Table, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaPencil } from 'react-icons/fa6'
import { IoMdSearch } from 'react-icons/io'
import { MdHeadsetMic, MdHeadsetOff } from 'react-icons/md'
import { PiHeadCircuitBold } from 'react-icons/pi'

export default function Advice() {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
    return (
        <>
            <div className='py-5 w-full'>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Liên hệ từ khách hàng' center />
                <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
                    <CardStatistic
                        title='Tổng số liên hệ'
                        amount={3000}
                        icon={PiHeadCircuitBold}
                        gradientFrom='from-cyan-700'
                        gradientTo='to-cyan-500'
                        iconColor='text-cyan-700'
                    />
                    <CardStatistic
                        title='Đã liên hệ'
                        amount={3300}
                        icon={MdHeadsetMic}
                        gradientFrom='from-green-700'
                        gradientTo='to-green-500'
                        iconColor='text-green-700'
                    />
                    <CardStatistic
                        title='Chưa liên hệ'
                        amount={3300}
                        icon={MdHeadsetOff}
                        gradientFrom='from-red-700'
                        gradientTo='to-red-500'
                        iconColor='text-red-700'
                    />
                </div>
                <div className='mt-36 bg-white'>
                    <div className='mt-10 sm:flex justify-between mb-3'>
                        <div className='flex'>
                            <input className='border rounded-md px-3 sm:w-96 w-full' name='search' placeholder={'Tìm kiếm theo tên sân'} />
                            <Button className='p-1'>
                                <IoMdSearch className='font-bold' size={18} />
                            </Button>
                        </div>
                        <Select className='mt-3 md:mt-0'>
                            <option value="">Trạng thái</option>
                            <option value="">Đã xử lý</option>
                            <option value="">Chưa xử lý</option>
                        </Select>
                    </div>
                    <div className="border rounded-lg min-w-full max-w-[390px] overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>STT</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Họ và tên</Table.HeadCell>
                                {/* <Table.HeadCell className='min-w-72'>Email</Table.HeadCell> */}
                                <Table.HeadCell className='min-w-32'>Số điện thoại</Table.HeadCell>
                                <Table.HeadCell className='min-w-48'>Nội dung</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Loại</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Trạng thái</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Ngày tạo</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>1</Table.Cell>
                                    <Table.Cell>nguyen van a</Table.Cell>
                                    <Table.Cell>0987654321</Table.Cell>
                                    <Table.Cell>Yêu cầu hỗ trợ đăng nhập</Table.Cell>
                                    <Table.Cell>Hỗ trợ kỹ thuật</Table.Cell>
                                    <Table.Cell>Đang xử lý</Table.Cell>
                                    <Table.Cell>26/08/2024</Table.Cell>
                                    <Table.Cell>
                                        <Button onClick={() => setOpenModalUpdate(true)} color='warning' type='submit' size='xs'>
                                            <FaPencil size={16} />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>

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
            {/* Start Update */}
            <Modal show={openModalUpdate} size="md" onClose={() => setOpenModalUpdate(false)} popup>
                <Modal.Header>
                    <p className='text-lg ml-4'>Cập nhật thông tin</p>
                </Modal.Header>
                <Modal.Body>
                    <form className="mt-5">
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="comment" value="Ghi chú" />
                            <Textarea
                                className='mb-5 mt-2 focus:ring-black focus:border-black'
                                id="comment"
                                placeholder="Nội dung..."
                                rows={4}
                            />
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button type='submit' size='md' color="info">
                                Cập nhật
                            </Button>
                            <Button size='md' color="gray" onClick={() => setOpenModalUpdate(false)}>
                                Không
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {/* End Report */}
        </>
    )
}
