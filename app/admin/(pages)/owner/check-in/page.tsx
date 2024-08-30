"use client"
import { Heading, Input } from '@components/index'
import { Label } from 'flowbite-react'
import React from 'react'
import { useForm } from 'react-hook-form';

export default function CheckIn() {
    const { control, handleSubmit, formState: { isSubmitting, isValid }, getFieldState, setValue, getValues, } = useForm({ mode: "onTouched", });
    return (
        <div className='py-5 w-full'>
            <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Kiểm tra lịch trình' center />
            <div className='border shadow-3xl p-5 rounded-xl'>
                <div className='flex'>
                    <div className='h-7 w-2 bg-teal-400 mr-2 rounded-sm'></div>
                    <Label className='text-lg mb-10' value='Thông tin kiểm tra' />
                </div>
                <div className='grid lg:grid-cols-2 gap-10'>
                    <div>
                        <div className='mb-2'>
                            <Input
                                label='Email(*)'
                                type='text'
                                name='email'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập email",
                                }}
                            />
                        </div>
                        <Input
                            label='Số điện thoại(*)'
                            type='text'
                            name='phone'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập số điện thoại",
                            }}
                        />
                    </div>
                    <div>đâs</div>
                </div>
            </div>
        </div>
    )
}
