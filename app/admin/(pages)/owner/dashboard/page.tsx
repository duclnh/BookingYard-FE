"use client"
import { CardStatistic, Heading } from '@components/index'
import React, { useEffect, useState } from 'react'
import { GrSchedules } from 'react-icons/gr'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import { DashBoard as DashBoardAdmin } from 'types'
import qs from "query-string";
import { useAppSelector } from '@hooks/hooks'
import { getRevenueFacility } from '@services/dashBoardService'
import { convertNumberToPrice } from '@utils/moneyOptions'
const PieChart = dynamic(() => import('@components/PieChart/PieChart'), {
  ssr: false,
});

const LineChart = dynamic(() => import('@components/LineChart/LineChart'), {
  ssr: false,
});

export default function DashBoard() {
  const [revenue, setRevenue] = useState<DashBoardAdmin | undefined>(undefined);
  const [type, setType] = useState<string>('date')
  const user = useAppSelector(state => state.manager.value);

  const url = qs.stringifyUrl({
    url: "", query: {
      "typeTimeBased": type,
      "facilityId": user?.facilityID
    }
  });

  useEffect(() => {
    getRevenueFacility(url)
      .then((x) => {
        if (x.status === 200) {
          setRevenue(x.data)
        } else {
          toast.error("Lỗi lấy dữ liệu doanh thu")
        }
      }).catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
  }, [type])

  const handlerChangeType = (value: string) => {
    setType(value)
  }

  return (
    <div className='py-5 w-full'>
      <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tổng quan hoạt động' center />
      <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10 place-items-center'>
        <CardStatistic
          title='Doanh thu'
          amount={convertNumberToPrice(revenue?.revenue || 0)}
          icon={GrSchedules}
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
          icon={GrSchedules}
          gradientFrom='from-red-700'
          gradientTo='to-red-500'
          iconColor='text-red-700'
        />
      </div>
      <div className='border shadow-3xl p-5 rounded-xl'>
        <div className={`grid ${revenue !== undefined && revenue?.countBookings.length > 0 ? 'lg:grid-cols-4' : ''} gap-5`}>
          <LineChart detailsRevenue={revenue?.detailsRevenue} setChangeType={handlerChangeType} className={`lg:col-span-3 h-full w-full ${revenue !== undefined && revenue?.countBookings.length > 0 ? 'xl:border-r-2 pr-6' : ''}`} label='Doanh thu' />
          {revenue !== undefined && revenue?.countBookings.length > 0 && (
            <PieChart
              courtBookings={revenue?.countBookings}
              className='lg:col-span-1 w-full'
              label='Thể thao'
            />
          )}
        </div>
      </div>
    </div>
  )
}
