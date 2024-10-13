'use client'
import { Button } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import Image from 'next/image'
import { BsCalendar2Week } from 'react-icons/bs'
import { TiDownloadOutline } from 'react-icons/ti'
import { LuClipboardEdit } from 'react-icons/lu'
import { getQrCode } from '@services/bookingService'
import toast from 'react-hot-toast'

export default function BookingSuccess({ params }: { params: { id: string } }) {
    const [image, setImage] = useState<string>()
    const imgRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        getQrCode(params.id)
            .then(x => {
                if (x.status === 200) {
                    setImage(x.data)
                } else {
                    toast.error("Lỗi lấy QR Code")
                }
            }).catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
    }, [])
    const downloadImage = () => {
        const image = imgRef.current;
        if (image) {
            const link = document.createElement('a');
            link.href = image.src;
            link.download = 'QrCode.png';
            link.click();
        }
    };
    const copyImage = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        try {
            const targetElement = event.currentTarget as HTMLDivElement;
            if (imgRef.current) {
                const response = await fetch(imgRef.current.src);
                const blob = await response.blob();
                const data = [new ClipboardItem({ [blob.type]: blob })];
                await navigator.clipboard.write(data);

                const toolTip = document.createElement("div");
                toolTip.className = "absolute rounded-lg tool-tip text-center text-lg";
                toolTip.innerHTML = "Đã sao chép";
                targetElement.appendChild(toolTip);
                setTimeout(() => {
                    targetElement.removeChild(toolTip);
                }, 1000);
            } else {
                console.error('Image element not found');
            }
        } catch (error) {
            console.error('Error copying image: ', error);
        }
    };
    return (
        <div className='grid grid-flow-col py-14'>
            <div className='mx-auto'>
                <Image ref={imgRef} className='mx-auto' height={350} width={350} src={image || ""} alt='Chia có đặt lịch hẹn' />
                <div className="flex justify-center background-danger pb-5">
                    <div className="mx-2 flex items-center text-xl mr-5 hover:cursor-pointer" onClick={() => downloadImage()}>
                        <TiDownloadOutline size={25} className='mr-2' /> Tải xuống
                    </div>
                    <div className="relative mx-2 flex items-center text-xl ml-5 hover:cursor-pointer" onClick={(event) => copyImage(event)}>
                        <LuClipboardEdit size={25} className='mr-2' /> Sao chép
                    </div>
                </div>
                <div className='text-center mt-2 w-[455px]'>
                    <p className='text-3xl font-bold'>Bạn đã đặt lịch hẹn thành công</p>
                    <p className='text-lg mt-5 w-full'>
                        Bạn có thể sử dụng mã QR Code này hoặc sử dụng email và số điện thoại đã đặt lịch để Check In khi đến sân
                    </p>
                    <div className='grid grid-cols-2'>
                        <Button color='success' href={`/booking-detail/${params.id}`} size='sm' className='mt-10 w-48 mx-auto'>
                            <BsCalendar2Week className='mr-2 mt-0.5' size={16} />
                            <p>Xem chi tiết</p>
                        </Button>
                        <Button href='/' size='sm' className='mt-10 w-48 mx-auto'>
                            <AiOutlineHome className='mr-2 mt-0.5' size={16} />
                            <p>Quay lại trang chủ</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
