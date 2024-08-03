"use client"
import React, { useMemo } from 'react'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'
import View360, { EquirectProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import { AiOutlineClose } from 'react-icons/ai';

export default function Modal360({ toggle, setToggle }: { toggle: boolean , setToggle: (value: boolean) => void}) {
    const projection = useMemo(() => new EquirectProjection({
        src: "/assets/images/360.jpg",
    }), []);

    return (
        <div className={`${toggle ? '' : 'hidden'} fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full bg-[#3f3d3d]`}>
            <div className='h-full w-full relative'>
                <button className='absolute right-4 top-4 bg-[#8e8d8d] text-white p-2 rounded-full text-xl font-medium hover:cursor-pointer' onClick={() => setToggle(false)}><AiOutlineClose size={18} /></button>
                <div className='h-full flex flex-col items-center justify-center'>
                    <div className='rounded-lg shadow dark:bg-gray-700 flex items-center justify-between w-[100%] h-[100%]'>
                        <SlArrowLeftCircle className='text-white hover:cursor-pointer mx-2' size={40} />
                        <View360 className="is-16by9 h-full w-full" projection={projection} />
                        <SlArrowRightCircle className='text-white hover:cursor-pointer mx-2' size={40} />
                    </div>
                </div>
            </div>
        </div>
    )
}
