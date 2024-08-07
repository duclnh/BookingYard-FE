"use client"
import { Button, Textarea, TextInput } from 'flowbite-react'
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
export default function Register() {
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
                <form className="flex max-w-md flex-col gap-4">
                    <div>
                        <TextInput placeholder='Họ Tên (*)' type="text" required />
                    </div>
                    <div className='grid grid-cols-2 gap-5'>
                        <TextInput type="email" placeholder="Số Điện Thoại (*)" required />
                        <TextInput type="email" placeholder="Email (*)" required />
                    </div>
                    <div>
                        <Textarea placeholder="Nội dung..." required rows={3} />
                    </div>
                    <ReCAPTCHA className="captcha" style={{ transform: "scale(0.85)", transformOrigin: "0 0" }} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
                    <Button color='blue' className='w-40' type="submit">ĐĂNG KÍ</Button>
                </form>
            </div>
        </div>
    )
}
