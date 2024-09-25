'use client'
import { Button, Label, Popover, RangeSlider, Rating, Select } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { TiDelete, TiLocation } from 'react-icons/ti'
import Image from 'next/image'
import { PiFunnelThin } from 'react-icons/pi'
import { Facility, PageResult } from 'types'
import { getAllFacilityBooking } from '@services/facilityService'
import toast from 'react-hot-toast'
import { getImage } from '@utils/imageOptions'
import { convertNumberToPrice } from '@utils/moneyOptions'
import qs from "query-string";

export default function Booking() {
  const [indexSearch, setIndexSearch] = useState(0);
  const [searchPlaceholder, setSearchPlaceholder] = useState('');
  const textPlaceholder = 'Tìm kiếm tên sân, địa chỉ sân...';
  const [facilities, setFacilities] = useState<PageResult<Facility> | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  
  const url = qs.stringifyUrl({
    url: "", query: {
      "search": search,
      "currentPage": currentPage,
      "pageSize": 10,
    }
  });
  useEffect(() => {
    getAllFacilityBooking(url)
      .then(x => {
        if (x.status == 200) {
          console.log(x.data)
          return x.data
        }
      })
      .then((data: PageResult<Facility>) => {
        setFacilities(data);
      })
      .catch(() => {
        toast.error("Hệ thống đang lỗi vui lòng thử lại sau!", { duration: 120 })
      });
  }, [])
  useEffect(() => {
    let interval;
    if (searchPlaceholder.length < textPlaceholder.length) {
      interval = setInterval(() => {
        setSearchPlaceholder(prev => prev + textPlaceholder.charAt(indexSearch));
        setIndexSearch(prev => prev + 1);
      }, 150);
    } else {
      interval = setTimeout(() => {
        setSearchPlaceholder('');
        setIndexSearch(0);
      }, 5000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(interval);
    };
  }, [searchPlaceholder, indexSearch]);
  return (
    <div className='mt-10 mx-5 md:mx-20 mb-20'>
      {/* Start Search */}
      <Image height={1000} width={1000} className='h-[500px] w-full rounded-2xl' src='/assets/images/slide2.png' alt='banner' />
      <div className='mt-10 flex justify-center'>
        <input className='border rounded-s-lg px-3 xl:w-[600px] sm:w-96 w-80' name='search' placeholder={searchPlaceholder} />
        <button className='h-10 !rounded-e-lg bg-orange-500 hover:!bg-orange-400 focus:ring-transparent flex items-center text-white px-2'>
          <IoMdSearch className='font-bold mr-2' size={18} />
          <span className='w-fit'>Tìm kiếm</span>
        </button>
      </div>
      {/* End Search */}
      <div className='mt-20 mb-10'>
        <div className='lg:w-[80%] grid grid-cols-4 gap-2 lg:flex lg:space-x-2'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='border p-2 block w-fit rounded-md relative group hover:cursor-pointer'>
              <p className='text-sm select-none'>
                Bóng đá
              </p>
              <TiDelete size={20} className='text-red-500 absolute -top-2.5 -right-2.5 hidden group-hover:block z-10' />
            </div>
          ))}
        </div>
      </div>
      {/* Start Filter */}
      <div className='grid xl:grid-cols-6 lg:grid-cols-5 grid-cols-2 sm:gap-20 gap-5'>
        <div className='hidden lg:block xl:col-span-5 lg:col-span-4'>
          <div className='grid xl:grid-cols-6 lg:grid-cols-6 sm:grid-cols-2 xl:gap-5 lg:gap-1'>
            <Select className='focus:ring-transparent' id="type" required>
              <option value=''>Môn thể thao</option>
              <option value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
            </Select>

            <Select className='focus:ring-transparent' id="province" required>
              <option value=''>Thành Phố / Tỉnh Thành</option>
              <option value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
            </Select>

            <Select className='focus:ring-transparent' id="district" required>
              <option value=''>Quận / Huyện</option>
              <option value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
            </Select>

            <Popover
              aria-labelledby="distance-popover"
              trigger='hover'
              content={
                <div className="px-3 py-2 block">
                  <Label htmlFor="default-distance" value="Khoảng cách" />
                  <div className='flex justify-center'>
                    <p>1 km</p>
                    <RangeSlider className='mx-3' min={1} max={50} id="default-distance" />
                    <p>50 km</p>
                  </div>
                  <div className='flex'>
                    <Button className='mt-3 focus:ring-transparent mx-auto' size='xs'>14 kết quả</Button>
                    <Button color='failure' className='mt-3 focus:ring-transparent mx-auto' size='xs'>Hủy</Button>
                  </div>
                </div>
              }
            >
              <button color='gray' className='font-light bg-[#f9fafb] border-gray-300 rounded-lg border h-11'>Khoảng cách</button>
            </Popover>

            <Popover
              aria-labelledby="price-popover"
              trigger='hover'
              content={
                <div className="px-3 py-2 block">
                  <Label htmlFor="default-price" value="Giá tiền" />
                  <div className='flex justify-center'>
                    <p>{'10.000 VND'}</p>
                    <RangeSlider className='mx-3' min={10000} max={500000} id="default-price" />
                    <p>{'500.000 VND'}</p>
                  </div>
                  <div className='flex'>
                    <Button className='mt-3 focus:ring-transparent mx-auto' size='xs'>14 kết quả</Button>
                    <Button color='failure' className='mt-3 focus:ring-transparent mx-auto' size='xs'>Hủy</Button>
                  </div>
                </div>
              }
            >
              <button color='gray' className='font-light bg-[#f9fafb] border-gray-300 rounded-lg border h-11'>Giá tiền</button>
            </Popover>

            <Popover
              aria-labelledby="price-popover"
              trigger='hover'
              content={
                <div className="px-3 py-2 block">
                  <Label htmlFor="default-price" value="Lựa chọn đánh giá" />
                  <div className='grid grid-cols-2 gap-1 py-2'>
                    <Rating className='hover:cursor-pointer border rounded-xl p-2'>
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' />
                    </Rating>
                    <Rating className='hover:cursor-pointer rounded-xl p-2'>
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' filled={false} />
                    </Rating>
                    <Rating className='hover:cursor-pointer rounded-xl p-2'>
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' filled={false} />
                      <Rating.Star className='w-6 h-6' filled={false} />
                    </Rating>
                    <Rating className='hover:cursor-pointer rounded-xl p-2'>
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' filled={false} />
                      <Rating.Star className='w-6 h-6' filled={false} />
                      <Rating.Star className='w-6 h-6' filled={false} />
                    </Rating>
                    <Rating className='hover:cursor-pointer rounded-xl p-2'>
                      <Rating.Star className='w-6 h-6' />
                      <Rating.Star className='w-6 h-6' filled={false} />
                      <Rating.Star className='w-6 h-6' filled={false} />
                      <Rating.Star className='w-6 h-6' filled={false} />
                      <Rating.Star className='w-6 h-6' filled={false} />
                    </Rating>
                  </div>
                  <div className='flex'>
                    <Button className='mt-3 focus:ring-transparent mx-auto' size='xs'>14 kết quả</Button>
                    <Button color='failure' className='mt-3 focus:ring-transparent mx-auto' size='xs'>Hủy</Button>
                  </div>
                </div>
              }
            >
              <button color='gray' className='font-light bg-[#f9fafb] border-gray-300 rounded-lg border h-11'>Đánh giá</button>
            </Popover>

          </div>
        </div>

        <Popover
          aria-labelledby="filter-popover"
          trigger='hover'
          placement='bottom-end'
          className='sm:max-w-[600px] bg-white border rounded-xl z-20'
          content={
            <div className="px-3 py-5">
              <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-5'>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="type" value="Môn thể thao" />
                  </div>
                  <Select className='focus:ring-transparent' id="type" required>
                    <option value=''>Môn thể thao</option>
                    <option value="Canada">Canada</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                  </Select>
                </div>

                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="province" value="Thành Phố / Tỉnh Thành" />
                  </div>
                  <Select className='focus:ring-transparent' id="province" required>
                    <option value=''>Thành Phố / Tỉnh Thành</option>
                    <option value="Canada">Canada</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                  </Select>
                </div>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="province" value="Quận / Huyện" />
                  </div>
                  <Select className='focus:ring-transparent' id="district" required>
                    <option value=''>Quận / Huyện</option>
                    <option value="Canada">Canada</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                  </Select>
                </div>
              </div>
              <div className='mt-5 grid sm:grid-cols-2 sm:gap-20 gap-5'>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="distance-range" value="Khoảng cách" />
                  </div>
                  <div className='flex justify-center'>
                    <p>1 km</p>
                    <RangeSlider className='mx-3' min={1} max={50} id="default-distance" />
                    <p>50 km</p>
                  </div>
                </div>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="price-range" value="Giá tiền" />
                  </div>
                  <div className='flex justify-center'>
                    <p>{'10.000 VND'}</p>
                    <RangeSlider className='mx-3' min={10000} max={500000} id="default-price" />
                    <p>{'500.000 VND'}</p>
                  </div>
                </div>
              </div>
              <div className='my-5'>
                <div className="mb-1 block">
                  <Label htmlFor="price-range" value="Đánh giá" />
                </div>
                <div className='grid sm:grid-cols-5 grid-cols-2 gap-3'>
                  <Rating className='hover:cursor-pointer'>
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' />
                  </Rating>
                  <Rating className='hover:cursor-pointer'>
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' filled={false} />
                  </Rating>
                  <Rating className='hover:cursor-pointer'>
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' filled={false} />
                    <Rating.Star className='w-6 h-6' filled={false} />
                  </Rating>
                  <Rating className='hover:cursor-pointer'>
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' filled={false} />
                    <Rating.Star className='w-6 h-6' filled={false} />
                    <Rating.Star className='w-6 h-6' filled={false} />
                  </Rating>
                  <Rating className='hover:cursor-pointer'>
                    <Rating.Star className='w-6 h-6' />
                    <Rating.Star className='w-6 h-6' filled={false} />
                    <Rating.Star className='w-6 h-6' filled={false} />
                    <Rating.Star className='w-6 h-6' filled={false} />
                    <Rating.Star className='w-6 h-6' filled={false} />
                  </Rating>
                </div>
              </div>
              <div className='flex'>
                <Button className='mt-3 focus:ring-transparent mx-auto' size='md'>Lọc</Button>
                <Button color='failure' className='mt-3 focus:ring-transparent mx-auto' size='md'>Hủy</Button>
              </div>
            </div>
          }
        >
          <button color='gray' className='flex lg:hidden font-light bg-[#f9fafb] border-gray-300 px-4 !w-20 rounded-lg border h-11 items-center'>
            <PiFunnelThin size={26} className='mr-2' />
            Lọc
          </button>
        </Popover>

        <div className='xl:col-span-1 place-items-end'>
          <Select className='focus:ring-transparent xl:col-start-4 lg:col-start-3 sm:col-start-2 col-start-1'>
            <option value="">Sắp xếp</option>
            <option value="">Sắp xếp theo giá tăng dần</option>
            <option value="">Sắp xếp theo giá giảm dần</option>
            <option value="">Sắp xếp theo giảm giá tăng dần</option>
            <option value="">Sắp xếp theo giảm giá giảm dần</option>
            <option value="">Sắp xếp theo khoảng cánh tăng dần</option>
            <option value="">Sắp xếp theo khoảng cách giảm dần</option>
          </Select>
        </div>
      </div>
      {/* End Filter */}
      {/* Start View List */}
      <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16'>
        {facilities !== undefined && facilities.results?.map((facility: Facility, index) => (
          <div key={index} className='shadow-3xl rounded-2xl p-2 w-72 mx-auto'>
            <img className='rounded-lg' height={500} width={500} src={getImage(facility.facilityImage)} alt="img" />
            <div className='mx-2'>
              <div className='flex justify-between items-center py-4'>
                <Rating>
                  <Rating.Star />
                  <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{facility.facilityRating}</p>
                </Rating>
                {/* <div>12km</div> */}
              </div>
              <div className='font-bold mb-5 text-center text-xl'>{facility.facilityName}</div>
              <div className='flex text-sm'>
                <TiLocation size={25} className='mr-2' />
                {facility.facilityAddress}
              </div>
              <div className='py-5 flex justify-between items-center'>
                <div className='text-green-500 font-bold'>
                  {facility.facilityMinPrice === facility.facilityMaxPrice
                    ? convertNumberToPrice(facility.facilityMinPrice)
                    : `${convertNumberToPrice(facility.facilityMinPrice)} - ${convertNumberToPrice(facility.facilityMinPrice)}`}
                </div>
                <Button size='xs' href='/facility' className='text-sm px-3'>
                  Chi tiết
                  <FaArrowRight className='ml-2 mt-0.5' size={12} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* End View List */}
    </div >
  )
}
