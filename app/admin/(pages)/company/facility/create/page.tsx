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
            <form method='POST' className='py-5 w-full' onSubmit={handleSubmit(handlerSubmitCreateFacility)}>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo cơ sở mới' center />
                <div className='mt-10 grid md:grid-cols-2 gap-10'>
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
                        <div className='mb-3'>
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
                    <div>
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
                <div className='mt-3 grid sm:grid-cols-2'>
                    <div className='mb-3 sm:mr-5'>
                        <Label htmlFor='province' value='Tỉnh (*)' />
                        <Controller
                            name='province'
                            control={control}
                            rules={{ required: 'Vui lòng chọn tỉnh' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Select
                                        {...field}
                                        className='focus:ring-transparent'
                                        id="province"
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Tỉnh</option>
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
                    <div className='mb-3 sm:ml-5'>
                        <Label htmlFor='province' value='Quận / Huyện (*)' />
                        <Controller
                            name='district'
                            control={control}
                            rules={{ required: 'Vui lòng chọn Quận / Huyện ' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Select
                                        {...field}
                                        className='focus:ring-transparent'
                                        id="district"
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Quận / Huyện</option>
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
                    <div className='sm:mr-5'>
                        <Label htmlFor='province' value='Phường / Xã (*)' />
                        <Controller
                            name='ward'
                            control={control}
                            rules={{ required: 'Vui lòng chọn Phường / Xã ' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Select
                                        {...field}
                                        className='focus:ring-transparent'
                                        id="ward"
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Phường / Xã</option>
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
                    <div className='sm:ml-5'>
                        <Input
                            label='Địa chỉ (*)'
                            type='text'
                            name='address'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập địa chỉ",
                            }}
                        />
                    </div>
                </div>
                <div className='mt-3 grid sm:grid-cols-2'>
                    <div className='mb-3 sm:mr-5'>
                        <Label htmlFor='open' value='Thời gian mở cửa (*)' />
                        <Controller
                            name='open'
                            control={control}
                            rules={{ required: 'Vui lòng nhập thời gian mở cửa' }}
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
                                        <option value=''>Chọn thời gian mở cửa</option>
                                        {[...Array(24)].map((_, index) => (
                                            <option key={index} value={`${index + 1}:00`}>{`${index + 1}:00`}</option>
                                        ))}
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
                    <div className='mb-3 sm:ml-5'>
                        <Label htmlFor='close' value='Thời gian đóng cửa (*)' />
                        <Controller
                            name='close'
                            control={control}
                            rules={{ required: 'Vui lòng chọn thời gian đóng cửa' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Select
                                        {...field}
                                        className='focus:ring-transparent'
                                        id="close"
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Chọn thời gian đóng cửa</option>
                                        {[...Array(24)].map((_, index) => (
                                            <option key={index} value={`${index + 1}:00`}>{`${index + 1}:00`}</option>
                                        ))}
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
                    <div className='mr-5'>
                        <Label htmlFor='time' value='Số buổi trong tuần' />
                        <div className=' mt-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className='border p-1 text-center rounded-lg hover:cursor-pointer hover:bg-black hover:text-white font-md'>{`Thứ ${index + 2}`}</div>
                            ))}
                            <div className='border p-1 text-center rounded-lg hover:cursor-pointer font-md hover:bg-black hover:text-white'>Thứ bảy</div>
                            <div className='border p-1 text-center rounded-lg hover:cursor-pointer font-md hover:bg-black hover:text-white bg-black text-white'>Chủ nhật</div>
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
                            className='min-h-[600px] w-full !z-10'
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
            </form >
            {/*Start view Map */}
            <ModalView key={'View Map'} toggle={modalMap} setToggle={setModalMap} >
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
