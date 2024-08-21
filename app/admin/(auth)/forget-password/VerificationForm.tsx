import { Heading, Input, NotificationCustom } from '@components/index'
import { sendForgetPassword, verificationResetPassword } from '@services/authService';
import { convertNumberToTime } from '@utils/index';

import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';

export default function VerificationForm({ email, onCodeSubmit }: { email: string, onCodeSubmit: Function }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [countDown, setCountdown] = useState(30);
    const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
    async function handleVerifyForm(data: FieldValues) {
        try {
            var res = await verificationResetPassword(email, data.verifyCode)
            if (res.status === 200) {
                onCodeSubmit(data.verifyCode)
            } else {
                if (res.data.title.includes("expiration")) {
                    setError("Mã xác nhận đã hết hạn. Vui lòng gửi lại mã xác nhận")
                } else {
                    setError("Xác nhận tài khoản thất bạn")
                }
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

            var res = await sendForgetPassword(email)
            if (res.status !== 200) {
                setError("Gửi lại mã xác nhận thất bại")
            } else {
                setSuccess("Kiểm tra gmail để lấy mã xác nhận")
                setCountdown(120)
            }
        } catch (error) {
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form method='POST' className='flex flex-col justify-center h-[100%] p-5' onSubmit={handleSubmit(handleVerifyForm)}>
            <div className='w-full mb-8'>
                <Heading title='Xác nhận mật khẩu' center />
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
    )
}
