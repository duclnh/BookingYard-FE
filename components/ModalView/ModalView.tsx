import React, { Children } from 'react'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai';
import { EquirectProjection } from "@egjs/react-view360";

type Props = {
    toggle: boolean, 
    setToggle: (value: boolean) => void,
    children: React.ReactNode
}

export default function ModalView( props: Props) {

    return (
        <div className={`${props.toggle ? '' : 'hidden'} fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full bg-[#3f3d3d]`}>
            <div className='h-full w-full relative'>
                <button className='absolute right-4 top-4 bg-[#8e8d8d] text-white p-2 rounded-full text-xl font-medium hover:cursor-pointer' onClick={() => props.setToggle(false)}><AiOutlineClose size={18} /></button>
                <div className='h-full flex flex-col items-center justify-center'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
