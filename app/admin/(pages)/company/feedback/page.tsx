"use client"
import { CardStatistic, Heading, ModalView } from '@components/index'
import { Button, Pagination, Rating, Select, Table } from 'flowbite-react'
import React, { useState } from 'react'
import Image from 'next/image'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'
import { IoMdSearch } from 'react-icons/io'
import { FaStar } from 'react-icons/fa'

export default function Feedback() {
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
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Đánh giá từ chủ sân' center />
                <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
                    <CardStatistic
                        title='5 sao'
                        amount={3000}
                        icon={FaStar}
                        gradientFrom='from-yellow-500'
                        gradientTo='to-yellow-400'
                        iconColor='text-yellow-400'
                    />
                    <CardStatistic
                        title='4 sao'
                        amount={3000}
                        icon={FaStar}
                        gradientFrom='from-yellow-500'
                        gradientTo='to-yellow-400'
                        iconColor='text-yellow-400'
                    />
                    <CardStatistic
                        title='3 sao'
                        amount={3000}
                        icon={FaStar}
                        gradientFrom='from-yellow-500'
                        gradientTo='to-yellow-400'
                        iconColor='text-yellow-400'
                    />
                </div>
                <div className='my-24 w-full grid sm:grid-cols-2 gap-10  place-items-center'>
                    <CardStatistic
                        title='2 sao'
                        amount={3000}
                        icon={FaStar}
                        gradientFrom='from-yellow-500'
                        gradientTo='to-yellow-400'
                        iconColor='text-yellow-400'
                    />
                    <CardStatistic
                        title='1 sao'
                        amount={3000}
                        icon={FaStar}
                        gradientFrom='from-yellow-500'
                        gradientTo='to-yellow-400'
                        iconColor='text-yellow-400'
                    />
                </div>
                <div className='mt-36 bg-white'>
                    <div className='mt-10 flex justify-between mb-3'>
                        <div className='flex'>
                            <input className='border rounded-md px-3 sm:w-96 w-80' name='search' placeholder={'Tìm kiếm theo tên sân'} />
                            <Button className='p-1'>
                                <IoMdSearch className='font-bold' size={18} />
                            </Button>
                        </div>
                        <Select className=''>
                            <option value="">Trạng thái</option>
                            <option value="">Đã xử lý</option>
                            <option value="">Đang xử lý</option>
                            <option value="">Chưa xử lý</option>
                        </Select>
                    </div>
                    <div className="border min-w-full max-w-[1000px] overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>STT</Table.HeadCell>
                                <Table.HeadCell className='min-w-72'>Sân</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Số sao</Table.HeadCell>
                                <Table.HeadCell className='min-w-96'>Nội dung</Table.HeadCell>
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
                                        <Table.Cell>
                                            <Rating>
                                                <Rating.Star />
                                                <Rating.Star />
                                                <Rating.Star />
                                                <Rating.Star />
                                                <Rating.Star filled={false} />
                                            </Rating>
                                        </Table.Cell>
                                        <Table.Cell>0914501749</Table.Cell>
                                        <Table.Cell>25-08-2024</Table.Cell>
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
