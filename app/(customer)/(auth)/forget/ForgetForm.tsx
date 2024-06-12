import { Heading, Input, NotificationCustom } from '@components/index'
import { sendForgetPassword } from '@services/index';
import { Button, Spinner } from 'flowbite-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { IoArrowBackOutline } from "react-icons/io5";
export default function ForgetForm({onEmailSubmit}:{onEmailSubmit: Function}) {
    const [error, setError] = useState('');
    const { control, handleSubmit, setFocus, reset, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
    async function handleForgetForm(data: FieldValues) {
        setError("")
        try {
            var res = await sendForgetPassword(data.email);
            if (res.status === 200) {
                onEmailSubmit(data.email)
            } else {
                setError("Email không hợp lệ")
            }
        } catch {
            setError("Lỗi hệ thống vui lòng thử lại")
        }
    }
    return (
        <form method='POST' className='flex flex-col justify-center h-[100%] p-5' onSubmit={handleSubmit(handleForgetForm)}>
            <div className='flex flex-row items-center mb-8'>
                <Link href="/signin" className='h-5 w-5'>
                    <IoArrowBackOutline className='font-bold text-2xl' />
                </Link>
                <div className='w-full'>
                    <Heading title='Quên mật khẩu' center />
                </div>
            </div>
            <NotificationCustom error={error} />
            <Input
                label='Email'
                type='email'
                control={control}
                name='email'
                rules={{ required: "Vui lòng nhập email" }}
            />
            <Button type='submit' className='mt-2 focus:ring-transparent'>
                {isSubmitting ? <Spinner /> : "Gửi"}
            </Button>
        </form>
    )
}
