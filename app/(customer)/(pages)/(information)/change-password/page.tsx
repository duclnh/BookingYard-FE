"use client"
import { Input } from '@components/index';
import React from 'react'
import { useForm } from 'react-hook-form';

export default function page() {
  const { control, getValues, handleSubmit, reset, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
  return (
    <div className='col-span-3 rounded-2xl border'>
      <div className='text-2xl font-bold border-b-2 px-5 py-3'>
        Cập nhật khẩu mới
      </div>
      <form method='POST' className='p-5'>
        <div className='mt-5 grid gap-5'>
        <Input
            label='Mật khẩu hiện tại'
            type='password'
            name='oldpassword'
            control={control}
          />
          <Input
            label='Mật khẩu mới'
            type='password'
            name='password'
            control={control}
            rules={{
              required: "Vui lòng nhập nhập mật khẩu",
              minLength: {
                value: 6,
                message: 'Mật khẩu ít nhất 5 kí tự',
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/,
                message: "Mật khẩu chứa ít nhất một kí tự hoa, ít nhất một kí tự đặc biệt"
              }
            }}
          />
          <Input
            label='Xác nhận mật khẩu'
            type='password'
            name='RePassword'
            control={control}
            rules={{
              required: "Vui lòng nhập xác nhận mật khẩu",
              validate: (value) => {
                if (value !== getValues("password")) {
                  return "Xác nhận mật khẩu không khớp"
                }
                return true;
              }
            }}
          />
        </div>
        <button className='float-end bg-blue-700 text-white px-4 leading-8 my-10 rounded-lg' type='submit'>Cập nhật</button>
      </form>
    </div>
  )
}
