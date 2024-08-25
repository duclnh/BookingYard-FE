"use client"
import { CardStatistic, Heading } from '@components/index'
import { Button, Modal, Pagination, Select, Table } from 'flowbite-react'
import React, { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { IoMdSearch } from 'react-icons/io';
import { TbBasketDiscount, TbRosetteDiscountCheck, TbRosetteDiscountOff } from 'react-icons/tb'

export default function VoucherCompany() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const sampleData = [
    {
      id: 1,
      name: 'Giảm giá mùa hè',
      image: 'summer-sale.png',
      percentage: '20%',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      createdDate: '2024-05-15'
    },
    {
      id: 2,
      name: 'Giảm giá Black Friday',
      image: 'black-friday.png',
      percentage: '50%',
      startDate: '2024-11-24',
      endDate: '2024-11-30',
      createdDate: '2024-10-01'
    },
    {
      id: 3,
      name: 'Giảm giá Giáng sinh',
      image: 'christmas-sale.png',
      percentage: '30%',
      startDate: '2024-12-01',
      endDate: '2024-12-25',
      createdDate: '2024-11-15'
    }
  ];
  return (
    <>
      <div className='py-5 w-full'>
        <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Danh sách mã giảm giá' center />
        <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
          <CardStatistic
            title='Tổng số mã giảm giá'
            amount={3000}
            icon={TbBasketDiscount}
            gradientFrom='from-cyan-700'
            gradientTo='to-cyan-500'
            iconColor='text-cyan-700'
          />
          <CardStatistic
            title='Mã giảm giá đang còn'
            amount={3300}
            icon={TbRosetteDiscountCheck}
            gradientFrom='from-green-700'
            gradientTo='to-green-500'
            iconColor='text-green-700'
          />
          <CardStatistic
            title='Mã giảm giá đã hết'
            amount={3300}
            icon={TbRosetteDiscountOff}
            gradientFrom='from-red-700'
            gradientTo='to-red-500'
            iconColor='text-red-700'
          />
        </div>
        <div className='mt-36 bg-white'>
          <div className='mt-10 flex justify-between mb-3'>
            <div className='flex'>
              <input className='border rounded-md px-3 sm:w-96 w-80' name='search' placeholder={'Tìm tên nhân viên, địa chỉ'} />
              <Button className='p-1'>
                <IoMdSearch className='font-bold' size={18} />
              </Button>
            </div>
            <Select className=''>
              <option value="">Tất cả</option>
              <option value="">Đang còn</option>
              <option value="">Đã hết</option>
            </Select>
          </div>
          <div className="border min-w-full max-w-[1000px] overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className='w-10'>STT</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Tên mã giảm giá</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Ảnh</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Phần trăm</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Số lượng</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Ngày bắt đầu</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Ngày hết hạn</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Ngày tạo</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {sampleData.map((item, index) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell><img src={item.image} alt={item.name} className='w-10 h-10' /></Table.Cell>
                    <Table.Cell>{item.percentage}</Table.Cell>
                    <Table.Cell>{index}</Table.Cell>
                    <Table.Cell>{item.startDate}</Table.Cell>
                    <Table.Cell>{item.endDate}</Table.Cell>
                    <Table.Cell>{item.createdDate}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="flex justify-end">
            <Pagination
              layout="pagination"
              currentPage={currentPage}
              totalPages={1000}
              onPageChange={onPageChange}
              previousLabel=""
              nextLabel=""
              showIcons
            />
          </div>
        </div>
      </div>
      <Modal key={"cancel"} show={openModalCancel} size="md" onClose={() => setOpenModalCancel(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có muốn xóa môn thể thao này không?
            </h3>
            <div className="flex justify-center gap-4 mt-10">
              <Button type='submit' color="failure" onClick={() => setOpenModalCancel(false)}>
                Có
              </Button>
              <Button type='button' color="gray" onClick={() => setOpenModalCancel(false)}>
                Không
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
