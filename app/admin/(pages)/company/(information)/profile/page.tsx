"use client"
import { Input } from '@components/index'
import { Button, Label, Radio, Select } from 'flowbite-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function Profile() {
    const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
    return (
        <div className='col-span-3 rounded-2xl border'>
            <div className='text-2xl font-bold border-b-2 px-5 py-3'>
                Thông tin cá nhân
            </div>
            <div className='p-5'>
                <div>Tải ảnh hồ sơ của bạn lên <span className='text-red-700'>*</span></div>
                <div className='mt-3 flex items-center justify-between w-56'>
                    <img height={70} width={70} src="assets/images/avatar-default.png" alt="avatar" />
                    <label className='inline-block bg-[#edecfb] text-blue-700 font-medium rounded-md p-1 px-3 hover:cursor-pointer' htmlFor="file">Thay đổi ảnh</label>
                    <input id='file' hidden type='file' />
                </div>
                <div className='mt-5 grid grid-cols-2 gap-10'>
                    <div>
                        <Input label='Họ và tên (*)' name='name' type='text' control={control} />
                        <div className='mt-3'>
                            <Input label='Số điện thoại (*)' name='phone' type='text' control={control} />
                        </div>
                    </div>
                    <div>
                        <Input label='Email (*)' name='email' type='email' control={control} />
                        <div className='mt-3'>
                            <Label htmlFor="male" value="Giới tính (*)" />
                            <div className='grid grid-cols-2 gap-2 lg:grid-cols-3 w-44 mt-3 lg:gap-5'>
                                <div className="flex items-center gap-2">
                                    <Radio id="male" name="gender" value="male" defaultChecked />
                                    <Label htmlFor="male">Nam</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio id="female" name="gender" value="female" />
                                    <Label htmlFor="female">Nữ</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio id="other" name="gender" value="other" />
                                    <Label htmlFor="other">Khác</Label>
                                </div>
                            </div>
                        </div>
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
            </div>
            <Button size='sm' color='blue' className='float-end px-4 leading-8 my-10 rounded-lg' type='submit'>Cập nhật</Button>
        </div>
    )
}