"use client"
import { CardStatistic, EmptyList, Heading } from '@components/index'
import { Button, Label, Popover } from 'flowbite-react'
import React, { ReactHTML, use, useEffect, useRef, useState } from 'react'
import { BsBuilding, BsBuildingCheck, BsBuildingFillX } from 'react-icons/bs'
import { IoMdSearch } from 'react-icons/io'
import Image from 'next/image'
import { TiGroup } from 'react-icons/ti'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { useAppSelector } from '@hooks/hooks'
import { Court, SportCreate, SportCreateSelect } from 'types'
import toast from 'react-hot-toast'
import { getAllCourts, getSportCreate } from '@services/index'
import { getImage } from '@utils/imageOptions'
import { convertNumberToPrice } from '@utils/moneyOptions'

export default function Facility() {
  const user = useAppSelector(state => state.manager.value);
  const [courts, setCourts] = useState<Court[]>([]);
  const [sports, setSports] = useState<SportCreateSelect[]>([]);
  const [filterCourts, setFilterCourts] = useState<Court[]>([]);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [click, setClick] = useState<boolean>(false);
  const [result, setResult] = useState<number>(0)

  useEffect(() => {
    getAllCourts(user?.facilityID)
      .then(x => {
        if (x.status == 200) {
          console.log(x.data)
          return x.data
        }
      })
      .then((courts: Court[]) => {
        setCourts(courts);
        setFilterCourts(courts)
      })
      .catch(() => {
        toast.error("Hệ thống đang lỗi vui lòng thử lại sau!", { duration: 120 })
      }).finally(() => {
      });

    getSportCreate()
      .then(x => {
        if (x.status === 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy thông tin thể thao")
        }
      }).then((sport: SportCreate[]) => {
        const sportSelect = sport.map((s: SportCreate) => {
          return {
            ...s,
            isSelected: false
          };
        });
        setSports(sportSelect)
      }).catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
  }, [])

  useEffect(() => {
    setFilterCourts(handlerResult(sports));
  }, [click, status])

  const handlerFilterSport = (sportID: number, sportSelect: SportCreateSelect[]) => {
    const result = sportSelect.find(x => x.sportID == sportID && x.isSelected)
    if (result === undefined) {
      return false;
    }
    return true;
  }

  const handlerResult = (sportSelect: SportCreateSelect[]) => {
    let courtFilter;
    switch (status) {
      case "active":
        courtFilter = courts.filter((c: Court) => c.isActive == true)
        break;
      case "inactive":
        courtFilter = courts.filter((c: Court) => c.isActive == false)
        break;
      default:
        courtFilter = courts
        break;
    }
    if (search !== '') {
      courtFilter = courtFilter.filter((c: Court) => c.courtName.toLowerCase().trim().includes(search.toLowerCase().trim()))
    }
    let selectSport = sportSelect.filter(x => x.isSelected)
    if (selectSport.length > 0) {
      courtFilter = courtFilter.filter((c: Court) => handlerFilterSport(c.sportID, sportSelect))
      setResult(courtFilter.length)
    }

    return courtFilter
  }

  const handlerRemoveAllSport = () => {
    let sportChose = sports.map((sport: SportCreateSelect) => {
      return {
        ...sport,
        isSelected: false
      }
    });
    setSports(sportChose)
    setResult(0);
    setClick(!click)
  }

  const handlerChoseSport = (sportID: number) => {
    let sportChose = sports.map((sport: SportCreateSelect) => {
      if (sport.sportID === sportID) {
        return {
          ...sport,
          isSelected: !sport.isSelected
        }
      } else {
        return sport
      }
    });
    setSports(sportChose)
    handlerResult(sportChose)
  }

  const handlerChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (e.target.value === '') {
      setClick(!click);
    }
  }

  return (
    <>
      <div className='py-5 w-full'>
        <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Danh sách các sân' center />
        {/* <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
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
        </div> */}
        <div className='mt-36 bg-white'>
          <div className='mt-10 grid md:grid-cols-3 gap-7 mb-3'>
            <div className='md:col-span-2 flex'>
              <input onChange={handlerChangeSearch} className='border rounded-md px-3 sm:w-96 w-80' placeholder={'Tìm kiếm theo tên sân'} />
              <Button onClick={() => setClick(!click)} className='p-1'>
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
                      {sports.map((sport: SportCreateSelect, index) => (
                        <div onClick={() => handlerChoseSport(sport.sportID)} key={index} className={`border w-20 leading-10 text-center rounded-xl hover:cursor-pointer hover:bg-black hover:text-white ${sport.isSelected && ('bg-black text-white')}`}>
                          {sport.sportName}
                        </div>
                      ))}
                    </div>
                    <div className='flex'>
                      <Button onClick={() => setClick(!click)} className='mt-3 focus:ring-transparent mx-auto' size='xs'>{`${result} kết quả`}</Button>
                      <Button onClick={handlerRemoveAllSport} color='failure' className='mt-3 focus:ring-transparent mx-auto' size='xs'>Xóa</Button>
                    </div>
                  </div>
                }
              >
                <button color='gray' className='font-light bg-[#f9fafb] border-gray-300 rounded-lg border'>Môn thể thao</button>
              </Popover>
              <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)} className='font-light bg-[#f9fafb] border-gray-300 rounded-lg border focus:ring-transparent focus:border-gray-300 hover:cursor-pointer'>
                <option value="">Tất cả</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Đang bảo trì</option>
              </select>
            </div>
          </div>
        </div>
        <div className='mt-10 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-14'>
          {filterCourts !== undefined && filterCourts.map((court: Court, index) => (
            <div key={index} className='shadow-3xl border hover:cursor-pointer rounded-lg p-4 relative'>
              <Image className='rounded-lg' height={500} width={500} src={getImage(court.image) || ''} alt={court.courtName} />
              <div className='font-bold my-5 text-center text-xl'>{court.courtName}</div>
              <div className={`absolute -top-1 -right-1 h-4 w-4 rounded-full ${court.isActive ? 'bg-green-700' : 'bg-orange-500'}`}></div>
              <div className='flex justify-center'>
                <Button color={"gray"} className='mx-auto' size='xs'>{court.sportName}</Button>
                {court.sportName === 'Bóng đá' && (
                  <Button color={"gray"} className='mx-auto' size='xs'>
                    <HiOutlineUserGroup size={17} />
                    <p className='ml-3 text-[15px]'>{court.numberPlayer}</p>
                  </Button>
                )}
              </div>
              <div className='mt-5 flex flex-col gap-3'>
                <div className='flex justify-between border p-2 rounded-md'>
                  <p className='font-bold'>Giá:</p>
                  <p className='font-medium'>{convertNumberToPrice(court.courtPrice)}</p>
                </div>
                {/* <div className='flex justify-between border p-2 rounded-md'>
                  <p className='font-bold'>Giá tháng:</p>
                  <p className='font-medium'>900.000 VND</p>
                </div>
                <div className='flex justify-between border p-2 rounded-md'>
                  <p className='font-bold'>Giá năm:</p>
                  <p className='font-medium'>3.000.000 VND</p>
                </div> */}
              </div>
              <Button href={`/admin/owner/court/${court.courtID}`} className='mt-5 mx-auto w-24' size='xs'>Xem chi tiết</Button>
            </div>
          ))}
        </div>
        {filterCourts.length <= 0 && (
          <EmptyList />
        )}
      </div>
    </>
  )
}
