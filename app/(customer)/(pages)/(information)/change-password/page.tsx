"use client"
import { Input, NotificationCustom } from '@components/index';
import { useAppSelector } from '@hooks/hooks';
import { updatePassword } from '@services/index';
import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ChangePassword() {
  const { control, getValues, handleSubmit, reset, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
  const user = useAppSelector(state => state.user.value);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const handlerUpdatePassword = async (data: FieldValues) => {
    setError('')
    setSuccess('')
    try {
      var res = await updatePassword(user?.id, data.oldpassword, data.password)
      if (res.status === 200) {
        setSuccess("Cập nhật mật khẩu mới thành công")
        reset()
      } else {
        console.log(res.data.title)
        if (res.data.title === "Old password not match") {
          setError("Mật khẩu cũ không đúng")
        } else {
          toast.error("Lỗi hệ thống vui lòng thử lại")
        }
      }
    } catch {
      toast.error("Lỗi hệ thống vui lòng thử lại")
    }
  }
  return (
    <div className='col-span-3 rounded-2xl border'>
      <div className='text-2xl font-bold border-b-2 px-5 py-3'>
        Cập nhật khẩu mới
      </div>
      <form method='PUT' className='p-5' onSubmit={handleSubmit(handlerUpdatePassword)}>
        <NotificationCustom success={success} error={error} />
        <div className='mt-5 grid gap-5'>
          <Input
            label='Mật khẩu hiện tại'
            type='password'
            name='oldpassword'
            control={control}
            rules={{
              required: "Vui lòng nhập nhập mật khẩu hiện tại",
            }}
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
        <Button size='sm' className='float-end px-4 leading-8 my-10 rounded-lg' type='submit'>Cập nhật</Button>
      </form>
    </div>
  )
}
