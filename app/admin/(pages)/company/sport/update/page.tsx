"use client"
import { Heading, Input, InputImage } from '@components/index'
import { Button } from 'flowbite-react';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';

export default function CreateSport() {
    const { control, handleSubmit, formState: { isSubmitting, isValid }, getFieldState } = useForm({ mode: "onTouched", });

    const handlerSubmitCreateSport = (data: FieldValues) => {
        console.log(data)
    }

    return (
        <div className='py-5 w-full'>
            <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo mới môn thể thao' center />
            <form method='POST' className='mt-20' onSubmit={handleSubmit(handlerSubmitCreateSport)}>
                <div className='grid sm:grid-cols-2 gap-5'>
                    <div>
                        <Input
                            label='Tên môn thể thao (*)'
                            type='text'
                            name='name'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập tên môn thể thao",
                            }}
                        />
                        <InputImage
                            label='Icon thể thao (*)'
                            name='icon'
                            getFieldState={getFieldState}
                            control={control}
                            rules={{
                                required: "Vui chọn icon thể thao",
                            }}
                        />
                    </div>
                    <InputImage
                        label='Ảnh môn thể thao (*)'
                        name='image'
                        getFieldState={getFieldState}
                        control={control}
                        rules={{
                            required: "Vui chọn ảnh môn thể thao",
                        }}
                    />
                </div>
                <Button className='mt-4' type='submit' size='sm'>Tạo mới</Button>
            </form >
        </div >
    )
}
