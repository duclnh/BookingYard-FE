"use client"
import React, { useState } from 'react'
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';

export default function NewFeature({ title, remove, check }: { title: string, check: boolean, remove: () => void }) {
    const [showCheckIcon, setShowCheckIcon] = useState(check);
    const handleClick = () => {
        setShowCheckIcon(prevState => !prevState);
    };
    return (
        <div className='relative group hover:cursor-pointer'>
            <div onClick={handleClick}>
                <div className='flex items-center mb-5 border p-2'>
                    {showCheckIcon ? (
                        <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20} />
                    ) : (
                        <IoIosCloseCircleOutline className='text-red-600 mt-0.5' size={20} />
                    )}
                    <div className='ml-3'>{title}</div>
                </div>
            </div>
            <TiDelete onClick={remove} size={25} className='text-red-500 absolute -top-2 -right-2 hidden group-hover:block' />
        </div>
    )
}
