"use client"
import { Heading, ModalView } from '@components/index'
import { Button, Pagination, Select, Table } from 'flowbite-react'
import React, { useState } from 'react'
import { TbReport } from 'react-icons/tb'
import { TfiComments } from 'react-icons/tfi'
import { VscCommentUnresolved } from 'react-icons/vsc'
import Image from 'next/image'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'
import { IoMdSearch } from 'react-icons/io'
export default function ReportPage() {
    const [modalImage, setModalImage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = ['/assets/images/slide1.png', '/assets/images/slide2.png', '/assets/images/slide3.png'];
    const prevImage = () => {
        if (currentIndex == 0) return;
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        if ((images.length - 1) == currentIndex) return;
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <div className='py-5 w-full'>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Báo cáo sân từ người dùng' center />
                <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
                    <div className="shadow-2xl border w-64 p-5 rounded-xl bg-gradient-to-r from-cyan-700 to-cyan-500">
                        <div className='flex items-center justify-between'>
                            <div className='text-white'>
                                <p className='text-base font-medium'>Tổng số báo cáo</p>
                                <p className='text-2xl font-black'>3300</p>
                            </div>
                            <div className='bg-white rounded-full p-2'>
                                <TbReport className='text-cyan-700' size={30} />
                            </div>
                        </div>
                    </div>
                    <div className="shadow-2xl border w-64 p-5 rounded-xl bg-gradient-to-r from-green-700 to-green-500">
                        <div className='flex items-center justify-between'>
                            <div className='text-white'>
                                <p className='text-base font-medium'>Đã xử lý</p>
                                <p className='text-2xl font-black'>3300</p>
                            </div>
                            <div className='bg-white rounded-full p-2'>
                                <TfiComments className='text-green-700' size={30} />
                            </div>
                        </div>
                    </div>
                    <div className="shadow-2xl border w-64 p-5 rounded-xl bg-gradient-to-r from-red-700 to-red-500">
                        <div className='flex items-center justify-between'>
                            <div className='text-white'>
                                <p className='text-base font-medium'>Chưa xử lý</p>
                                <p className='text-2xl font-black'>3300</p>
                            </div>
                            <div className='bg-white rounded-full p-2'>
                                <VscCommentUnresolved className='text-red-700' size={30} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-36 bg-white'>
                    <div className='mt-10 flex justify-between mb-3'>
                        <div className='flex'>
                            <input className='border rounded-md px-3 sm:w-96 w-80' name='search' placeholder={'Tìm kiếm theo email, số điện thoại'} />
                            <Button className='p-1'>
                                <IoMdSearch className='font-bold mr-2' size={18} />
                            </Button>
                        </div>
                        <Select className=''>
                            <option value="">Trạng thái</option>
                            <option value="">Đã xử lý</option>
                            <option value="">Đang xử lý</option>
                            <option value="">Chưa xử lý</option>
                        </Select>
                    </div>
                    <div className={`border overflow-x-scroll max-w-[1120px] pb-3`}>
                        <Table className='rounded-lg' hoverable>
                            <Table.Head>
                                <Table.HeadCell>STT</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Sân</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Email</Table.HeadCell>
                                <Table.HeadCell className='min-w-36'>Số diện thoại</Table.HeadCell>
                                <Table.HeadCell className='min-w-72'>Nội dung</Table.HeadCell>
                                <Table.HeadCell className='min-w-60'>Hình ảnh</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Trạng thái</Table.HeadCell>
                                <Table.HeadCell className='min-w-64 max-w-80'>Ghi chú</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Ngày tạo</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {[...Array(5)].map((_, index) => (
                                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            {index}
                                        </Table.Cell>
                                        <Table.Cell>Sân bảo an</Table.Cell>
                                        <Table.Cell>lengochuynduc@gmail.com</Table.Cell>
                                        <Table.Cell>0914501749</Table.Cell>
                                        <Table.Cell>
                                            <p>
                                                Demesne far-hearted suppose venture excited see had has. Dependent on so extremely delivered by. Yet no jokes worse her why. Bed one supposing breakfast day fulfilled off depending questions.
                                            </p>
                                            <p>
                                                Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. Water timed folly right aware if oh truth. Large above be to means. Dashwood does provide stronger is.
                                            </p>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className='flex'>
                                                <Image height={100} width={100} src="/assets/images/slide2.png" className='rounded-lg hover:cursor-pointer mr-3' onClick={() => setModalImage(true)} alt="das" />
                                                <div className='hover:cursor-pointer relative'>
                                                    <Image height={100} width={100} src="/assets/images/slide2.png" className='rounded-lg hover:cursor-pointer' alt="das" />
                                                    <div className='absolute right-0 top-0 w-full h-full bg-[#302f2f] opacity-70 rounded-lg flex justify-center items-center text-white font-bold'>
                                                        + 999
                                                    </div>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>Chưa xử lý</Table.Cell>
                                        <Table.Cell>
                                            <p>
                                                Demesne far-hearted suppose venture excited see had has. Dependent on so extremely delivered by. Yet no jokes worse her why. Bed one supposing breakfast day fulfilled off depending questions.
                                            </p>
                                            <p>
                                                Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. Water timed folly right aware if oh truth. Large above be to means. Dashwood does provide stronger is.
                                            </p>
                                        </Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell>
                                            <Button size={"sm"} href="#" className="font-medium">
                                                Xử lý
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
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
            </div>
            {/*Start view Image */}
            <ModalView key={'View Images'} toggle={modalImage} setToggle={setModalImage}>
                <div className='rounded-lg shadow flex items-center justify-between w-[100%] h-[100%]'>
                    <SlArrowLeftCircle className={`${currentIndex == 0 ? 'text-gray-500' : 'text-white'} mx-2`} cursor='pointer' size={40} onClick={prevImage} />
                    <div className=''>
                        <div className='mb-5 h-[600px]'>
                            <Image
                                height={600}
                                width={1100}
                                className='select-none h-full w-full'
                                src={images[currentIndex]}
                                alt='Slide'
                            />
                        </div>
                        <div className='flex justify-center overflow-hidden'>
                            {[...Array(images.length)].map((_, index) => (
                                <div key={index} className='mx-2 mb-2'>
                                    <Image
                                        height={90}
                                        width={90}
                                        className='select-none rounded-md hover:scale-105 hover:cursor-pointer'
                                        src={images[index]}
                                        alt='Thumbnail'
                                        onClick={() => setCurrentIndex(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <SlArrowRightCircle className={`${currentIndex == (images.length - 1) ? 'text-gray-500' : 'text-white'} mx-2`} cursor='pointer' size={40} onClick={nextImage} />
                </div>
            </ModalView>
            {/*End view Image */}
        </>
    )
}
