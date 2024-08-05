"use client"
import { ModalView } from '@components/index'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { CgScan } from 'react-icons/cg'
import { FaRegMoneyBillAlt, FaRegUser } from 'react-icons/fa'
import { FaPeopleRobbery } from 'react-icons/fa6'
import { FiUserCheck } from 'react-icons/fi'
import { GiReceiveMoney } from 'react-icons/gi'
import { IoIosTimer } from 'react-icons/io'
import { IoPhonePortraitOutline, IoWalletOutline } from 'react-icons/io5'
import { LuClipboardEdit } from 'react-icons/lu'
import { MdOutlineDateRange } from 'react-icons/md'
import { PiCourtBasketballLight } from 'react-icons/pi'
import { RiDiscountPercentLine } from 'react-icons/ri'
import { TiDownloadOutline, TiLocation } from 'react-icons/ti'

export default function BookingDetail() {
  const [openModal, setOpenModal] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
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
    <>
      <div className='col-span-3 rounded-2xl border'>
        <div className='text-2xl font-bold border-b-2 px-5 py-3'>
          Chi tiết đặt lịch hẹn
        </div>
        <div className='p-10'>
          <div className='flex justify-between items-center'>
            <img height={80} width={80} src="assets/images/logo.png" alt="nam thien" />
            <Link href={"/facility"} className='ml-5 text-2xl font-medium'>
              <div className='text-center'>Cong ty ha thien nam</div>
              <div className='flex text-sm mt-3'>
                <TiLocation size={20} className='mr-1' />
                146 Nam Hòa, phường Phước Long A, TP. Thủ Đức
              </div>
            </Link>
            <img onClick={() => setOpenModal(true)} ref={imgRef} className='hover:cursor-pointer' height={120} width={120} src="assets/images/QR_Code.svg" alt="qrcode" />
          </div>
          <div className='mt-10 grid lg:grid-cols-2 lg:gap-16'>
            <div>
              <div className='flex items-center mt-4'>
                <CgScan size={30} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Mã đặt lịch:</div>
                  <div className='float-end font-medium'>312312342142</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <PiCourtBasketballLight size={30} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Sân:</div>
                  <div className='float-end font-medium'>Sấn số 3</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <FaRegUser size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Người đặt:</div>
                  <div className='float-end font-medium'>312312342142</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <IoPhonePortraitOutline size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Số điện thoại:</div>
                  <div className='float-end font-medium'>312312342142</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <IoWalletOutline size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Phương thức thanh toán:</div>
                  <div className='float-end font-medium'>Tiền mặt</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <GiReceiveMoney size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Trạng thái thanh toán:</div>
                  <div className='float-end font-medium'>Đã thanh toán</div>
                </div>
              </div>
            </div>
            <div>
              <div className='flex items-center mt-4'>
                <MdOutlineDateRange size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Ngày đặt:</div>
                  <div className='float-end font-medium'>312312342142</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <FaPeopleRobbery size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Ngày chơi:</div>
                  <div className='float-end font-medium'>312312342142</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <IoIosTimer size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Thời gian:</div>
                  <div className='float-end font-medium'>5:00 - 6:00</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <FiUserCheck size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Check in:</div>
                  <div className='float-end font-medium'>Chưa check in</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <RiDiscountPercentLine size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Giảm giá:</div>
                  <div className='float-end font-medium'>20 %</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <FaRegMoneyBillAlt size={25} className='mr-2' />
                <div className='w-full'>
                  <div className='float-start'>Tổng tiền:</div>
                  <div className='float-end font-medium'>123123414</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalView toggle={openModal} setToggle={setOpenModal}>
        <div className='rounded-lg bg-white shadow dark:bg-gray-700 items-center justify-center'>
          <img className='p-5' height={450} width={450} src={imgRef.current ? imgRef.current.src : ''} alt="qrcode" />
          <div className="flex justify-center background-danger pb-5">
            <div className="mx-2 flex items-center text-xl mr-5 hover:cursor-pointer" onClick={() => downloadImage()}>
              <TiDownloadOutline size={25} className='mr-2' /> Tải xuống
            </div>
            <div className="relative mx-2 flex items-center text-xl ml-5 hover:cursor-pointer" onClick={(event) => copyImage(event)}>
              <LuClipboardEdit size={25} className='mr-2' /> Sao chép
            </div>
          </div>
        </div>
      </ModalView>
    </>
  )
}
