"use client"
import { Heading, Input, InputImage } from '@components/index'
import { Button, Label, Select } from 'flowbite-react';
import React, { useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form';


export default function CreatePage() {
    const { control, handleSubmit, register, formState: { isSubmitting, isValid }, getFieldState, setValue, getValues, } = useForm({ mode: "onTouched", });
    const [imageCourt, setImageCourt] = useState<File>()
    const [image360, setImage360] = useState<File>()

    const handlerSubmitCreateFacility = (data: FieldValues) => {
        console.log(data)
    }

    return (
        <>
            <form method='POST' className='py-5 w-full' onSubmit={handleSubmit(handlerSubmitCreateFacility)}>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo cơ sở mới' center />
                <div className='mt-10 grid md:grid-cols-2 gap-10'>
                    <div>
                        <div className='mb-3'>
                            <Input
                                label='Tên sân (*)'
                                type='text'
                                name='name'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập tên sân",
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <InputImage
                            name='image'
                            label='Ảnh sân (*)'
                            value={imageCourt}
                            setFile={setImageCourt}
                            required="Vui chọn ảnh sân"
                        />
                    </div>
                </div>
                <div className='mt-3 grid md:grid-cols-2 gap-10'>
                    <div>
                        <Label htmlFor='open' value='Môn thể thao (*)' />
                        <Controller
                            name='open'
                            control={control}
                            rules={{ required: 'Vui lòng nhập môn thể thao' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Select
                                        {...field}
                                        className='focus:ring-transparent'
                                        id="open"
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Chọn môn thể thao</option>
                                        {[...Array(24)].map((_, index) => (
                                            <option key={index} value={`${index + 1}:00`}>{`${index + 1}:00`}</option>
                                        ))}
                                    </Select>
                                    {fieldState.error && (
                                        <div className="text-red-500 text-sm mt-2">
                                            {fieldState.error.message}
                                        </div>
                                    )}
                                </>
                            )}
                        />
                    </div>
                    <InputImage
                        name='360'
                        label='Ảnh 360 sân (*)'
                        value={image360}
                        setFile= {setImage360}
                        required= "Vui chọn ảnh 360 sân"
                    />
                </div>
                <div className='mt-3 grid md:grid-cols-2 gap-10'>
                    <Input
                        label='Số người chơi (*)'
                        type='text'
                        name='number'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập số người chơi",
                        }}
                    />
                    <Input
                        label='Giá tiền (*)'
                        type='text'
                        name='price'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập giá tiền",
                        }}
                    />
                </div>
                <Button className='mt-5' type='submit'>Tạo mới</Button>
            </form >
        </>
    )
}
