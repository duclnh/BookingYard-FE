"use client"
import { Heading, Input, NotificationCustom } from '@components/index'
import { sendCodeVerification, verificationAccount } from '@services/authService';
import { convertNumberToTime } from '@utils/index';
import { Button, Spinner } from 'flowbite-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function VerifyForm() {
    const router = useRouter();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [countDown, setCountdown] = useState(30);
    const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
    async function handleVerifyForm(data: FieldValues) {
        try {
            var res = await verificationAccount(session?.user.userID || '', data.verifyCode)
            if (res.status === 200) {
                toast.success("Xác nhận tài khoản thành công")
                await signOut();
                router.push("/sign-in")
            } else {
                setError("Xác nhận tài khoản thất bạn")
            }
        } catch (error) {
            setError("Lỗi hệ thống vui lòng thử lại")
        }
    }
    useEffect(() => {
        if (countDown === 0) return;

        const timerId = setTimeout(() => {
            setCountdown(prevCount => prevCount - 1);
        }, 1000);

        return () => clearTimeout(timerId)

    }, [countDown])
    async function sendCodeVerify() {
        if (isLoading) return;
        setSuccess("");
        try {
            setIsLoading(true)
            if (countDown !== 0) return;
            if (session != null) {
                var res = await sendCodeVerification(session.user.userID)
                if (res.status !== 200) {
                    setError("Gửi lại mã xác nhận thất bại")
                } else {
                    setSuccess("Kiểm tra gmail để lấy mã xác nhận")
                    setCountdown(120)
                }
            }
        } catch (error) {
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className='w-full md:w-[45%] h-auto px-5 py-9'>
                <form method='POST' className='flex flex-col justify-center h-[100%] p-5' onSubmit={handleSubmit(handleVerifyForm)}>
                    <div className='w-full mb-8'>
                        <Heading title='Xác nhận tài khoản' center />
                    </div>
                    <NotificationCustom error={error} success={success} />
                    <Input
                        label='Mã xác nhận'
                        type='text'
                        control={control}
                        name='verifyCode'
                        rules={{
                            required: "Vui nhập mã xác nhận",
                            pattern: {
                                value: /^[0-9]\d*$/,
                                message: "Vui lòng nhập số "
                            },
                        }}
                    />
                    <div onClick={() => sendCodeVerify()} className={`mt-3 font-light text-[14px] ${countDown === 0
                        && ("hover:text-green-500 hover:cursor-pointer")} ${isLoading ? 'hover:cursor-wait' : ''}`}>
                        Gửi lại mã xác nhận {countDown !== 0 && <>( {convertNumberToTime(countDown)} )</>}
                    </div>
                    <Button type='submit' className='mt-5 focus:ring-transparent'>
                        {isSubmitting ? <Spinner /> : "Xác nhận"}
                    </Button>
                </form>
            </div>
        </>
    )
}
