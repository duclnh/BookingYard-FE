"use client"
import { Heading } from '@components/index'
import { Button, Label, Modal, Pagination, Select, Table } from 'flowbite-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { GiCardExchange } from 'react-icons/gi';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { IoMdSearch } from 'react-icons/io';
import { MdOutlineChangeCircle } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function RegisterPackage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [openModalCancel, setOpenModalCancel] = useState(false);
    const [openModalExtend, setOpenModalExtend] = useState(false);
    const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({ mode: "onTouched", });

    const onPageChange = (page: number) => setCurrentPage(page);
    const handlerSubmitExtend = () => {
        setOpenModalExtend(false)
    }
    return (
        <>
            <div className='py-5 w-full'>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Thông tin đăng kí gói' center />
                <div className='mt-36 bg-white'>
                    <div className='mt-10 sm:flex justify-between mb-3'>
                        <div className='flex'>
                            <input className='border rounded-md px-3 sm:w-96 w-80' name='search' placeholder={'Tìm tên gói, loại gói, nội dung'} />
                            <Button className='p-1'>
                                <IoMdSearch className='font-bold mr-2' size={18} />
                            </Button>
                        </div>
                        <Select className=''>
                            <option value="">Tất cả</option>
                            <option value="">Đang hoạt động</option>
                            <option value="">Đã hết hạn</option>
                            <option value="">Đã hủy</option>
                        </Select>
                    </div>
                    <div className='border w-full'>
                        <Table className='rounded-lg' hoverable>
                            <Table.Head>
                                <Table.HeadCell>STT</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Tên gói</Table.HeadCell>
                                <Table.HeadCell className='min-w-36'>Tên cơ sở</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Loại gói</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Trạng thái</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Ngày tạo</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'></Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>1</Table.Cell>
                                    <Table.Cell>Gói A</Table.Cell>
                                    <Table.Cell>Nguyen van A</Table.Cell>
                                    <Table.Cell>093124512</Table.Cell>
                                    <Table.Cell>Đã gia hạn</Table.Cell>
                                    <Table.Cell>2024-08-25</Table.Cell>
                                    <Table.Cell className='flex space-x-2'>
                                        <Button onClick={() => setOpenModalExtend(true)} color='warning' className='mt-4' type='submit' size='xs'>
                                            <GiCardExchange  size={16} />
                                        </Button>
                                        <Button onClick={() => setOpenModalCancel(true)} color='failure' className='mt-4' type='submit' size='xs'>
                                            <RiDeleteBinLine size={16}/>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>2</Table.Cell>
                                    <Table.Cell>Gói B</Table.Cell>
                                    <Table.Cell>Nguyen van B</Table.Cell>
                                    <Table.Cell>093124513</Table.Cell>
                                    <Table.Cell>Đã hết hạn</Table.Cell>
                                    <Table.Cell>2024-08-26</Table.Cell>
                                    <Table.Cell className='flex space-x-2'>
                                        <Button color='warning' className='mt-4' type='submit' size='xs'>
                                            <GiCardExchange  size={16} />
                                        </Button>
                                        <Button color='failure' className='mt-4' type='submit' size='xs'>
                                            <RiDeleteBinLine size={16}/>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>3</Table.Cell>
                                    <Table.Cell>Gói C</Table.Cell>
                                    <Table.Cell>Nguyen van C</Table.Cell>
                                    <Table.Cell>093124514</Table.Cell>
                                    <Table.Cell>Đang hoạt động</Table.Cell>
                                    <Table.Cell>2024-08-27</Table.Cell>
                                    <Table.Cell className='flex space-x-2'>
                                        <Button color='warning' className='mt-4' type='submit' size='xs'>
                                            <GiCardExchange  size={16} />
                                        </Button>
                                        <Button color='failure' className='mt-4' type='submit' size='xs'>
                                            <RiDeleteBinLine size={16}/>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>4</Table.Cell>
                                    <Table.Cell>Gói D</Table.Cell>
                                    <Table.Cell>Nguyen van D</Table.Cell>
                                    <Table.Cell>093124515</Table.Cell>
                                    <Table.Cell>Active</Table.Cell>
                                    <Table.Cell>2024-08-28</Table.Cell>
                                    <Table.Cell className='flex space-x-2'>
                                        <Button color='warning' className='mt-4' type='submit' size='xs'>
                                            <GiCardExchange  size={16} />
                                        </Button>
                                        <Button color='failure' className='mt-4' type='submit' size='xs'>
                                            <RiDeleteBinLine size={16}/>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>5</Table.Cell>
                                    <Table.Cell>Gói E</Table.Cell>
                                    <Table.Cell>Nguyen van E</Table.Cell>
                                    <Table.Cell>093124516</Table.Cell>
                                    <Table.Cell>Active</Table.Cell>
                                    <Table.Cell>2024-08-29</Table.Cell>
                                    <Table.Cell className='flex space-x-2'>
                                        <Button color='warning' className='mt-4' type='submit' size='xs'>
                                            <GiCardExchange  size={16} />
                                        </Button>
                                        <Button color='failure' className='mt-4' type='submit' size='xs'>
                                            <RiDeleteBinLine size={16}/>
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
            <Modal key={"cancel"} show={openModalCancel} size="md" onClose={() => setOpenModalCancel(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Bạn có muốn hủy gói đăng kí này không?
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
            <Modal key={"cancel"} show={openModalExtend} size="md" onClose={() => setOpenModalExtend(false)} popup>
                <Modal.Header className='border-b-2'>
                    <p className='text-lg'>Gia hạn gói đăng kí</p>
                </Modal.Header>
                <Modal.Body>
                    <form className="mt-5" method='POST' onSubmit={handleSubmit(handlerSubmitExtend)}>
                        <Label htmlFor='' value='Chọn gói sân' />
                        <Controller
                            name='package'
                            control={control}
                            rules={{ required: 'Vui lòng chọn gói sân' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Select
                                        {...field}
                                        className='focus:ring-transparent'
                                        id="package"
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Gói sân</option>
                                        <option value="Canada">Gói 1</option>
                                        <option value="France">Gói 2</option>
                                        <option value="Germany">Gói 3</option>
                                    </Select>
                                    {fieldState.error && (
                                        <div className="text-red-500 text-sm mt-2">
                                            {fieldState.error.message}
                                        </div>
                                    )}
                                </>
                            )}
                        />
                        <div className="flex justify-center gap-4 mt-10">
                            <Button type='submit' size='md' color="warning">
                                Gia hạn
                            </Button>
                            <Button type='button' size='md' color="gray" onClick={() => setOpenModalExtend(false)}>
                                Không
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
