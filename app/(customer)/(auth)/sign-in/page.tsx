"use client";
import { Heading, Input, NotificationCustom } from '@components/index'
import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");

    if (errorParam?.includes("This email is banned")) {
      setError("Tài khoản đã bị khóa. Vui lòng liên hệ hệ thống để biết thêm chi tiết");
    } else if (errorParam?.includes("This email is already registered")) {
      setError("Email này đã được đăng ký bởi tài khoản khác rồi");
    }else if(errorParam){
      setError("Lỗi hệ thống, vui lòng thử lại");
    }
  }, []);
  const { control, handleSubmit, formState: { isSubmitting, isValid }, } = useForm({ mode: "onTouched", });
  async function onSubmit(data: FieldValues) {
    setError('');
    try {
      let res = await signIn(
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
        if (res.error == "fetch failed") {
          setError("Lỗi hệ thống vui lòng thử lại")
        } else if (res.error == "User is banned!") {
          setError("Tài khoản đã bị khóa. Vui lòng liên hệ thống để biết thêm chi tiết")
        } else {
          setError("Tài khoản hoặc mật khẩu không đúng")
        }
      }
    } catch {
      setError("Lỗi hệ thống vui lòng thử lại")
    }
  }
  async function loginGoogle() {
    setError('');
    try {
      await signIn("google", {
        callbackUrl: "/"
      })
    } catch {
      setError("Lỗi hệ thống vui lòng thử lại")
    }
  }
  return (
    <>
      <img className='hidden md:block w-full md:w-[55%] md:min-w-[65%] h-auto rounded-md object-fill object-left' src="assets/images/login.png" alt="login" />
      <div className='w-full md:w-[45%] h-auto px-5 py-9'>
        <div className='flex flex-col p-4'>
          <Link href="/" className='mx-auto mb-3'>
            <img height={27} width={100} src='assets/images/logo.png' alt='logo' />
          </Link>
          <Heading title='Đăng nhập' center />
          <NotificationCustom error={error} />
          <form method='POST' className='flex flex-col mt-4 gap-2' onSubmit={handleSubmit(onSubmit)}>
            <Input
              label='Email/Số điện thoại'
              type='text'
              name='username'
              placeholder='Email/Số điện thoại'
              control={control}
              rules={{
                required: "Vui lòng nhập tên tài khoản",
              }}
            />
            <Input
              label='Mật khẩu'
              placeholder='Mật khẩu'
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
            <div className='font-sans text-sm text-neutral-500 text-center'>
              Bạn chưa có tài khoản? <Link href="/sign-up" className='hover:cursor-pointer hover:text-blue-500'>Đăng kí</Link>
            </div>
            <div className="flex flex-row justify-between items-center p-5">
              <div className="bg-slate-300 h-px w-full"></div>
              <div className='mx-5 font-bold text-sm text-neutral-500'>Hoặc</div>
              <div className="bg-slate-300 h-px w-full"></div>
            </div>
            <Button onClick={() => loginGoogle()} className='bg-transparent text-black shadow-[0_0_5px_rgba(0,0,0,0.1)] hover:enabled:bg-slate-50  focus:ring-transparent'>
              <Image className='mr-2' src='/assets/images/google.png' height={25} width={25} alt='google' /> Đăng nhập bằng Google
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}


