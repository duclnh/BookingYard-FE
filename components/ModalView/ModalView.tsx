import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
    toggle: boolean, 
    setToggle: (value: boolean) => void,
    children: React.ReactNode
}

export default function ModalView( props: Props) {

    return (
        <div className={`${props.toggle ? '' : 'hidden'} fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full bg-[#3f3d3d]`}>
            <div className='h-full w-full relative'>
                <button className='absolute z-20 right-4 top-4 bg-[#8e8d8d] text-white p-2 rounded-full text-xl font-medium hover:cursor-pointer' onClick={() => props.setToggle(false)}><AiOutlineClose size={18} /></button>
                <div className='h-full flex flex-col items-center justify-center'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
