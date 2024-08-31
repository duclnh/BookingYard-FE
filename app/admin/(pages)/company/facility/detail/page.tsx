"use client"
import { CardStatistic, ModalView } from '@components/index'
import React, { useState } from 'react'
import { Rating } from 'flowbite-react'
import { MdHealthAndSafety, MdOutlineSportsKabaddi, MdPayments } from 'react-icons/md'
import { IoStorefrontSharp } from 'react-icons/io5'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FaCheckCircle } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import { BsBuilding, BsBuildingCheck, BsBuildingFillX } from 'react-icons/bs'
import Image from 'next/image'


export default function DetailPage() {
    const [modalMap, setModalMap] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className='py-5 px-20 w-full'>
                <div className='mt-10'>
                    {/* Start information court */}
                    <div className='grid place-items-center'>
                        <div className='text-3xl font-bold mr-3'>
                            San van dong ha nam
                        </div>
                        <Rating className='mt-4'>
                            <Rating.Star />
                            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                73 Lượt đánh giá
                            </p>
                        </Rating>
                    </div>
                    <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
                        <CardStatistic
                            title='Đặt lịch'
                            amount={3000}
                            icon={BsBuilding}
                            gradientFrom='from-cyan-700'
                            gradientTo='to-cyan-500'
                            iconColor='text-cyan-700'
                        />
                        <CardStatistic
                            title='Hủy đặt lịch'
                            amount={3300}
                            icon={BsBuildingCheck}
                            gradientFrom='from-green-700'
                            gradientTo='to-green-500'
                            iconColor='text-green-700'
                        />
                        <CardStatistic
                            title='Báo cáo'
                            amount={3300}
                            icon={BsBuildingFillX}
                            gradientFrom='from-red-700'
                            gradientTo='to-red-500'
                            iconColor='text-red-700'
                        />
                    </div>
                    <div className='mt-10'>
                        <div className='text-2xl font-bold border-b-2 py-3'>Thông tin sân</div>
                        <div className='grid sm:grid-cols-2 mt-5'>
                            <div>
                                <div className='flex mt-3'>
                                    <p className='text-md font-medium mr-2'>Họ và tên chủ sân: </p>
                                    Trương Hà Nam Giang
                                </div>
                                <div className='flex mt-3'>
                                    <p className='text-md font-medium mr-2'>Email: </p>
                                    TrươngHàNamGiang@gmail.com
                                </div>
                                <div className='flex mt-3'>
                                    <p className='text-md font-medium mr-2'>Số điện thoại: </p>
                                    <a href='tel:09145017489' className='hover:underline'>09145017489</a>
                                </div>
                                <div className='flex mt-3'>
                                    <p className='text-md font-medium mr-2'>Gói đăng kí: </p>
                                    Gói 1
                                </div>
                                <div className='flex mt-3'>
                                    <p className='text-md font-medium mr-2'>Ngày đăng kí: </p>
                                    23-11-2024
                                </div>
                                <div className='flex mt-3'>
                                    <p className='text-md font-medium mr-2'>Ngày hết hạn: </p>
                                    23-11-2024
                                </div>
                                <div className='flex mt-3'>
                                    <p className='text-md font-medium mr-2'>Thời gian hoạt động: </p>
                                    8:00 - 22:00
                                </div>
                                <div className='flex mt-3'>
                                    <p className='text-md font-medium mr-2'>Địa chỉ: </p>
                                    146 Nam Hòa, phường Phước Long A, TP. Thủ Đức
                                </div>
                                <div className='flex mt-3'>
                                    <p className='text-md font-medium mr-2'>Trạng thái hoạt động: </p>
                                    Đang hoạt động
                                </div>

                            </div>
                            <Image height={1000} width={1000} src={"/assets/images/slide2.png"} className='w-full h-full' alt='San van dong ha nam' />
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div className='text-2xl font-bold border-b-2 py-3'>Mô tả về tiết sân</div>
                        <div
                            className={`text-gray-700 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-full' : 'max-h-44'
                                }`}
                        >
                            <p className='mt-3'>
                                Demesne far-hearted suppose venture excited see had has. Dependent on so extremely delivered by. Yet no jokes worse her why. Bed one supposing breakfast day fulfilled off depending questions.
                            </p>
                            <p className='mt-3'>
                                Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. Water timed folly right aware if oh truth. Large above be to means. Dashwood does provide stronger is.
                            </p>
                            <p className='mt-3'>
                                We focus a great deal on the understanding of behavioral psychology and influence triggers which are crucial for becoming a well-rounded Digital Marketer. We understand that theory is important to build a solid foundation, we understand that theory alone isnt going to get the job done so thats why this rickets is packed with practical hands-on examples that you can follow step by step.
                            </p>
                            <p className='mt-3'>
                                Behavioral psychology and influence triggers which are crucial for becoming a well-rounded Digital Marketer. We understand that theory is important to build a solid foundation, we understand that theory alone isnt going to get the job done so thats why this tickets is packed with practical hands-on examples that you can follow step by step.
                            </p>
                        </div>
                        <div
                            className="py-2 font-medium hover:cursor-pointer"
                        >
                            {isExpanded ?
                                <div onClick={() => setIsExpanded(false)} className='flex items-center'>
                                    Thu gọn
                                    <IoIosArrowUp className='ml-1' />
                                </div>
                                :
                                <div onClick={() => setIsExpanded(true)} className='flex items-center'>
                                    Xêm thêm
                                    <IoIosArrowDown className='ml-1' />
                                </div>
                            }
                        </div>
                    </div>
                    {/* End information court */}
                    {/* Start convenient */}
                    <div className='mt-10'>
                        <div className='text-2xl font-bold border-b-2 py-3'>Các tiện ích ở sân</div>
                        <div className='grid grid-cols-2 mt-5 gap-10  '>
                            <div>
                                <div className='flex items-center font-bold'>
                                    <MdOutlineSportsKabaddi size={20} className='mr-2' />
                                    Các sân thể thao
                                </div>
                                <div className='mt-3'>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Bể bơi
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Bóng chuyền
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Bóng đá
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Bống rổ
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex items-center font-bold'>
                                    <MdPayments size={20} className='mr-2' />
                                    Các phương thức thanh toán
                                </div>
                                <div className='mt-3'>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Thẻ tín dụng (Visa, Master card)
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Momo
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Chuyển khoản
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Tiền mặt
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex items-center font-bold'>
                                    <IoStorefrontSharp size={20} className='mr-2' />
                                    Các dịch vụ giải trí
                                </div>
                                <div className='mt-3'>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Nhà hàng
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Quán nước
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Căn tin
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Karoke
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Cửa hàng tiện lợi
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex items-center font-bold'>
                                    <MdHealthAndSafety size={20} className='mr-2' />
                                    Các dịch vụ an toàn và chăm sóc
                                </div>
                                <div className='mt-3'>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Bảo vệ
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Nhà gửi xe
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <FaCheckCircle size={14} className='mr-3 text-green-500' />
                                        Chăm sóc y tế
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End convenient */}
                    </div>
                </div>
                {/*Start view Map */}
                <ModalView key={'View Map'} toggle={modalMap} setToggle={setModalMap}>
                    <div className='rounded-lg bg-white shadow dark:bg-gray-700 items-center justify-center w-[100%] h-[100%]'>
                        {/* <MapCustom
                            setPlacePosition={() => { }}
                            viewMap
                            handlerExpand={setModalMap}
                            className='w-full h-full !z-10'
                        /> */}
                    </div>
                </ModalView>
                {/*End view Map */}

            </div>
        </>
    )
}
