"use client"
import { CardStatistic, Heading } from '@components/index'
import { Button, Modal, Pagination, Select, Table } from 'flowbite-react'
import React, { useState } from 'react'
import { BsBuilding } from 'react-icons/bs'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { IoMdSearch } from 'react-icons/io';

export default function StaffCompany() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  const [openModalCancel, setOpenModalCancel] = useState(false);
  return (
    <>
      <div className='py-5 w-full'>
        <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Danh sách nhân viên' center />
        <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
          <CardStatistic
            title='Tổng số nhân viên'
            amount={3000}
            icon={BsBuilding}
            gradientFrom='from-cyan-700'
            gradientTo='to-cyan-500'
            iconColor='text-cyan-700'
          />
          <CardStatistic
            title='Đang hoạt động'
            amount={3300}
            icon={BsBuilding}
            gradientFrom='from-green-700'
            gradientTo='to-green-500'
            iconColor='text-green-700'
          />
          <CardStatistic
            title='Đã ngưng hoạt động'
            amount={3300}
            icon={BsBuilding}
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
              <option value="">Đang hoạt động</option>
              <option value="">Đã ngưng hoạt động</option>
            </Select>
          </div>
          <div className="border min-w-full max-w-[1000px] overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className='w-10'>STT</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Tên nhân viên</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Email</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Số điện thoại</Table.HeadCell>
                <Table.HeadCell className='min-w-80'>Địa chỉ</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Giới tính</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Chức vụ</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Ảnh</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Hình thức</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Lương</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Ngày tạo</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>1</Table.Cell>
                  <Table.Cell>Nguyen Van A</Table.Cell>
                  <Table.Cell>a.nguyen@example.com</Table.Cell>
                  <Table.Cell>0912345678</Table.Cell>
                  <Table.Cell>123 Đường ABC, Quận 1, TP.HCM</Table.Cell>
                  <Table.Cell>Nam</Table.Cell>
                  <Table.Cell>Quản lý</Table.Cell>
                  <Table.Cell><img src="/images/nguyen-van-a.jpg" alt="Nguyen Van A" className="w-8 h-8" /></Table.Cell>
                  <Table.Cell>Toàn thời gian</Table.Cell>
                  <Table.Cell>20,000,000 VND</Table.Cell>
                  <Table.Cell>2024-08-25</Table.Cell>
                  <Table.Cell>
                    <Button color='primary' className='mt-4' type='submit' size='xs'>Edit</Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>2</Table.Cell>
                  <Table.Cell>Tran Thi B</Table.Cell>
                  <Table.Cell>b.tran@example.com</Table.Cell>
                  <Table.Cell>0912345679</Table.Cell>
                  <Table.Cell>456 Đường XYZ, Quận 2, TP.HCM</Table.Cell>
                  <Table.Cell>Nữ</Table.Cell>
                  <Table.Cell>Nhân viên</Table.Cell>
                  <Table.Cell><img src="/images/tran-thi-b.jpg" alt="Tran Thi B" className="w-8 h-8" /></Table.Cell>
                  <Table.Cell>Bán thời gian</Table.Cell>
                  <Table.Cell>15,000,000 VND</Table.Cell>
                  <Table.Cell>2024-08-24</Table.Cell>
                  <Table.Cell>
                    <Button color='primary' className='mt-4' type='submit' size='xs'>Edit</Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>3</Table.Cell>
                  <Table.Cell>Le Van C</Table.Cell>
                  <Table.Cell>c.le@example.com</Table.Cell>
                  <Table.Cell>0912345680</Table.Cell>
                  <Table.Cell>789 Đường DEF, Quận 3, TP.HCM</Table.Cell>
                  <Table.Cell>Nam</Table.Cell>
                  <Table.Cell>Trưởng phòng</Table.Cell>
                  <Table.Cell><img src="/images/le-van-c.jpg" alt="Le Van C" className="w-8 h-8" /></Table.Cell>
                  <Table.Cell>Toàn thời gian</Table.Cell>
                  <Table.Cell>25,000,000 VND</Table.Cell>
                  <Table.Cell>2024-08-23</Table.Cell>
                  <Table.Cell>
                    <Button color='primary' className='mt-4' type='submit' size='xs'>Edit</Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>4</Table.Cell>
                  <Table.Cell>Pham Thi D</Table.Cell>
                  <Table.Cell>d.pham@example.com</Table.Cell>
                  <Table.Cell>0912345681</Table.Cell>
                  <Table.Cell>101 Đường GHI, Quận 4, TP.HCM</Table.Cell>
                  <Table.Cell>Nữ</Table.Cell>
                  <Table.Cell>Nhân viên</Table.Cell>
                  <Table.Cell><img src="/images/pham-thi-d.jpg" alt="Pham Thi D" className="w-8 h-8" /></Table.Cell>
                  <Table.Cell>Bán thời gian</Table.Cell>
                  <Table.Cell>17,000,000 VND</Table.Cell>
                  <Table.Cell>2024-08-22</Table.Cell>
                  <Table.Cell>
                    <Button color='primary' className='mt-4' type='submit' size='xs'>Edit</Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>5</Table.Cell>
                  <Table.Cell>Vo Van E</Table.Cell>
                  <Table.Cell>e.vo@example.com</Table.Cell>
                  <Table.Cell>0912345682</Table.Cell>
                  <Table.Cell>202 Đường JKL, Quận 5, TP.HCM</Table.Cell>
                  <Table.Cell>Nam</Table.Cell>
                  <Table.Cell>Quản lý</Table.Cell>
                  <Table.Cell><img src="/images/vo-van-e.jpg" alt="Vo Van E" className="w-8 h-8" /></Table.Cell>
                  <Table.Cell>Toàn thời gian</Table.Cell>
                  <Table.Cell>22,000,000 VND</Table.Cell>
                  <Table.Cell>2024-08-21</Table.Cell>
                  <Table.Cell>
                    <Button color='primary' className='mt-4' type='submit' size='xs'>Edit</Button>
                  </Table.Cell>
                </Table.Row>
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
