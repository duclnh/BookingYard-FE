"use client"
import { CardStatistic, Heading, ModalView } from '@components/index'
import { Button, Pagination, Rating, Select, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'
import { IoMdSearch } from 'react-icons/io'
import { FaEye, FaStar } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useAppSelector } from '@hooks/hooks'
import qs from "query-string";
import { getFeedbackFacility } from '@services/feedbackService'
import { FeedbackOwner, PageResult } from 'types'
import toast from 'react-hot-toast'
import { getImage } from '@utils/imageOptions'

export default function Feedback() {
    const user = useAppSelector(state => state.manager.value)
    const [modalImage, setModalImage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<string[]>([])
    const [search, setSearch] = useState<string>('')
    const [feedbacks, setFeedbacks] = useState<PageResult<FeedbackOwner> | undefined>(undefined)

    const prevImage = () => {
        if (currentIndex == 0) return;
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        if ((images.length - 1) == currentIndex) return;
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
    const url = qs.stringifyUrl({
        url: "", query: {
            "search": search,
            "currentPage": currentPage,
            "pageSize": 10,
        }
    });

    useEffect(() => {
        getFeedbackFacility(user?.facilityID, url)
            .then(x => {
                if (x.status === 200) {
                    console.log(x.data)
                    return x.data
                } else {
                    toast.error("Lỗi lấy danh sách đánh giá")
                }
            }).then((feedbacks: PageResult<FeedbackOwner>) => {
                setFeedbacks(feedbacks)
            })
            .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
    }, [])
    return (
        <>
            <div className='py-5 w-full'>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Đánh giá từ chủ sân' center />
                {/* <div className='sm:my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
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
                <div className='mt-10 sm:my-24 w-full grid sm:grid-cols-2 gap-10 place-items-center'>
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
                </div> */}
                <div className='mt-36 bg-white'>
                    <div className='mt-10 sm:flex justify-between mb-3'>
                        <div className='flex'>
                            <input className='border rounded-md w-full px-3 sm:w-96' name='search' placeholder={'Tìm kiếm theo tên sân'} />
                            <Button className='p-1'>
                                <IoMdSearch className='font-bold' size={18} />
                            </Button>
                        </div>
                        <Select className='mt-3 md:mt-0'>
                            <option value="">Tất cả</option>
                            {[...Array(5)].map((_, index) => (
                                <option key={index} value={index + 1}>{index + 1} sao</option>
                            ))}
                        </Select>
                    </div>
                    <div className="border rounded-lg min-w-full max-w-[390px] overflow-x-auto">
                        <Table hoverable>
                            <Table.Head className='text-center'>
                                <Table.HeadCell>STT</Table.HeadCell>
                                <Table.HeadCell className='min-w-36'>Họ và tên</Table.HeadCell>
                                <Table.HeadCell className='min-w-24'>Số điện thoại</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Số sao</Table.HeadCell>
                                <Table.HeadCell className='min-w-60'>Nội dung</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Trạng thái</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {feedbacks !== undefined && feedbacks?.results?.map((feedbackOwner: FeedbackOwner, index) => (
                                    <Table.Row key={index} className="text-center">
                                        <Table.Cell>
                                            {index + 1}
                                        </Table.Cell>
                                        <Table.Cell className='text-left font-bold'>{feedbackOwner.name}</Table.Cell>
                                        <Table.Cell>{feedbackOwner.phone}</Table.Cell>
                                        <Table.Cell className='p-1 flex justify-center'>
                                            {feedbackOwner.rating && (
                                                <Rating>
                                                    {Array.from({ length: 5 }, (_, index) => (
                                                        <Rating.Star key={index} filled={index < feedbackOwner.rating} />
                                                    ))}
                                                </Rating>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell className='text-left'>{feedbackOwner.content}</Table.Cell>
                                        <Table.Cell>
                                            {feedbackOwner.isShow ? <p className='bg-green-200 text-green-500 p-1 rounded-md text-center font-bold'>
                                                Hiện thị
                                            </p> : <p className='bg-red-200 text-red-500 p-1 rounded-md text-center font-bold'>
                                                Đã ẩn
                                            </p>}
                                        </Table.Cell>
                                        <Table.Cell className='flex space-x-2 justify-center'>
                                            <Button size='xs' onClick={() => {
                                                setImages(feedbackOwner.images)
                                                setModalImage(true)
                                            }}>
                                                <FaEye size={16} />
                                            </Button>
                                            {/* <Button color='failure' type='submit' size='xs'>
                                                <RiDeleteBinLine size={16} />
                                            </Button> */}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                    {feedbacks != undefined && feedbacks.totalPages > 0 && (
                        <div className="flex justify-end">
                            <Pagination
                                layout="pagination"
                                currentPage={currentPage}
                                totalPages={feedbacks?.totalPages || 0}
                                onPageChange={onPageChange}
                                previousLabel=""
                                nextLabel=""
                                showIcons
                            />
                        </div>
                    )}
                </div>
            </div>
            {/*Start view Image */}
            <ModalView key={'View Images'} toggle={modalImage} setToggle={setModalImage}>
                <div className='rounded-lg shadow dark:bg-gray-700 w-[100%] h-[100%] group'>
                    <SlArrowLeftCircle className={`${currentIndex == 0 ? 'text-gray-500' : 'text-white'} mx-2 absolute top-1/2 left-3`} cursor='pointer' size={40} onClick={prevImage} />
                    <div className='mb-5'>
                        <Image
                            height={600}
                            width={1100}
                            className='select-none w-full max-h-[775px]'
                            src={getImage(images[currentIndex]) || "/assets/images/slide1.png"}
                            alt='Slide'
                        />
                    </div>
                    <SlArrowRightCircle className={`${currentIndex == (images.length - 1) ? 'text-gray-500' : 'text-white'} mx-2 absolute top-1/2 right-3`} cursor='pointer' size={40} onClick={nextImage} />
                </div>
            </ModalView>
            {/*End view Image */}
        </>
    )
}
