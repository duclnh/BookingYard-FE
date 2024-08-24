"use client"
import { Heading, Input, ModalView } from '@components/index'
import { Button, FileInput, Label, Select } from 'flowbite-react';
import React, { useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('@components/TextEditor/TextEditor'), {
    ssr: false,
});
const MapCustom = dynamic(() => import('@components/MapCustom/MapCustom'), {
    ssr: false,
});


export default function CreatePage() {
    const { control, handleSubmit, register, formState: { isSubmitting, isValid }, getFieldState, setValue, getValues, } = useForm({ mode: "onTouched", });
    const [modalMap, setModalMap] = useState(false);
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

    const handlerSetValuePosition = (position: [number, number]) => {
        setValue('location', position)
    }

    const handlerSubmitCreateFacility = (data: FieldValues) => {
        console.log(data)
    }

    return (
        <>
            <button onClick={() => console.log(getValues())}>check</button>
            <form method='POST' className='py-5 w-full' onSubmit={handleSubmit(handlerSubmitCreateFacility)}>
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
                                name='description'
                                control={control}
                                className='min-h-40 max-h-64 overflow-y-auto z-10'
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
                        <div>
                            <Input
                                label='Tỉnh (*)'
                                type='text'
                                name='province'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập tên Tỉnh",
                                }}
                            />
                        </div>
                        <div className='mt-3'>
                            <Input
                                label='Tên Quận / Huyện (*)'
                                type='text'
                                name='district'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập tên Quận / Huyện",
                                }}
                            />
                        </div>
                        <div className='mt-3'>
                            <Input
                                label='Email (*)'
                                type='text'
                                name='email'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập email",
                                }}
                            />
                        </div>
                        <div className='mt-3'>
                            <Label htmlFor='package' value='Gói sân (*)' />
                            <Controller
                                name='package'
                                control={control}
                                rules={{ required: 'Vui lòng chọn gói sân' }}
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
                                            <option value=''>Gói sân</option>
                                            <option value="Canada">Miễn phí</option>
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
                    </div>
                    <div>
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
                        </div>
                        <div className='mt-3'>
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
                        <div className='mt-3'>
                            <Input
                                label='Số điện thoại (*)'
                                type='text'
                                name='phone'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập số điện thoại",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='my-10'>
                    <Label className='mb-2' htmlFor="file-upload" value="Chọn vị trí trên bản đồ (*)" />
                    {!modalMap && (
                        <MapCustom
                            placePosition={getValues("location")}
                            setPlacePosition={handlerSetValuePosition}
                            handlerExpand={setModalMap}
                            className='min-h-[600px] max-w-[1220px] !z-10'
                        />
                    )}
                    <Input
                        type='hidden'
                        name='location'
                        control={control}
                        rules={{
                            required: "Vui lòng chọn vị trí điểm trên bản đồ",
                        }}
                    />
                </div>
                <Button type='submit'>Tạo mới</Button>
            </form>
            {/*Start view Map */}
            <ModalView key={'View Map'} toggle={modalMap} setToggle={setModalMap}>
                <div className='rounded-lg bg-white shadow dark:bg-gray-700 items-center justify-center w-[100%] h-[100%]'>
                    {modalMap && (
                        <MapCustom
                            placePosition={getValues("location")}
                            setPlacePosition={handlerSetValuePosition}
                            handlerExpand={setModalMap}
                            className='w-full h-full !z-10'
                        />
                    )}
                </div>
            </ModalView>
            {/*End view Map */}
        </>
    )
}
