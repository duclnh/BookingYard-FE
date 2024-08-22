"use client"
import { Heading, Input, TextEditor } from '@components/index'
import { Button, FileInput, Label } from 'flowbite-react';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';

export default function CreatePage() {
    const { control, handleSubmit, register, formState: { isSubmitting, isValid }, getFieldState } = useForm({ mode: "onTouched", });

    const [imageSrc, setImageSrc] = useState(null);
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setImageSrc(e.target?.result || '');
            };
            reader.readAsDataURL(file);
        }
    };

    const handlerSubmitCreateFacility = (data: FieldValues) => {
        console.log(data)
    }
    
    return (
        <form className='py-5 w-full' onSubmit={handleSubmit(handlerSubmitCreateFacility)}>
            <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo cơ sở mới' center />
            <div className='mt-10 grid grid-cols-2 gap-10'>
                <div>
                    <div className='mb-3'>
                        <Input
                            label='Tên cơ sở (*)'
                            type='text'
                            name='name'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập tên cơ sở",
                            }}
                        />
                    </div>
                    <div>
                        <TextEditor
                            label='Mô tả cơ sở (*)'
                            type='text'
                            name='description'
                            control={control}
                            className='min-h-40 max-h-64 overflow-y-auto'
                            rules={{
                                required: "Vui lòng nhập mô tả sân",
                            }}
                        />

                    </div>
                </div>
                <div>
                    <Label className='hover:cursor-pointer' htmlFor="file-upload" value="Ảnh cơ sở hoặc logo (*)" />
                    <FileInput
                        {...register('image', { required: true })}
                        onInput={handleFileChange}
                        id="file-upload"
                        helperText={`${getFieldState('image')?.error ? 'Vui chọn ảnh hoặc logo công ty' : ''}`}
                        color={
                            getFieldState('image')?.error ? "failure" : !getFieldState('image').isDirty ? "" : "success"
                        }
                    />

                    <div>
                        {imageSrc && (
                            <div>
                                <img src={imageSrc} alt="ảnh công ty" className="mt-4 h-48 w-auto object-contain" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='mt-10 grid sm:grid-cols-2 gap-10'>
                <div>
                    <Input
                        label='Tỉnh / Thành phố (*)'
                        type='text'
                        name='province'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập tên Tỉnh / Thành phố (*)",
                        }}
                    />
                    <Input
                        label='Tên Quận / Huyện (*)'
                        type='text'
                        name='district'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập tên Quận / Huyện (*)",
                        }}
                    />
                </div>
                <div>
                    <Input
                        label='Tên Phường / Xã (*)'
                        type='text'
                        name='ward'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập tên Phường / Xã (*)",
                        }}
                    />
                    <Input
                        label='Địa chỉ'
                        type='text'
                        name='address'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập địa chỉ",
                        }}
                    />
                </div>
            </div>
            <div className='mt-10'>
                <Label htmlFor="file-upload" value="Chọn địa chỉ trên google map (*)" />
            </div>
            <Button type='submit'>Tạo mới</Button>
        </form>
    )
}
