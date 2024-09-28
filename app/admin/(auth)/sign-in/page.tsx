"use client";
import { Input, NotificationCustom } from '@components/index'
import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn, useSession, } from 'next-auth/react';
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status: status } = useSession();
  const [error, setError] = useState('');
  const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
  async function onSubmit(data: FieldValues) {
    setError('');
    try {
      var res = await signIn(
        "credentials", {
        username: data.username,
        password: data.password,
        type: "admin",
        redirect: false
      }
      )
      if (res?.error) {
        setError("Tài khoản hoặc mật khẩu không đúng")
      }
    } catch {
      setError("Lỗi hệ thống vui lòng thử lại")
    }
  }
  useEffect(() => {
    if (session && session.user.role !== undefined) {
      toast.success("Đăng nhập thành công")
      if (session.user.role === "Admin") {
        window.location.href = "/admin/company/dashboard";
      } else if (session.user.role === "CourtOwner") {
        window.location.href = "/admin/owner/dashboard";
      } else {
        window.location.href = "/admin/owner/court";
      }
    }
  }, [status])
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
          <div className='mx-auto mb-3'>
            <Image height={27} width={100} src='/assets/images/logo.png' alt='logo' />
          </div>
          <NotificationCustom error={error} />
          <form method='POST' className='flex flex-col mt-4 gap-2' onSubmit={handleSubmit(onSubmit)}>
            <Input
              label='Tài khoản'
              type='text'
              name='username'
              control={control}
              placeholder='Tài khoản'
              rules={{
                required: "Vui lòng nhập tên tài khoản",
              }}
            />
            <Input
              label='Mật khẩu'
              type='password'
              name='password'
              control={control}
              placeholder='Mật khẩu'
              rules={{ required: "Vui lòng nhập mật khẩu" }}
            />
            <div className='flex justify-end'>
              <Link href="/admin/forget-password" className='font-sans text-sm text-neutral-500 hover:cursor-pointer hover:text-blue-500'>
                Quên mật khẩu
              </Link>
            </div>
            <Button
              disabled={isSubmitting}
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


