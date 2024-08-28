"use client"
import { CardStatistic, Heading } from '@components/index'
import { Button, Modal, Pagination, Select, Table } from 'flowbite-react'
import React, { useState } from 'react'
import { BsBuilding } from 'react-icons/bs'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline, IoMdSearch } from 'react-icons/io';

export default function Package() {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [openModalCancel, setOpenModalCancel] = useState(false);
    return (
        <>
            <div className='py-5 w-full'>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Danh sách gói đăng kí sân' center />
                <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
                    {[...Array(5)].map((_, index) => (
                        <CardStatistic
                            key={index}
                            title='Gói'
                            amount={3000}
                            icon={BsBuilding}
                            gradientFrom='from-cyan-700'
                            gradientTo='to-cyan-500'
                            iconColor='text-cyan-700'
                        >
                            <div className='flex items-center justify-between'>
                                <p className='mr-3'>Đã sử dụng: </p>
                                <p className='font-bold'>2000</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='mr-3'>Đang sử dụng: </p>
                                <p className='font-bold'>200</p>
                            </div>
                        </CardStatistic>
                    ))}
                </div>
                <div className='mt-36 bg-white'>
                    <div className='mt-10 sm:flex justify-between mb-3'>
                        <div className='flex'>
                            <input className='border rounded-md px-3 sm:w-96 w-80' name='search' placeholder={'Tìm tên gói, loại gói, nội dung'} />
                            <Button className='p-1'>
                                <IoMdSearch className='font-bold' size={18} />
                            </Button>
                        </div>
                        <Select className=''>
                            <option value="">Tất cả</option>
                            <option value="">Đang hoạt động</option>
                            <option value="">Đã ngưng hoạt động</option>
                        </Select>
                    </div>
                    <div className="border min-w-full max-w-[1000px] overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>STT</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Tên gói</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Loại gói</Table.HeadCell>
                                <Table.HeadCell className='min-w-36'>Giá tiền</Table.HeadCell>
                                <Table.HeadCell className='min-w-72'>Nội dung</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Trạng thái</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Ngày tạo</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {[...Array(5)].map((_, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>1</Table.Cell>
                                        <Table.Cell>Gói {index}</Table.Cell>
                                        <Table.Cell>Basic</Table.Cell>
                                        <Table.Cell>$10</Table.Cell>
                                        <Table.Cell>
                                            <div className='flex mb-5'>
                                                <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20} />
                                                <div className='ml-3'>Nhận tư vấn miễn phí</div>
                                            </div>
                                            <div className='flex mb-5'>
                                                <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20} />
                                                <div className='ml-3'>Nhận tư vấn miễn phí</div>
                                            </div>
                                            <div className='flex mb-5'>
                                                <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20} />
                                                <div className='ml-3'>Nhận tư vấn miễn phí</div>
                                            </div>
                                            <div className='flex mb-5'>
                                                <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20} />
                                                <div className='ml-3'>Nhận tư vấn miễn phí</div>
                                            </div>
                                            <div className='flex mb-5'>
                                                <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20} />
                                                <div className='ml-3'>Nhận tư vấn miễn phí</div>
                                            </div>
                                            <div className='flex mb-5'>
                                                <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20} />
                                                <div className='ml-3'>Nhận tư vấn miễn phí</div>
                                            </div>
                                            <div className='flex items-center mb-5'>
                                                <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20} />
                                                <div className='ml-3'>Nhận tư vấn miễn phí</div>
                                            </div>
                                            <div className='flex items-center mb-5'>
                                                <IoIosCloseCircleOutline className='text-red-600 mt-0.5' size={20} />
                                                <div className='ml-3'>Nhận tư vấn miễn phí</div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>Active</Table.Cell>
                                        <Table.Cell>2024-08-25</Table.Cell>
                                        <Table.Cell>
                                            <Button href='/admin/company/package/update' color='warning' className='mt-4' type='submit' size='xs'>Cập nhật</Button>
                                            <Button href='/admin/company/package/update' color='failure' className='mt-4' type='submit' size='xs'>Xoá</Button>
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
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Bạn có muốn xóa gói đăng kí này không?
                        </h3>
                        <div className="flex justify-center gap-4 mt-10">
                            <Button type='submit' color="failure" onClick={() => setOpenModalCancel(false)}>
                                Có
                            </Button>
                            <Button type='button' color="gray" onClick={() => setOpenModalCancel(false)}>
                                Không
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
