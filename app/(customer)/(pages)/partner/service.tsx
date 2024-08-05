'use client'
import { ToggleSwitch } from 'flowbite-react';
import React, { useState } from 'react'
import { HiLightningBolt } from 'react-icons/hi';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io'
import { IoGlobeSharp, IoRocket } from 'react-icons/io5';

export default function Service() {
    const [toggle, setToggle] = useState(false);
    return (
        <div className='bg-[#eff1f7] py-14'>
            <div className='sm:mx-32 mx-10 mb-10'>
                <div className='text-center mb-14'>
                    <div className='lg:text-6xl md:text-4xl text-3xl font-black'>
                        Bảng Giá Dịch Vụ
                    </div>
                    <div className='mt-3 font-medium lg:text-2xl'>Nhận tư vấn miễn phí!</div>
                    <div className='mt-10 flex items-center font-bold justify-center'>
                        Tháng
                        <ToggleSwitch checked={toggle} className='mx-5 *:focus:!ring-transparent' onChange={setToggle} />
                        Năm
                    </div>
                </div>
                <div className='grid gap-16 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 xl:gap-16'>
                    <div className='bg-white rounded-2xl mx-auto w-[100%]'>
                        <div className='flex justify-between items-center font-semibold text-lg border-b-2 px-4 py-6'>
                            <div className='mx-3'>
                                <p className='font-bold'>GÓI CƠ BẢN</p>
                                <div className='flex items-center'>
                                    <p className='text-2xl font-black'>300 VND</p>
                                    <p className='mx-3'>/</p>
                                    <p>{toggle ? 'Năm' : 'Tháng'}</p>
                                </div>
                            </div>
                            <div className='h-14 w-14 rounded-full bg-[#f5f5f6] flex items-center justify-center'>
                                <HiLightningBolt size={25} />
                            </div>
                        </div>
                        <div className='my-8 px-10'>
                            <div className='flex mb-5'>
                                <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20}/>
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
                        </div>
                    </div>
                    <div className='bg-white rounded-2xl mx-auto w-[100%]'>
                        <div className='flex justify-between items-center font-semibold text-lg border-b-2 px-4 py-6'>
                            <div className='mx-3'>
                                <p className='font-bold'>GÓI CAO CẤP</p>
                                <div className='flex items-center'>
                                    <p className='text-2xl font-black'>300 VND</p>
                                    <p className='mx-3'>/</p>
                                    <p>{toggle ? 'Năm' : 'Tháng'}</p>
                                </div>
                            </div>
                            <div className='h-14 w-14 rounded-full bg-[#f5f5f6] flex items-center justify-center'>
                                <IoRocket  size={25}/>
                            </div>
                        </div>
                        <div className='my-8 px-10'>
                            <div className='flex mb-5'>
                                <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20}/>
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
                        </div>
                    </div>
                    <div className='bg-white rounded-2xl mx-auto w-[100%]'>
                        <div className='flex justify-between items-center font-semibold text-lg border-b-2 px-4 py-6'>
                            <div className='mx-3'>
                                <p className='font-bold'>GÓI VIP</p>
                                <div className='flex items-center'>
                                    <p className='text-2xl font-black'>300 VND</p>
                                    <p className='mx-3'>/</p>
                                    <p>{toggle ? 'Năm' : 'Tháng'}</p>
                                </div>
                            </div>
                            <div className='h-14 w-14 rounded-full bg-[#f5f5f6] flex items-center justify-center'>
                                <IoGlobeSharp  size={25}/>
                            </div>
                        </div>
                        <div className='my-8 px-10'>
                            <div className='flex mb-5'>
                                <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20}/>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
