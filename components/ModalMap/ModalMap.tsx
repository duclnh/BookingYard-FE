import MapEmbed from '@components/MapEmbed/MapEmbed ';
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

export default function ModalMap({ toggle, setToggle }: { toggle: boolean , setToggle: (value: boolean) => void}) {
    return (
        <div className={`${toggle ? '' : 'hidden'} fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full bg-gray-900`}>
            <div className='h-full w-full relative'>
                <button className='absolute right-4 top-4 bg-[#8e8d8d] text-white p-2 rounded-full text-xl font-medium hover:cursor-pointer' onClick={() => setToggle(false)}><AiOutlineClose size={18} /></button>
                <div className='h-full flex flex-col items-center justify-center'>
                    <div className='rounded-lg bg-white shadow dark:bg-gray-700 items-center justify-center w-[100%] h-[100%]'>
                        <MapEmbed
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9318.999450695495!2d106.79499512440712!3d10.875690087176755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2sVNUHCM%20Student%20Cultural%20House!5e0!3m2!1sen!2s!4v1722617783521!5m2!1sen!2s'
                            className=' w-[100%] h-[100%]'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
