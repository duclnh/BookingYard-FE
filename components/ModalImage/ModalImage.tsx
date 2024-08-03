import React, { useState } from 'react'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai';

export default function ModalImage({ toggle, setToggle }: { toggle: boolean , setToggle: (value: boolean) => void}) {

    return (
        <div className={`${toggle ? '' : 'hidden'} fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full bg-[#3f3d3d]`}>
            <div className='h-full w-full relative'>
                <button className='absolute right-4 top-4 bg-[#8e8d8d] text-white p-2 rounded-full text-xl font-medium hover:cursor-pointer' onClick={() => setToggle(false)}><AiOutlineClose size={18} /></button>
                <div className='h-full flex flex-col items-center justify-center'>
                    <div className='rounded-lg shadow flex items-center justify-between w-[100%] h-[100%]'>
                        <SlArrowLeftCircle className='text-white hover:cursor-pointer mx-4' size={40} />
                        <div className=''>
                            <div className='mb-5 h-[600px]'>
                                <Image
                                    height={600}
                                    width={1100}
                                    className='select-none h-full w-full'
                                    src="/assets/images/slide2.png"
                                    alt="dá"
                                />
                            </div>
                            <div className='flex justify-center overflow-hidden'>
                                {[...Array(12)].map((_, index) => (
                                    <div key={index} className='mx-2 mb-2'>
                                        <Image
                                            height={90}
                                            width={90}
                                            className='select-none rounded-md hover:cursor-pointer'
                                            src="/assets/images/slide2.png"
                                            alt="dá"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SlArrowRightCircle className='text-white hover:cursor-pointer mx-4' size={40} />
                    </div>
                </div>
            </div>
        </div>
    )
}
