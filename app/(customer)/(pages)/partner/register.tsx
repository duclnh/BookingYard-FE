"use client"
import { Input, InputTextArea, NotificationCustom } from '@components/index';
import { createAdvise } from '@services/supportService';
import { Spinner } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, useForm } from 'react-hook-form';
export default function Register() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [reCaptchaError, setReCaptchaError] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm({ mode: "onTouched", });

    const handleResetReCaptcha = () => {
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
    };

    const handlerSubmitContact = async (data: FieldValues) => {
        setError('');
        setSuccess(undefined);
        setReCaptchaError("")
        if (recaptchaRef.current && !recaptchaRef.current.getValue()) {
            setReCaptchaError("Vui lòng xác nhận bạn không phải là robot");
            return;
        }
        try {
            var res = await createAdvise(data.name, data.phone, data.email, data.content)
            if (res.status == 201) {
                setSuccess('Đăng kí liên lạc thành công. Nhân viên sẽ liên lạc với bạn');
                reset()
            } else if (res.status == 409) {
                setError("Hệ thống đã ghi nhận đăng kí của bạn rồi. Vui lòng chờ nhân viên liên lạc")
            } else {
                setError("Đăng kí liên lạc thất bại")
            }
        } catch {
            setError("Lỗi hệ thống vui lòng thử lại")
        }
    }
    return (
        <div id='trial' className="bg-[url('/assets/images/background-register.png')] py-14">
            <div className='mx-5 sm:mx-20 mb-10'>
                <div className='text-white mb-10'>
                    <div className='lg:text-6xl md:text-4xl text-3xl font-black'>
                        Dùng Thử Trong 30 Ngày
                    </div>
                    <div className='mt-3 font-medium lg:text-2xl'>
                        <p>Hãy để lại thông tin của bạn và chúng tôi sẽ </p>
                        <p>liên hệ với bạn ngay!</p>
                    </div>
                </div>
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(handlerSubmitContact)}>
                    <NotificationCustom error={error} success={success} />
                    <div>
                        <Input
                            placeholder='Họ và Tên (*)'
                            type='text'
                            name='name'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập tên tài khoản",
                            }}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-5'>
                        <Input
                            placeholder='Số Điện Thoại (*)'
                            type='text'
                            name='phone'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập số điện thoại",
                                pattern: {
                                    value: /^0\d{9,11}$/,
                                    message: "Số điện thoại không hợp lệ. Bắt đầu số 0 và có 10 hoặc 12 chữ số.",
                                },
                            }}
                        />
                        <Input
                            placeholder='Email (*)'
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
                    </div>
                    <div>
                        <InputTextArea
                            placeholder='Nội dung ...'
                            name='content'
                            row={3}
                            control={control}
                            rules={{
                                required: "Vui lòng nhập nội dung",
                                minLength: {
                                    value: 10,
                                    message: "Vui lòng nhập nội dung lớn hơn 10 kí tự"
                                }
                            }}
                        />
                    </div>
                    <ReCAPTCHA ref={recaptchaRef} className="captcha" style={{ transform: "scale(0.85)", transformOrigin: "0 0" }} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
                    {reCaptchaError && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{reCaptchaError}</p>
                    )}
                    <button className='w-40 text-white bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-md' type="submit">
                        {isSubmitting ?
                            <Spinner />
                            : "ĐĂNG KÍ"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}
