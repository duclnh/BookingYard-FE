"use client"
import { CardStatistic, Heading } from '@components/index'
import { Label, Table } from 'flowbite-react'
import React from 'react'
import { GrSchedules } from 'react-icons/gr'
import dynamic from 'next/dynamic'

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
  return (
    <div className='py-5 w-full'>
      <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tổng quan hoạt động' center />
      <div className='my-24 w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10 place-items-center'>
        <CardStatistic
          title='Doanh thu'
          amount={3000}
          icon={GrSchedules}
          gradientFrom='from-cyan-700'
          gradientTo='to-cyan-500'
          iconColor='text-cyan-700'
        />
        <CardStatistic
          title='Đặt lịch'
          amount={3300}
          icon={GrSchedules}
          gradientFrom='from-green-700'
          gradientTo='to-green-500'
          iconColor='text-green-700'
        />
        <CardStatistic
          title='Cơ sở'
          amount={3300}
          icon={GrSchedules}
          gradientFrom='from-yellow-700'
          gradientTo='to-yellow-500'
          iconColor='text-yellow-700'
        />
        <CardStatistic
          title='Hủy đặt lịch'
          amount={3300}
          icon={GrSchedules}
          gradientFrom='from-red-700'
          gradientTo='to-red-500'
          iconColor='text-red-700'
        />
      </div>
      <div className='border shadow-3xl p-5 rounded-xl'>
        <div className='grid lg:grid-cols-4 gap-5'>
          <LineChart className='lg:col-span-3 h-full w-full xl:border-r-2 pr-6' label='Doanh thu' />
          <PieChart orderBy={
            <select className='h-9 text-xs rounded-md'>
              <option>Đặt lịch</option>
              <option>Đã hủy</option>
            </select>
          }
            className='lg:col-span-1 w-full'
            label='Thể thao'
          />
        </div>
      </div>
      <div className='mt-16 border shadow-3xl p-5 rounded-xl grid lg:grid-cols-4 gap-5'>
        <div className='lg:col-span-3 h-full w-full xl:border-r-2 pr-6'>
          <div className='flex'>
            <div className='h-7 w-2 bg-teal-400 mr-2 rounded-sm'></div>
            <Label className='text-lg' value='Người dùng mới' />
          </div>
          <div className="mt-3 min-w-full max-w-[1000px] overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>STT</Table.HeadCell>
                <Table.HeadCell className='min-w-40'>Họ và tên</Table.HeadCell>
                <Table.HeadCell className='min-w-40'>Số điện thoại</Table.HeadCell>
                <Table.HeadCell className='min-w-32'>Vai trò</Table.HeadCell>
                <Table.HeadCell className='min-w-40'>Ngày tạo</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>1</Table.Cell>
                  <Table.Cell>Nguyễn Thị Mai</Table.Cell>
                  <Table.Cell>0912345678</Table.Cell>
                  <Table.Cell>Quản trị viên</Table.Cell>
                  <Table.Cell>01/01/2024</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>2</Table.Cell>
                  <Table.Cell>Trần Văn Khoa</Table.Cell>
                  <Table.Cell>0987654321</Table.Cell>
                  <Table.Cell>Nhân viên</Table.Cell>
                  <Table.Cell>15/02/2024</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>3</Table.Cell>
                  <Table.Cell>Lê Minh Tú</Table.Cell>
                  <Table.Cell>0909123456</Table.Cell>
                  <Table.Cell>Người dùng</Table.Cell>
                  <Table.Cell>20/03/2024</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>4</Table.Cell>
                  <Table.Cell>Phạm Hoàng Anh</Table.Cell>
                  <Table.Cell>0911222333</Table.Cell>
                  <Table.Cell>Nhân viên</Table.Cell>
                  <Table.Cell>10/04/2024</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>5</Table.Cell>
                  <Table.Cell>Vũ Thị Lan</Table.Cell>
                  <Table.Cell>0922333444</Table.Cell>
                  <Table.Cell>Quản trị viên</Table.Cell>
                  <Table.Cell>05/05/2024</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
        <PieChart className='lg:col-span-1 w-full' label='Cơ sở' />
      </div>
      <div className='mt-16 border shadow-3xl p-5 rounded-xl'>
        <div className='flex'>
          <div className='h-7 w-2 bg-teal-400 mr-2 rounded-sm'></div>
          <Label className='text-lg' value='Thông tin đặt lịch' />
        </div>
        <div className="mt-3 min-w-full max-w-[1000px] overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Tên người đặt</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Số điện thoại</Table.HeadCell>
              <Table.HeadCell className='min-w-32'>Sân</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Môn thể thao</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Ngày chơi</Table.HeadCell>
              <Table.HeadCell className='min-w-40'>Trạng thái</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>Nguyễn Văn A</Table.Cell>
                <Table.Cell>0912345678</Table.Cell>
                <Table.Cell>Sân 1</Table.Cell>
                <Table.Cell>Bóng đá</Table.Cell>
                <Table.Cell>27/8/2024</Table.Cell>
                <Table.Cell>Đã xác nhận</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>2</Table.Cell>
                <Table.Cell>Trần Thị B</Table.Cell>
                <Table.Cell>0987654321</Table.Cell>
                <Table.Cell>Sân 2</Table.Cell>
                <Table.Cell>Cầu lông</Table.Cell>
                <Table.Cell>27/8/2024</Table.Cell>
                <Table.Cell>Đang chờ</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>3</Table.Cell>
                <Table.Cell>Lê Văn C</Table.Cell>
                <Table.Cell>0909123456</Table.Cell>
                <Table.Cell>Sân 3</Table.Cell>
                <Table.Cell>Bóng chuyền</Table.Cell>
                <Table.Cell>27/8/2024</Table.Cell>
                <Table.Cell>Đã hủy</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>4</Table.Cell>
                <Table.Cell>Phạm Thị D</Table.Cell>
                <Table.Cell>0911222333</Table.Cell>
                <Table.Cell>Sân 4</Table.Cell>
                <Table.Cell>Bóng rổ</Table.Cell>
                <Table.Cell>27/8/2024</Table.Cell>
                <Table.Cell>Đã xác nhận</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>5</Table.Cell>
                <Table.Cell>Hoàng Văn E</Table.Cell>
                <Table.Cell>0922333444</Table.Cell>
                <Table.Cell>Sân 5</Table.Cell>
                <Table.Cell>Tennis</Table.Cell>
                <Table.Cell>27/8/2024</Table.Cell>
                <Table.Cell>Đang chờ</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className='mt-16 border shadow-3xl p-5 rounded-xl'>
        <div className='flex mb-5'>
          <div className='h-7 w-2 bg-teal-400 mr-2 rounded-sm'></div>
          <Label className='text-lg' value='Vị trí các cơ sở' />
        </div>
        <MapFacility
          className='min-h-[750px] w-full !z-10'
        />
      </div>
    </div>
  )
}
