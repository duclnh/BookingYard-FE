"use client"
import { Input } from '@components/index'
import { Label, Radio, Textarea } from 'flowbite-react'

import React from 'react'
import { useForm } from 'react-hook-form'


export default function page() {
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
        <div className='mt-5 grid gap-5'>
          <div className='grid grid-cols-2 gap-5'>
            <Input label='Họ và tên' name='name' type='text' control={control} />
            <Input label='Email' name='email' type='email' control={control} />
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <Input label='Số điện thoại' name='phone' type='text' control={control} />
            <div className='mb-0.5'>
              <Label htmlFor="male" value="Giới tính" />
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
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Địa chỉ" />
              </div>
              <Textarea id="address" placeholder="" required rows={4} />
            </div>
          </div>
        </div>
        <button className='float-end bg-blue-700 text-white px-4 leading-8 my-10 rounded-lg' type='submit'>Cập nhật</button>
      </div>
    </div>
  )
}
