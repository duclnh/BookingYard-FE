"use client"
import { Heading, Input, NewFeature } from '@components/index'
import { Button, Label, Select } from 'flowbite-react';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Feature } from 'types';

export default function UpdatePackage() {
    const { control, handleSubmit, register, formState: { isSubmitting, isValid }, setValue } = useForm({ mode: "onTouched", });
    const [error, setError] = useState<string | undefined>()
    const [textFeature, setTextFeature] = useState<string>('')
    const [features, setFeatures] = useState<Feature[]>([
        { title: 'Tư vấn miễn phí', isEnable: true },
        { title: 'Đặt sân nhanh', isEnable: true },
        { title: 'Thay đổi giờ chơi', isEnable: true },
        { title: 'Xem lịch sử đặt sân', isEnable: true }
    ]);

    const handlerAddFeature = () => {
        let text = textFeature.trim().toLowerCase();
        if (text) {
            let exit = features.find(x => x.title.trim().toLowerCase() === text);
            if (exit) {
                setError('Tính năng này đã có')
            } else {
                setFeatures([...features, { title: textFeature.trim(), isEnable: true }]);
                setTextFeature('');
                setError('')
                console.log('')
            }

        } else {
            setError('Vui lòng nhập tính năng')
        }
    };

    const handlerRemoveFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
        setValue('feature', features)
    };

    const handlerSubmitCreatePackage = () => {
        if (features.length == 0) {
            setError('Vui lòng nhập tính năng')
            return;
        }
        setValue('feature', features)
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
                                            <div className="text-red-500 text-sm">
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
                    <div>
                        <Label htmlFor='package' value='Nội dung gói (*)' />
                        <div id='content' className='mt-1'>
                            {features.map((feature, index) => (
                                <NewFeature key={index} remove={() => handlerRemoveFeature(index)} title={feature.title} check={feature.isEnable} />
                            ))}
                        </div>
                        <div className='mt-2 flex'>
                            <input value={textFeature} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextFeature(e?.target.value)} className='border rounded-md px-3' />
                            <Button onClick={handlerAddFeature} size='sm' type='button'>Thêm</Button>
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
                        )}
                    </div>
                </div>
                <Button className='mt-4' type='submit' size='sm'>Cập nhật</Button>
            </form>
        </div>
    )
}
