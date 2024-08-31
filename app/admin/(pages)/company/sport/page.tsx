"use client"
import { CardStatistic, Heading } from '@components/index'
import { Button, Modal, Pagination, Select, Table } from 'flowbite-react'
import React, { useState } from 'react'
import { BsBuilding } from 'react-icons/bs'
import { FaPencil } from 'react-icons/fa6'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { IoMdSearch } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri'

export default function Sport() {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [openModalCancel, setOpenModalCancel] = useState(false);
    return (
        <>
            <div className='py-5 w-full'>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Danh sách môn thể thao' center />
                <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
                    {[...Array(5)].map((_, index) => (
                        <CardStatistic
                            key={index}
                            title='Bóng đá'
                            amount={3000}
                            icon={BsBuilding}
                            gradientFrom='from-cyan-700'
                            gradientTo='to-cyan-500'
                            iconColor='text-cyan-700'
                        />
                    ))}
                </div>
                <div className='mt-36 bg-white'>
                    <div className='mt-10 sm:flex justify-between mb-3'>
                        <div className='flex'>
                            <input className='border rounded-md px-3 sm:w-96 w-full' name='search' placeholder={'Tìm tên môn thể thao'} />
                            <Button className='p-1'>
                                <IoMdSearch className='font-bold' size={18} />
                            </Button>
                        </div>
                        <Select className='mt-3 md:mt-0'>
                            <option value="">Tất cả</option>
                            <option value="">Đang hoạt động</option>
                            <option value="">Đã ngưng hoạt động</option>
                        </Select>
                    </div>
                    <div className="border rounded-lg min-w-full max-w-[390px] overflow-x-auto">
                        <Table hoverable>
                            <Table.Head className='text-center'>
                                <Table.HeadCell>STT</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Tên môn thể thao</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Icon</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Ảnh</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Ngày tạo</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row className='text-center'>
                                    <Table.Cell>1</Table.Cell>
                                    <Table.Cell className='text-left'>Cầu lông</Table.Cell>
                                    <Table.Cell>🏸</Table.Cell>
                                    <Table.Cell><img src="/images/badminton.jpg" alt="Cầu lông" className="w-8 h-8" /></Table.Cell>
                                    <Table.Cell>2024-08-25</Table.Cell>
                                    <Table.Cell>
                                        <div className='flex space-x-2 justify-center'>
                                            <Button color='warning' type='submit' size='xs'>
                                                <FaPencil size={16} />
                                            </Button>
                                            <Button onClick={() => setOpenModalCancel(true)} color='failure' type='submit' size='xs'>
                                                <RiDeleteBinLine size={16} />
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row className='text-center'>
                                    <Table.Cell>1</Table.Cell>
                                    <Table.Cell className='text-left'>Cầu lông</Table.Cell>
                                    <Table.Cell>⚽</Table.Cell>
                                    <Table.Cell><img src="/images/soccer.jpg" alt="Bóng đá" className="w-8 h-8" /></Table.Cell>
                                    <Table.Cell>2024-08-24</Table.Cell>
                                    <Table.Cell>
                                        <div className='flex space-x-2 justify-center'>
                                            <Button color='warning' type='submit' size='xs'>
                                                <FaPencil size={16} />
                                            </Button>
                                            <Button onClick={() => setOpenModalCancel(true)} color='failure' type='submit' size='xs'>
                                                <RiDeleteBinLine size={16} />
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row className='text-center'>
                                    <Table.Cell>1</Table.Cell>
                                    <Table.Cell className='text-left'>Cầu lông</Table.Cell>
                                    <Table.Cell>🏀</Table.Cell>
                                    <Table.Cell><img src="/images/basketball.jpg" alt="Bóng rổ" className="w-8 h-8" /></Table.Cell>
                                    <Table.Cell>2024-08-23</Table.Cell>
                                    <Table.Cell>
                                        <div className='flex space-x-2 justify-center'>
                                            <Button color='warning' type='submit' size='xs'>
                                                <FaPencil size={16} />
                                            </Button>
                                            <Button onClick={() => setOpenModalCancel(true)} color='failure' type='submit' size='xs'>
                                                <RiDeleteBinLine size={16} />
                                            </Button>
                                        </div>
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
            <Modal key={"cancel"} show={openModalCancel} size="md" onClose={() => setOpenModalCancel(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Bạn có muốn xóa môn thể thao này không?
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
