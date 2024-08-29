"use client"
import React from 'react'
import { Calendar, Heading } from '@components/index';

export default function Schedule() {
    return (
        <div className='py-5 w-full'>
            <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Lịch trình hoạt động' center />
            <Calendar /> 
        </div>
    )
}
