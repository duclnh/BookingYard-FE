"use client"
import { Heading, Input, NotificationCustom } from '@components/index'
import { Button, Spinner } from 'flowbite-react';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';
import { register } from '@services/index';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const { control, getValues, handleSubmit, reset, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
    async function handleSubmitForm(data: FieldValues) {
        setError("")
        try {
            var res = await register(data.name, data.email, data.password);
            if (res?.status === 201) {
                toast.success("Đăng kí thành công", { duration: 120 })
                await signIn(
                    "credentials", {
                    username: data.email,
                    password: data.password,
                    redirect: false
                }
                )
                router.push("/verify")
            } else {
                if (res?.data?.errors?.Email) {
                    setError("Email đă có người sử dụng")
                } else {
                    setError("Đăng kí thất bại. Vui lòng thử lại")
                }
            }
        } catch {
            setError("Lỗi hệ thống vui lòng thử lại")
        }
    }
    return (
        <div className='flex flex-col p-5'>
            <Heading title='Đăng kí' center />
            <NotificationCustom error={error} />
            <form method='POST' className='flex flex-col mt-5 gap-3' onSubmit={handleSubmit(handleSubmitForm)} >
                <Input
                    label='Họ và tên'
                    type='text'
                    name='name'
                    control={control}
                    rules={{
                        required: "Vui lòng nhập họ và tên", pattern: {
                            value: /(.|\s)*\S(.|\s)*/,
                            message: "Vui lòng không để trống"
                        }
                    }}
                />
                <Input
                    label='Email'
                    type='email'
                    name='email'
                    control={control}
                    rules={{
                        required: "Vui lòng nhập email",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email không hợp lệ",
                        },
                    }}
                />
                {/* <Input
        label='Số điện thoại'
        type='text'
        name='phone'
        control={control}
        rules={{
          required: "Vui lòng nhập số điện thoại", pattern: {
            value: /^0\d{9,11}$/,
            message: "Số điện thoại không hợp lệ. Bắt đầu số 0 và có 10 hoặc 12 chữ số.",
          },
        }}
      />

      <div className='mb-0.5'>
        <Label htmlFor="male" value="Giới tính" />
      </div>
      <div className='flex flex-row'>
        <div>
          <Radio className='focus:outline-none focus:ring-transparent' id="male" name="gender" value="male" defaultChecked />
          <Label className='ml-2 hover:cursor-pointer' htmlFor="male">Nam</Label>
        </div>
        <div className='ml-4'>
          <Radio className='focus:outline-none focus:ring-transparent' id="female" name="gender" value="female" />
          <Label className='ml-2 hover:cursor-pointer' htmlFor="female">Nữ</Label>
        </div>
      </div> */}
                <Input
                    label='Mật khẩu'
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
                <Button
                    type='submit'
                    className='mt-4 focus:ring-transparent'>
                    {isSubmitting ? <Spinner /> : "Đăng kí"}
                </Button>
                <div className='font-light text-sm text-neutral-500 text-center'>
                    Bạn đã có tài khoản? <Link href={"/signin"} className='hover:cursor-pointer hover:text-blue-500'>Đăng nhập</Link>
                </div>
            </form>
        </div>
    )
}
