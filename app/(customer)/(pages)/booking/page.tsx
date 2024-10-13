'use client'
import { Button, Label, Popover, RangeSlider, Rating, Select } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { TiDelete, TiLocation } from 'react-icons/ti'
import Image from 'next/image'
import { PiFunnelThin } from 'react-icons/pi'
import { AddressVN, Facility, PageResult, SportCreate } from 'types'
import toast from 'react-hot-toast'
import { getImage } from '@utils/imageOptions'
import { convertNumberToPrice } from '@utils/moneyOptions'
import qs from "query-string";
import { getAllFacilityBooking, getDistrict, getProvince, getSportCreate } from '@services/index'
import { EmptyList, LoadingData } from '@components/index'

export default function Booking() {
  const [indexSearch, setIndexSearch] = useState(0);
  const [searchPlaceholder, setSearchPlaceholder] = useState('');
  const textPlaceholder = 'Tìm kiếm tên sân, địa chỉ sân...';
  const [facilities, setFacilities] = useState<PageResult<Facility> | undefined>(undefined)
  const [sports, setSports] = useState<SportCreate[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<AddressVN[] | undefined>(undefined)
  const [districts, setDistricts] = useState<AddressVN[] | undefined>(undefined)
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedProvince, setSelectProvince] = useState<string>('');
  const [selectedDistrict, setSelectDistrict] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [change, setChange] = useState<boolean>(false)
  const [selectedOrderBy, setSelectOrderBy] = useState<string | null>(null);
  const [price, setPrice] = useState<string>("")

  const [position, setPosition] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        })
      });
    }
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
    getProvince()
      .then(x => {
        if (x.status == 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy dữ liệu tỉnh thành")
        }
      })
      .then((province: AddressVN[]) => {
        setProvinces(province)
      })
      .catch(() => {
        toast.error("Lỗi lấy dữ liệu tỉnh thành")
      })
  }, [])

  const url = qs.stringifyUrl({
    url: "", query: {
      "search": search,
      "currentPage": currentPage,
      "sportID": selectedSport,
      "provinceID": selectedProvince,
      "districtID": selectedDistrict,
      "longitude": position.longitude,
      "latitude": position.latitude,
      "distance": distance,
      "orderBy": selectedOrderBy,
      "price": price,
      "pageSize": 100,
    }
  });

  useEffect(() => {
    setIsLoading(true)
    getAllFacilityBooking(url)
      .then(x => {
        if (x.status == 200) {
          return x.data
        }
      })
      .then((data: PageResult<Facility>) => {
        setFacilities(data);
      })
      .catch(() => {
        toast.error("Hệ thống đang lỗi vui lòng thử lại sau!", { duration: 120 })
      }).finally(() => setIsLoading(false));
  }, [change, selectedProvince, selectedDistrict, selectedSport, selectedOrderBy, position])
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

  useEffect(() => {
    getDistrict(selectedProvince)
      .then(x => {
        if (x.status == 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy dữ liệu quận / huyện")
        }
      })
      .then((wards: AddressVN[]) => {
        setDistricts(wards)
      })
      .catch(() => {
        toast.error("Lỗi lấy dữ liệu quận / huyện")
      });
  }, [selectedProvince])

  const handleChangeProvince = (event: any) => {
    setSelectProvince(event.target.value)
    setDistricts([])
    setSelectDistrict('');
  };

  return (
    <div className='mt-10 mx-5 md:mx-20 mb-20'>
      {/* Start Search */}
      <Image height={1000} width={1000} className='h-[500px] w-full rounded-2xl' src='/assets/images/slide2.png' alt='banner' />
      <div className='mt-10 flex justify-center'>
        <input className='border rounded-s-lg px-3 xl:w-[600px] sm:w-96 w-80'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
          placeholder={searchPlaceholder} />
        <button onClick={() => setChange(!change)} className='h-10 !rounded-e-lg bg-orange-500 hover:!bg-orange-400 focus:ring-transparent flex items-center text-white px-2'>
          <IoMdSearch className='font-bold mr-2' size={18} />
          <span className='w-fit text-sm lg:text-base'>Tìm kiếm</span>
        </button>
      </div>
      {/* End Search */}
      <div className='mt-20 mb-10'>
        <div className='lg:w-[80%] grid grid-cols-4 gap-2 lg:flex lg:space-x-2'>
          {/* {[...Array(6)].map((_, index) => (
            <div key={index} className='border p-2 block w-fit rounded-md relative group hover:cursor-pointer'>
              <p className='text-sm select-none'>
                Bóng đá
              </p>
              <TiDelete size={20} className='text-red-500 absolute -top-2.5 -right-2.5 hidden group-hover:block z-10' />
            </div>
          ))} */}
        </div>
      </div>
      {/*  Start Filter */}
      <div className='grid xl:grid-cols-6 lg:grid-cols-5 grid-cols-2 sm:gap-20 gap-5'>
        <div className='hidden lg:block xl:col-span-5 lg:col-span-4'>
          <div className='grid xl:grid-cols-6 lg:grid-cols-6 sm:grid-cols-2 xl:gap-5 lg:gap-1'>
            <Select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedSport(event.target.value)} className='focus:ring-transparent' id="type" required>
              <option value=''>Môn thể thao</option>
              {sports.map((sport: SportCreate, index) => (
                <option key={index} value={sport.sportID}>{sport.sportName}</option>
              ))}
            </Select>

            <Select onChange={handleChangeProvince} className='focus:ring-transparent' id="province" required>
              <option value=''>Thành Phố / Tỉnh Thành</option>
              {provinces?.map((province: AddressVN) => (
                <option key={province.id} value={province.id}>{province.name}</option>
              ))}
            </Select>

            <Select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectDistrict(e.target.value)} className='focus:ring-transparent' id="district" required>
              <option value=''>Quận / Huyện</option>
              {districts?.map((district: AddressVN) => (
                <option key={district.id} value={district.id}>{district.name}</option>
              ))}
            </Select>

            <Popover
              aria-labelledby="distance-popover"
              trigger='hover'
              content={
                <div className="px-3 py-2 block">
                  <Label htmlFor="default-distance" value="Khoảng cách" />
                  <div className='flex justify-center'>
                    <p>1 km</p>
                    <RangeSlider  value={distance} onChange={(e: any) => setDistance(e.target.value)} className='mx-3' min={1} max={50} id="default-distance" />
                    <p>50 km</p>
                  </div>
                  <div className='flex'>
                    <Button className='mt-3 focus:ring-transparent mx-auto' size='xs' onClick={() => setChange(!change)}>Xem kết quả</Button>
                    <Button color='failure' className='mt-3 focus:ring-transparent mx-auto' size='xs' onClick={() => {
                      setDistance('')
                      setChange(!change)
                    }}>Hủy</Button>
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
                    <RangeSlider value={price} onChange={(event: any) => setPrice(event.target.value)} className='mx-3' min={10000} max={500000} id="default-price" />
                    <p>{'500.000 VND'}</p>
                  </div>
                  <div className='flex'>
                    <Button className='mt-3 focus:ring-transparent mx-auto' size='xs' onClick={() => setChange(!change)}>Xem kết quả</Button>
                    <Button color='failure' className='mt-3 focus:ring-transparent mx-auto' size='xs' onClick={() => {
                      setDistance('')
                      setChange(!change)
                    }}>Hủy</Button>
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
                    <Button className='mt-3 focus:ring-transparent mx-auto' size='xs'>Xem kết quả</Button>
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
                  <Select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedSport(event.target.value)} className='focus:ring-transparent' id="type" required>
                    <option value=''>Môn thể thao</option>
                    {sports.map((sport: SportCreate, index) => (
                      <option key={index} value={sport.sportID}>{sport.sportName}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="province" value="Thành Phố / Tỉnh Thành" />
                  </div>
                  <Select onChange={handleChangeProvince} className='focus:ring-transparent' id="province" required>
                    <option value=''>Thành Phố / Tỉnh Thành</option>
                    {provinces?.map((province: AddressVN) => (
                      <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="province" value="Quận / Huyện" />
                  </div>
                  <Select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectDistrict(e.target.value)} className='focus:ring-transparent' id="district" required>
                    <option value=''>Quận / Huyện</option>
                    {districts?.map((district: AddressVN) => (
                      <option key={district.id} value={district.id}>{district.name}</option>
                    ))}
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
                    <RangeSlider onChange={(e: any) => console.log(e.target.value)} className='mx-3' min={1} max={50} id="default-distance" />
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
                <Button className='mt-3 focus:ring-transparent mx-auto' size='md' onClick={() => setChange(!change)} >Lọc</Button>
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
          <Select value={selectedOrderBy || ""} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectOrderBy(event.target.value)} className='focus:ring-transparent xl:col-start-4 lg:col-start-3 sm:col-start-2 col-start-1'>
            <option value="">Sắp xếp</option>
            <option value="priceAsc">Sắp xếp theo giá tăng dần</option>
            <option value="priceDesc">Sắp xếp theo giá giảm dần</option>
            {position.latitude != null && position.longitude != null && position.latitude > 0 && position.longitude > 0 && (
              <>
                <option value="distanceAsc">Sắp xếp theo khoảng cánh tăng dần</option>
                <option value="distanceDesc">Sắp xếp theo khoảng cách giảm dần</option>
              </>
            )}
          </Select>
        </div>
      </div>
      {/* End Filter */}
      {/* Start View List */}
      {isLoading ? <div className='mt-5'>
        <LoadingData />
      </div> :
        facilities !== undefined && facilities.results.length > 0 ?
          <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16'>
            {facilities !== undefined && facilities.results?.map((facility: Facility, index) => (
              <div key={index} className='shadow-3xl rounded-2xl p-3 w-80 mx-auto'>
                <Image className='rounded-lg h-60' height={500} width={500} src={getImage(facility.facilityImage) || ''} alt="img" />
                <div className='mx-2'>
                  <div className='flex justify-between items-center py-4'>
                    <Rating>
                      <Rating.Star />
                      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{facility.facilityRating}</p>
                    </Rating>
                    <div className='font-bold'>
                      {facility.facilityDistance !== undefined && facility.facilityDistance > 0 && (
                        facility.facilityDistance < 1 ? (
                          <div>{Math.round(facility.facilityDistance * 1000)} m</div>
                        ) : (
                          <div>{(facility.facilityDistance).toFixed(2)} km</div>
                        )
                      )}
                    </div>
                  </div>
                  <div className='font-bold mb-5 text-center text-xl h-14'>{facility.facilityName}</div>
                  <div className='flex flex-col justify-between h-full'>
                    <div className='flex text-sm min-h-[75px]'>
                      <p className='mt-0.5'>
                        <TiLocation className='mr-2 h-4 w-4' />
                      </p>
                      <p>
                        {facility.facilityAddress}
                      </p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className='text-green-500 font-bold'>
                        {facility.facilityMinPrice === facility.facilityMaxPrice
                          ? convertNumberToPrice(facility.facilityMinPrice)
                          : convertNumberToPrice(facility.facilityMinPrice, facility.facilityMaxPrice)}
                      </div>
                      <Button size='xs' href={`/facility/${facility.facilityID}`} className='text-sm px-3'>
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> : <EmptyList />}
      {/* End View List */}
    </div >
  )
}
