"use client"
import { CardStatistic, Heading } from '@components/index'
import { CustomFlowbiteTheme, Label, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { GrSchedules } from 'react-icons/gr'
import dynamic from 'next/dynamic'
import { BookingDetail, DashBoard as DashBoardAdmin, PageResult, Position, PositionFacility, UserAdmin } from 'types'
import qs from "query-string";
import { getRevenue } from '@services/dashBoardService'
import toast from 'react-hot-toast'
import { convertNumberToPrice } from '@utils/moneyOptions'
import { getAllUser } from '@services/userService'
import { PiMoneyWavyBold } from 'react-icons/pi'
import { FaCalendarTimes } from 'react-icons/fa'
import { getBookings } from '@services/bookingService'
import { getFacilityPosition, getFacilityProvince } from '@services/facilityService'
import { getDistrictPosition } from '@services/index'

const MapFacility = dynamic(() => import('@components/MapFacility/MapFacility'), {
  ssr: false,
});

const PieChart = dynamic(() => import('@components/PieChart/PieChart'), {
  ssr: false,
});

const LineChart = dynamic(() => import('@components/LineChart/LineChart'), {
  ssr: false,
});

export default function DashBoard() {

  const [revenue, setRevenue] = useState<DashBoardAdmin | undefined>(undefined);
  const [users, setUsers] = useState<PageResult<UserAdmin> | undefined>(undefined);
  const [bookings, setBookings] = useState<PageResult<BookingDetail> | undefined>(undefined);
  const [type, setType] = useState<string>('date')
  const [provinces, setProvinces] = useState<number[]>([]);
  const [positions, setPositions] = useState<Position[] | undefined>(undefined);
  const [positionsFacility, setPositionsFacility] = useState<PositionFacility[] | undefined>(undefined);

  const url = qs.stringifyUrl({
    url: "", query: {
      "typeTimeBased": type,
    }
  });

  useEffect(() => {
    getRevenue(url)
      .then((x) => {
        if (x.status === 200) {
          setRevenue(x.data)
        } else {
          toast.error("Lỗi lấy dữ liệu doanh thu")
        }
      }).catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
  }, [type])

  useEffect(() => {
    let query = qs.stringifyUrl({
      url: "", query: {
        "currentPage": 1,
        "pageSize": 5
      }
    });
    getAllUser(query)
      .then((x) => {
        if (x.status === 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy dữ liệu người dùng")
        }
      })
      .then((users: PageResult<UserAdmin>) => setUsers(users))
      .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))

    getBookings(query)
      .then((x) => {
        if (x.status === 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy dữ liệu đặt lịch")
        }
      })
      .then((bookings: PageResult<BookingDetail>) => setBookings(bookings))
      .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))

    getFacilityProvince()
      .then((x) => {
        if (x.status === 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy dữ liệu tỉnh thành")
        }
      })
      .then((numbers: number[]) => setProvinces(numbers))
      .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))

    getFacilityPosition()
      .then((x) => {
        if (x.status === 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy dữ liệu cơ sở")
        }
      })
      .then((positionFacility: PositionFacility[]) => setPositionsFacility(positionFacility))
      .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
  }, [])

  useEffect(() => {
    if (provinces !== undefined) {
      const positionFacility = provinces.reduce((result: Position[], provinceID: number) => {
        getDistrictPosition(provinceID)
          .then(x => {
            if (x.status === 200) {
              return x.data;
            } else {
              toast.error("Lỗi lấy dữ liệu tỉnh thành")
            }
          }
          ).then((data: any) => {
            if (data !== undefined && data?.data[0] !== undefined) {
              result.push(
                {
                  name: data.data_name,
                  latitude: data.data[0].latitude,
                  longitude: data.data[0].longitude
                }
              )
            }
          })
          .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
        return result
      }, [])
      setPositions(positionFacility)
    }
  }, [provinces])

  const handlerChangeType = (value: string) => {
    setType(value)
  }
  const customTheme: CustomFlowbiteTheme["table"] = {
    root: {
      shadow: ''
    }
  };
  return (
    <div className='py-5 w-full'>
      <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tổng quan hoạt động' center />
      <div className='my-24 w-full grid  lg:grid-cols-3 sm:grid-cols-2 gap-10 place-items-center'>
        <CardStatistic
          title='Doanh thu'
          amount={convertNumberToPrice(revenue?.revenue || 0)}
          icon={PiMoneyWavyBold}
          gradientFrom='from-cyan-700'
          gradientTo='to-cyan-500'
          iconColor='text-cyan-700'
        />
        <CardStatistic
          title='Đặt lịch'
          amount={revenue?.totalBookings || 0}
          icon={GrSchedules}
          gradientFrom='from-green-700'
          gradientTo='to-green-500'
          iconColor='text-green-700'
        />
        <CardStatistic
          title='Hủy đặt lịch'
          amount={revenue?.totalBookingsCancel || 0}
          icon={FaCalendarTimes}
          gradientFrom='from-red-700'
          gradientTo='to-red-500'
          iconColor='text-red-700'
        />
      </div>
      <div className='border shadow-3xl p-5 rounded-xl'>
        {revenue !== undefined && revenue?.countBookings.length > 0 ?
          <div className={`grid lg:grid-cols-4 gap-5`}>
            <LineChart detailsRevenue={revenue?.detailsRevenue} setChangeType={handlerChangeType} className={`lg:col-span-3 h-full w-full xl:border-r-2 pr-6`} label='Doanh thu' />
            <PieChart
              courtBookings={revenue?.countBookings}
              className='lg:col-span-1 w-full'
              label='Thể thao'
            />
          </div>
          : <LineChart detailsRevenue={revenue?.detailsRevenue} setChangeType={handlerChangeType} className='w-full h-full' label='Doanh thu' />}

      </div>
      <div className='mt-16 border shadow-3xl p-5 rounded-xl'>
        <div className='flex'>
          <div className='h-7 w-2 bg-teal-400 mr-2 rounded-sm'></div>
          <Label className='text-lg' value='Người dùng mới' />
        </div>
        <div className="mt-3 min-w-full">
          <Table theme={customTheme} hoverable>
            <Table.Head>
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Họ và tên</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Email</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Số điện thoại</Table.HeadCell>
              <Table.HeadCell className='min-w-32'>Vai trò</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Ngày tạo</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {users !== undefined && users.results.map((user: UserAdmin, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                  <Table.Cell>{user.role === 'Admin' ? 'Quản trị viên' :
                    user.role === 'Manger' ? 'Quản lí' :
                      user.role === 'CourtOwner' ? 'Chủ sân' :
                        user.role === 'Customer' ? 'Khách hàng' : ''}</Table.Cell>
                  <Table.Cell>{user.createDate}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className='mt-16 border shadow-3xl p-5 rounded-xl'>
        <div className='flex'>
          <div className='h-7 w-2 bg-teal-400 mr-2 rounded-sm'></div>
          <Label className='text-lg' value='Thông tin đặt lịch' />
        </div>
        <div className="mt-3 min-w-full">
          <Table theme={customTheme} hoverable>
            <Table.Head>
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Tên người đặt</Table.HeadCell>
              <Table.HeadCell className='min-w-32 text-center'>Số điện thoại</Table.HeadCell>
              <Table.HeadCell className='min-w-32 text-center'>Sân</Table.HeadCell>
              <Table.HeadCell className='min-w-32 text-center'>Môn thể thao</Table.HeadCell>
              <Table.HeadCell className='min-w-20 text-center'>Ngày chơi</Table.HeadCell>
              <Table.HeadCell className='min-w-20 text-center'>Ngày đặt</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Trạng thái</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {bookings !== undefined && bookings.results.map((booking: BookingDetail, index: number) => (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{booking.bookingName}</Table.Cell>
                  <Table.Cell>{booking.bookingPhone}</Table.Cell>
                  <Table.Cell className='text-center'>{booking.facilityName}</Table.Cell>
                  <Table.Cell className='text-center'>{booking.sportName}</Table.Cell>
                  <Table.Cell className='text-center'>{booking.playDate}</Table.Cell>
                  <Table.Cell className='text-center'>{booking.bookingDate}</Table.Cell>
                  <Table.Cell>
                    {booking.isDeleted ? <p className='bg-red-200 text-red-500 p-1 rounded-md text-center font-bold'>
                      Đã hủy
                    </p> : booking.paymentStatus ? <p className='bg-green-200 text-green-500 p-1 rounded-md text-center font-bold'>
                      Đã thanh toán
                    </p> : <p className='bg-yellow-200 text-yellow  -500 p-1 rounded-md text-center font-bold'>
                      Chưa thanh toán
                    </p>}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className='mt-16 border shadow-3xl p-5 rounded-xl'>
        <div className='flex mb-5'>
          <div className='h-7 w-2 bg-teal-400 mr-2 rounded-sm'></div>
          <Label className='text-lg' value='Vị trí các cơ sở' />
        </div>
        {positions !== undefined && positionsFacility !== undefined && (
          <MapFacility
            facilities={positionsFacility}
            positions={positions}
            className='min-h-[750px] w-full !z-10'
          />
        )}
      </div>
    </div>
  )
}
