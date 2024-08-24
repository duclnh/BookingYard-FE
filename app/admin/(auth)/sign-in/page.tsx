"use client";
import { Heading, Input, NotificationCustom } from '@components/index'
import { Button, Spinner } from 'flowbite-react';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('');
  const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
  async function onSubmit(data: FieldValues) {
    setError('');
    try {
      var res = await signIn(
        "credentials", {
        username: data.username,
        password: data.password,
        redirect: false
      }
      )
      if (!res?.error) {
        toast.success("Đăng nhập thành công")
        router.push("/")
      } else {
        setError("Tài khoản hoặc mật khẩu không đúng")
      }
    } catch {
      setError("Lỗi hệ thống vui lòng thử lại")
    }
  }
  async function loginGoogle() {
    setError('');
    try {
      await signIn("google",
        {
          callbackUrl: "/"
        }
      )
    } catch {
      setError("Lỗi hệ thống vui lòng thử lại")
    }
  }
  return (
    <>
      <div className='w-full h-auto bg-cyan-900 rounded-l-lg py-8'>
        <Image height={1000} width={1000} className='object-fill object-left' src="/assets/images/manage-court.png" alt="login" />
        <div className='mt-7 flex justify-center'>
          <div className='space-y-3 w-60'>
            <div className='flex'>
              <Image height={24} width={24} src="/assets/images/star.png" alt="login" />
              <p className='text-white ml-6'>Quản lí đa dạng sân</p>
            </div>
            <div className='flex'>
              <Image height={24} width={24} src="/assets/images/star.png" alt="login" />
              <p className='text-white ml-6'>Xem lịch trình dễ dàng</p>
            </div>
            <div className='flex'>
              <Image height={24} width={24} src="/assets/images/star.png" alt="login" />
              <p className='text-white ml-6'>Nâng cao doanh thu</p>
            </div>
            <div className='flex'>
              <Image height={24} width={24} src="/assets/images/star.png" alt="login" />
              <p className='text-white ml-6'>Tối ưu sân</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-auto px-5 py-9'>
        <div className='flex flex-col p-4'>
          <Link href="/" className='mx-auto mb-3'>
            <Image height={27} width={100} src='/assets/images/logo.png' alt='logo' />
          </Link>
          <NotificationCustom error={error} />
          <form method='POST' className='flex flex-col mt-4 gap-2' onSubmit={handleSubmit(onSubmit)}>
            <Input
              label='Email/Số điện thoại'
              type='text'
              name='username'
              control={control}
              rules={{
                required: "Vui lòng nhập tên tài khoản",
              }}
            />
            <Input
              label='Mật khẩu'
              type='password'
              name='password'
              control={control}
              rules={{ required: "Vui lòng nhập mật khẩu" }}
            />
            <div className='flex justify-end'>
              <Link href="/forget-password" className='font-sans text-sm text-neutral-500 hover:cursor-pointer hover:text-blue-500'>
                Quên mật khẩu
              </Link>
            </div>
            <Button
              type='submit'
              className='mt-1 focus:ring-transparent'>
              {isSubmitting ? <Spinner /> : "Đăng nhập"}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}


