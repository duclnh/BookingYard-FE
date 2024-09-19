"use client"
import { Heading, Input, NewFeature } from '@components/index'
import { Button, Label, Select } from 'flowbite-react';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Feature } from 'types';

export default function CreatePackage() {
    const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({ mode: "onTouched", });
    const [features, setFeatures] = useState<Feature[]>([
        { title: 'Tư vấn miễn phí', isEnable: true },
        { title: 'Đặt sân nhanh', isEnable: true },
        { title: 'Thay đổi giờ chơi', isEnable: true },
        { title: 'Xem lịch sử đặt sân', isEnable: true }
    ]);

    const handlerSubmitCreatePackage = () => {
            console.log(JSON.stringify(features))
    }

    return (
        <div className='py-5 w-full'>
            <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo gói đăng kí mới' center />
            <form method='POST' className='mt-20' onSubmit={handleSubmit(handlerSubmitCreatePackage)}>
                <div className='grid sm:grid-cols-2 gap-10'>
                    <div>
                        <Input
                            label='Tên gói (*)'
                            type='text'
                            name='name'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập tên gói",
                            }}
                        />
                        <div className='mt-3'>
                            <Label htmlFor='package' value='Gói loại gói (*)' />
                            <Controller
                                name='package'
                                control={control}
                                rules={{ required: 'Vui lòng chọn loại gói' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Select
                                            {...field}
                                            className='focus:ring-transparent'
                                            id="package"
                                            color={
                                                fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                            }
                                        >
                                            <option value=''>Loại gói</option>
                                            <option value="France">Tháng</option>
                                            <option value="Germany">Năm</option>
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
                        <div className='mt-3'>
                            <Input
                                label='Thời gian gói (*)'
                                type='number'
                                name='time'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập tên gói",
                                }}
                            />
                        </div>
                        <div className='mt-3'>
                            <Input
                                label='Giá tiền (*)'
                                type='number'
                                name='price'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập tên gói",
                                }}
                            />
                        </div>
                    </div>
                    <NewFeature label='Nội dung gói (*)' name='package' features={features} handlerSetFeature={setFeatures} />
                </div>
                <Button className='mt-4' type='submit' size='sm'>Tạo mới</Button>
            </form>
        </div>
    )
}
