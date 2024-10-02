"use client"
import { CardStatistic, Heading } from '@components/index'
import { Button, Label, Popover } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { BsBuilding, BsBuildingCheck, BsBuildingFillX } from 'react-icons/bs'
import { IoMdSearch } from 'react-icons/io'
import Image from 'next/image'
import { TiLocation, TiUser } from 'react-icons/ti'
import { FacilityAdmin, PageResult, SportCreate } from 'types'
import toast from 'react-hot-toast'
import { getSportCreate } from '@services/sportService'
import qs from "query-string";
import { getFacilityAdmin } from '@services/facilityService'
import { getImage } from '@utils/imageOptions'

export default function Facility() {
  const [facilities, setFacilities] = useState<PageResult<FacilityAdmin> | undefined>(undefined)
  const [sports, setSports] = useState<SportCreate[]>([])


  const [currentPageSize, setCurrentPageSize] = useState(5);

  const url = qs.stringifyUrl({
    url: "", query: {
      "search": "",
      "currentPage": 1,
      "pageSize": currentPageSize,
    }
  });

  useEffect(() => {
    getSportCreate()
      .then(x => {
        if (x.status === 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy thông tin thể thao")
        }
      }).then((sport: SportCreate[]) => {
        setSports(sport)
      }).catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))


  }, [])

  useEffect(() => {
    getFacilityAdmin(url)
      .then(x => {
        if (x.status === 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy thông tin thể thao")
        }
      }).then((facilities: PageResult<FacilityAdmin>) => {
        setFacilities(facilities)
      }).catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
  }, [url])



  return (
    <>
      <div className='py-5 w-full'>
        <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Danh sách các cơ sở' center />
        {/* <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
          <CardStatistic
            title='Tổng số cơ sở'
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
            title='Đã ngưng hoạt động'
            amount={3300}
            icon={BsBuildingFillX}
            gradientFrom='from-red-700'
            gradientTo='to-red-500'
            iconColor='text-red-700'
          />
        </div> */}
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
                      {sports.map((sport: SportCreate, index) => (
                        <div key={index} className={`border w-20 leading-10 text-center rounded-xl hover:cursor-pointer hover:bg-black hover:text-white}`}>
                          {sport.sportName}
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
                <option value="all">Tất cả</option>
                <option value="active">Đang hoạt động</option>
                <option value="maintenance">Đang bảo trì</option>
                <option value="inactive">Đã ngưng hoạt động</option>
              </select>
            </div>
          </div>
        </div>
        <div className='mt-10 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-14'>
          {facilities != undefined && facilities.results.map((facility: FacilityAdmin, index) => (
            <div key={index} className='shadow-sm-light border hover:cursor-pointer rounded-lg p-4 relative'>
              <div className='flex flex-col h-full justify-between'>
                <div>
                  <Image className='rounded-lg h-44' height={500} width={500} src={getImage(facility.image) || ''} alt="Sân" />
                  <div className='font-bold mb-5 text-center text-xl mt-3 h-20'>{facility.facilityName}</div>
                  <div className='flex text-sm'>
                    <TiUser size={18} className='mr-2 mb-1' />
                    {facility.ownerName}
                  </div>
                  <div className='flex text-sm'>
                    <p className='mr-3 h-3 w-3'> <TiLocation /></p>
                    {facility.address}
                  </div>
                </div>
                <Button href='/admin/company/facility/detail' className='mt-5 mx-auto' size='xs'>Xem chi tiết</Button>
              </div>
              <div className={`absolute -top-1 -right-1 h-4 w-4 rounded-full ${facility.isDeleted ? 'bg-red-700' : facility.isActive ? 'bg-green-700' :
                'bg-yellow-700'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
