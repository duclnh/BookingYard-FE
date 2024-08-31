import { CardStatistic, Heading } from '@components/index'
import { Button, Label, Popover } from 'flowbite-react'
import React from 'react'
import { BsBuilding, BsBuildingCheck, BsBuildingFillX } from 'react-icons/bs'
import { IoMdSearch } from 'react-icons/io'
import Image from 'next/image'
import { TiGroup } from 'react-icons/ti'
import { HiOutlineUserGroup } from 'react-icons/hi'
export default function Facility() {
  return (
    <>
      <div className='py-5 w-full'>
        <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Danh sách các sân' center />
        <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
          <CardStatistic
            title='Tổng số sân'
            amount={3000}
            icon={BsBuilding}
            gradientFrom='from-cyan-700'
            gradientTo='to-cyan-500'
            iconColor='text-cyan-700'
          />
          <CardStatistic
            title='Đang hoạt động'
            amount={3300}
            icon={BsBuildingCheck}
            gradientFrom='from-green-700'
            gradientTo='to-green-500'
            iconColor='text-green-700'
          />
          <CardStatistic
            title='Đang bảo trì'
            amount={3300}
            icon={BsBuildingFillX}
            gradientFrom='from-yellow-700'
            gradientTo='to-yellow-500'
            iconColor='text-yellow-700'
          />
        </div>
        <div className='mt-36 bg-white'>
          <div className='mt-10 grid md:grid-cols-3 gap-7 mb-3'>
            <div className='md:col-span-2 flex'>
              <input className='border rounded-md px-3 sm:w-96 w-80' name='search' placeholder={'Tìm kiếm theo tên cơ sở, địa chỉ'} />
              <Button className='p-1'>
                <IoMdSearch className='font-bold' size={18} />
              </Button>
            </div>
            <div className=' grid grid-cols-2 gap-5'>
              <Popover
                aria-labelledby="price-popover"
                trigger='hover'
                content={
                  <div className="px-3 py-2 block">
                    <Label htmlFor="default-price" value="Môn thể thao" />
                    <div className='grid grid-cols-3 gap-4 py-2'>
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className='border w-20 leading-10 text-center rounded-xl hover:cursor-pointer'>
                          Bóng {index}
                        </div>
                      ))}
                    </div>
                    <div className='flex'>
                      <Button className='mt-3 focus:ring-transparent mx-auto' size='xs'>14 kết quả</Button>
                      <Button color='failure' className='mt-3 focus:ring-transparent mx-auto' size='xs'>Xóa</Button>
                    </div>
                  </div>
                }
              >
                <button color='gray' className='font-light bg-[#f9fafb] border-gray-300 rounded-lg border'>Môn thể thao</button>
              </Popover>
              <select className='font-light bg-[#f9fafb] border-gray-300 rounded-lg border focus:ring-transparent focus:border-gray-300'>
                <option value="">Tất cả</option>
                <option value="">Đang hoạt động</option>
                <option value="">Đang bảo trì</option>
              </select>
            </div>
          </div>
        </div>
        <div className='mt-10 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-14'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='shadow-sm-light border hover:cursor-pointer rounded-lg p-4 relative'>
              <Image className='rounded-lg' height={500} width={500} src="/assets/images/contact.png" alt="img" />
              <div className='font-bold mb-5 text-center text-xl'>Sân 1</div>
              <div className='absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-700'></div>
              <div className='flex justify-center'>
                <Button color={"gray"} className='mt-5 mx-auto' size='xs'>Bóng đá</Button>
                <Button color={"gray"} className='mt-5 mx-auto' size='xs'>
                  <HiOutlineUserGroup size={17} />
                  <p className='ml-3 text-[15px]'>3</p>
                </Button>
              </div>
              <div className='mt-5 flex flex-col gap-3'>
                <div className='flex justify-between border p-2 rounded-md'>
                  <p className='font-bold'>Giá lượt:</p>
                  <p className='font-medium'>30.000 VND</p>
                </div>
                <div className='flex justify-between border p-2 rounded-md'>
                  <p className='font-bold'>Giá tháng:</p>
                  <p className='font-medium'>900.000 VND</p>
                </div>
                <div className='flex justify-between border p-2 rounded-md'>
                  <p className='font-bold'>Giá năm:</p>
                  <p className='font-medium'>3.000.000 VND</p>
                </div>
              </div>
              <Button href='/admin/company/facility/detail' className='mt-5 mx-auto' size='xs'>Xem chi tiết</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
