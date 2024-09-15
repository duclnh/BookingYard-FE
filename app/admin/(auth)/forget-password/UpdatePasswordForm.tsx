import { Heading, Input, NotificationCustom } from '@components/index';
import { updateResetPassword } from '@services/index';
import { Button, Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function UpdatePasswordForm({ email, verifyCode }: { email: string, verifyCode: string }) {
    const router = useRouter();
    const [error, setError] = useState('');
    const { control, getValues, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
    async function handleSubmitForm(data: FieldValues) {
        try {
            var res = await updateResetPassword(email, verifyCode, data.password)
            if (res.status === 200) {
                toast("Cập nhật mật khẩu thành công", {duration: 120})
                router.push("/admin/sign-in")
            } else {
                setError("Cập nhật mật khẩu mới thất bại")
            }
        } catch {
            setError("Lỗi hệ thống vui lòng thử lại")
        }
    }
    return (
        <div className='flex flex-col justify-center h-[100%] p-5'>
            <Heading title='Mật khẩu mới' center />
            <NotificationCustom error={error} />
            <form method='POST' className='flex flex-col mt-5 gap-3' onSubmit={handleSubmit(handleSubmitForm)} >
                <Input
                    label='Mật khẩu mới'
                    type='password'
                    name='password'
                    placeholder='Mật khẩu mới'
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
                    placeholder='Xác nhận mật khẩu'
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
                    {isSubmitting ? <Spinner /> : "Cập nhật mật khẩu"}
                </Button>
            </form>
        </div>
    )
}
