"use client"
import { CardStatistic, EmptyList, Heading, Input, LoadingData } from '@components/index'
import { useAppSelector } from '@hooks/hooks'
import { deleteVoucher, getVoucherAdmin, getVoucherFacility, updateVoucher } from '@services/voucherService'
import { Button, Label, Modal, Pagination, Select, Spinner, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaEye, FaPencil } from 'react-icons/fa6'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { IoMdSearch } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri'
import { TbBasketDiscount, TbRosetteDiscountCheck, TbRosetteDiscountOff } from 'react-icons/tb'
import { PageResult, SportCreate, VoucherManagement } from 'types'
import qs from "query-string";
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { getSportCreate } from '@services/index'

export default function Voucher() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const user = useAppSelector(state => state.manager.value)
  const [vouchers, setVouchers] = useState<PageResult<VoucherManagement> | undefined>(undefined)
  const [search, setSearch] = useState<string>('')
  const [txtSearch, setTxtSearch] = useState<string>('')
  const { control, handleSubmit, reset, formState: { isSubmitting, isValid }, getValues, setValue } = useForm({ mode: "onTouched", });
  const [sports, setSports] = useState<SportCreate[]>([])
  const [change, setChange] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<string>('')

  const url = qs.stringifyUrl({
    url: "", query: {
      "search": search,
      "currentPage": currentPage,
      "orderBy": orderBy,
      "pageSize": 10,
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
    setIsLoading(true)
    getVoucherAdmin(url)
      .then(x => {
        if (x.status === 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy danh sách mã giảm giá")
        }
      }).then((vouchers: PageResult<VoucherManagement>) => {
        setVouchers(vouchers)
      })
      .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
      .finally(() => setIsLoading(false))

  }, [change, url])

  const handlerUpdateVoucher = async (data: FieldValues) => {
    try {
      var formData = new FormData();
      formData.append("VoucherID", data.voucherID);
      formData.append("VoucherName", data.voucherName);
      formData.append("Code", data.code);
      formData.append("Percentage", data.percentage);
      formData.append("Quantity", data.quantity);
      formData.append("RegisterDate", data.registerDateUpdate);
      formData.append("ExpiredDate", data.expiredDateUpdate);

      if (data.sportID) {
        formData.append("SportID", data.sportID);
      }

      var res = await updateVoucher(formData)
      console.log(res.data)
      if (res.status === 200) {
        toast.success("Cập nhật mã giảm giá thành công")
        setChange(!change)
        setOpenModalUpdate(false)
      } else if (res.status === 409) {
        toast.error("Mã code này đã có")
      } else {
        toast.error("Cập nhật mã giảm giá thất bại")
      }
    } catch (error) {
      toast.error("Lỗi hệ thống vui lòng thử lại")
    }
  }

  const handlerSelectVoucher = (voucher: VoucherManagement, handlerModal: Function) => {
    Object.keys(voucher).forEach(key => {
      if (key === 'registerDate' || key === 'expiredDate') {
        const dateString = voucher[key as keyof VoucherManagement];
        if (typeof (dateString) === 'string') {
          const [day, month, yearTime] = dateString.split("-");
          const [year] = yearTime.split(" ");
          setValue(`${key}Update`, `${year}-${month}-${day}`);
        }
      }
      setValue(key as keyof VoucherManagement, voucher[key as keyof VoucherManagement])
    });
    handlerModal(true)
  }

  const handlerDeleteVoucher = () => {
    if (getValues("voucherID") === '') {
      toast.error("Vui lòng chọn voucher")
    }
    setIsDelete(true)
    deleteVoucher(getValues("voucherID"))
      .then(x => {
        if (x.status === 200) {
          toast.success(`Xóa mã giảm giá ${getValues("voucherName")} thành công`)
          setOpenModalCancel(false);
          reset()
          setChange(!change)
        } else {
          toast.error(`Xóa mã giảm giá ${getValues("voucherName")} thất bại`)
        }
      })
      .catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
      .finally(() => setIsDelete(false))
  }

  return (
    <>
      <div className='py-5 w-full'>
        <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Danh sách mã giảm giá' center />
        {/* <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
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
        </div> */}
        <div className='mt-36 bg-white'>
          <div className='mt-10 md:flex justify-between mb-3'>
            <div className='flex'>
              <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTxtSearch(e.target.value)} className='border rounded-md px-3 w-full md:w-96' name='search' placeholder={'Tìm tên mã giảm giá'} />
              <Button className='p-1' onClick={() => setSearch(txtSearch)}>
                <IoMdSearch className='font-bold' size={18} />
              </Button>
            </div>
            <Select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOrderBy(e.target.value)} className='mt-3 md:mt-0'>
              <option value="">Tất cả</option>
              <option value="stock">Đang còn</option>
              <option value="outStock">Đã hết</option>
              <option value="isDeleted">Đã xoá</option>
            </Select>
          </div>
          <div className="border rounded-lg min-w-full max-w-[390px] overflow-x-auto">
            <Table hoverable>
              <Table.Head className='text-center'>
                <Table.HeadCell>STT</Table.HeadCell>
                <Table.HeadCell className='min-w-44'>Tên mã giảm giá</Table.HeadCell>
                {/* <Table.HeadCell className='min-w-44'>Ảnh</Table.HeadCell> */}
                <Table.HeadCell className='max-w-28'>Phần trăm</Table.HeadCell>
                <Table.HeadCell className='max-w-28'>Số lượng</Table.HeadCell>
                <Table.HeadCell className='max-w-28'>Ngày tạo</Table.HeadCell>
                <Table.HeadCell className='max-w-28'>Trang thái</Table.HeadCell>
                {/* <Table.HeadCell className='max-w-24'>Ngày bắt đầu</Table.HeadCell>
                <Table.HeadCell className='max-w-24'>Ngày hết hạn</Table.HeadCell> */}
                {/* <Table.HeadCell className='min-w-44'>Ngày tạo</Table.HeadCell> */}
                <Table.HeadCell className='max-w-24'>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {isLoading ? <Table.Cell colSpan={6}>
                  <LoadingData />
                </Table.Cell> :
                  vouchers != undefined && vouchers.results.length > 0 ?
                    vouchers.results.map((voucher: VoucherManagement, index) => (
                      <Table.Row className='text-center' key={voucher.voucherID}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell className='font-bold text-left'>{voucher.voucherName}</Table.Cell>
                        {/* <Table.Cell><img src={item.image} alt={item.name} className='w-10 h-10' /></Table.Cell> */}
                        <Table.Cell>{voucher.percentage}</Table.Cell>
                        <Table.Cell>{voucher.quantity}</Table.Cell>
                        <Table.Cell>{voucher.createDate}</Table.Cell>
                        <Table.Cell>
                          {voucher.isDeleted ? (
                            <p className="bg-red-200 text-red-500 p-1 rounded-md text-center font-bold">
                              Đã hủy
                            </p>
                          ) : !voucher.isStarted ? (
                            <p className="bg-yellow-200 text-yellow-500 p-1 rounded-md text-center font-bold">
                              Chưa bắt đầu
                            </p>
                          ) : voucher.isEnded ? (
                            <p className="bg-blue-200 text-blue-500 p-1 rounded-md text-center font-bold">
                              Đã kết thúc
                            </p>
                          ) : (
                            <p className="bg-green-200 text-green-500 p-1 rounded-md text-center font-bold">
                              Đang hoạt động
                            </p>
                          )}
                        </Table.Cell>
                        {/* <Table.Cell>{voucher.registerDate}</Table.Cell>
                    <Table.Cell>{voucher.expiredDate}</Table.Cell> */}
                        {/* <Table.Cell>{item.createdDate}</Table.Cell> */}
                        <Table.Cell className='flex space-x-2 justify-center'>
                          <Button onClick={() => handlerSelectVoucher(voucher, setOpenModalView)} size='xs'>
                            <FaEye size={16} />
                          </Button>
                          <Button onClick={() => handlerSelectVoucher(voucher, setOpenModalUpdate)} color='warning' type='submit' size='xs'>
                            <FaPencil size={16} />
                          </Button>
                          <Button onClick={() => handlerSelectVoucher(voucher, setOpenModalCancel)} color='failure' type='submit' size='xs'>
                            <RiDeleteBinLine size={16} />
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))
                    : <Table.Cell colSpan={6}>
                      <EmptyList />
                    </Table.Cell>
                }
              </Table.Body>
            </Table>
          </div>
          {vouchers != undefined && vouchers.totalPages > 0 && (
            <div className="flex justify-end">
              <Pagination
                layout="pagination"
                currentPage={currentPage}
                totalPages={vouchers?.totalPages || 0}
                onPageChange={onPageChange}
                previousLabel=""
                nextLabel=""
                showIcons
              />
            </div>
          )}
        </div>
      </div>
      <Modal key={"update"} show={openModalUpdate} size="xl" onClose={() => {
        setOpenModalUpdate(false)
        reset()
      }} popup>
        <Modal.Header className='border-b-2'>
          <p className='text-lg ml-4'>Cập nhật thông tin mã giảm giá</p>
        </Modal.Header>
        <form method='PUT' className="mt-5" onSubmit={handleSubmit(handlerUpdateVoucher)}>
          <Modal.Body>
            <div className='mt-2 grid sm:grid-cols-2 gap-10'>
              <div>
                <Input
                  label='Tên mã giảm giá (*)'
                  type='text'
                  name='voucherName'
                  control={control}
                  rules={{
                    required: "Vui lòng nhập tên giảm giá",
                  }}
                />
                <div className='mt-3'>
                  <Input
                    label='Phần trăm giảm (*)'
                    type='number'
                    name='percentage'

                    control={control}
                    rules={{
                      required: "Vui lòng nhập phần trăm giảm",
                      min: {
                        value: 0,
                        message: "Vui lòng nhập phần trăm giảm lớn hơn 0"
                      },
                      max: {
                        value: 100,
                        message: "Vui lòng nhập phần trăm giảm nhỏ hơn 100"
                      }
                    }}
                  />
                </div>
                <div className='mt-3'>
                  <Input
                    label='Ngày bắt đầu (*)'
                    type='date'
                    name='registerDateUpdate'
                    control={control}
                    rules={{
                      required: "Vui lòng nhập ngày bắt đầu",
                    }}
                  />
                </div>
                <div className='mt-3'>
                  <Input
                    label='Ngày kết thúc (*)'
                    type='date'
                    name='expiredDateUpdate'
                    control={control}
                    rules={{
                      required: "Vui lòng nhập ngày kết thúc",
                    }}
                  />
                </div>
              </div>
              <div>

                <div className='mb-3'>
                  <Label htmlFor='package' value='Môn thể thao (*)' />
                  <Controller
                    name='sportID'
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          className='focus:ring-transparent'
                          id="package"
                        >
                          <option value='0'>Tất cả</option>
                          {sports.map((sport: SportCreate, index) => (
                            <option key={index} value={sport.sportID}>{sport.sportName}</option>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                </div>
                <div className='mt-3'>
                  <Input
                    label='Số lượng (*)'
                    type='number'
                    name='quantity'
                    control={control}
                    rules={{
                      required: "Vui lòng nhập số lượng",
                      min: {
                        value: 1,
                        message: "Vui lòng nhập số lượng tối thiểu 1"
                      },
                    }}
                  />
                </div>
                <div>
                  {/* <InputImage
                label='Ảnh mã giảm giá'
                name='image'
                value={image}
                setFile={setImage}
              />  */}
                  <div className='mt-3'>
                    <Input
                      label='Mã giảm giá'
                      type='text'
                      name='code'
                      control={control}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="pt-4 border-t-2  flex justify-center gap-4">
            <Button type='submit' size='md' color="info">
              {isSubmitting ? <Spinner /> : "Cập nhật"}
            </Button>
            <Button size='md' color="gray" onClick={() => {
              setOpenModalUpdate(false)
              reset()
            }}>
              Không
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal key={"view"} show={openModalView} size="xl" onClose={() => {
        setOpenModalView(false)
        reset();
      }} popup>
        <Modal.Header className='border-b-2'>
          <p className='text-lg ml-4'>Thông tin voucher</p>
        </Modal.Header>
        <Modal.Body>
          <div className='mt-2 grid sm:grid-cols-2 gap-10'>
            <div>
              <Input
                label='Tên mã giảm giá (*)'
                type='text'
                name='voucherName'
                readOnly
                control={control}
              />
              <div className='mt-3'>
                <Input
                  label='Phần trăm giảm (*)'
                  type='number'
                  name='percentage'
                  readOnly
                  control={control}
                />
              </div>
              <div className='mt-3'>
                <Input
                  label='Ngày bắt đầu (*)'
                  type='text'
                  name='registerDate'
                  readOnly
                  control={control}
                />
              </div>
              <div className='mt-3'>
                <Input
                  label='Ngày kết thúc (*)'
                  type='text'
                  name='expiredDate'
                  readOnly
                  control={control}
                />
              </div>
            </div>
            <div>

              <div className='mb-3'>
                <Label htmlFor='package' value='Môn thể thao (*)' />
                <Controller
                  name='sportID'
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        className='focus:ring-transparent pointer-events-none'
                        id="package"
                      >
                        <option value='0'>Tất cả</option>
                        {sports.map((sport: SportCreate, index) => (
                          <option key={index} value={sport.sportID}>{sport.sportName}</option>
                        ))}
                      </Select>
                    </>
                  )}
                />
              </div>
              <div className='mt-3'>
                <Input
                  label='Số lượng (*)'
                  type='number'
                  name='quantity'
                  readOnly
                  control={control}
                />
              </div>
              <div>
                {/* <InputImage
                label='Ảnh mã giảm giá'
                name='image'
                value={image}
                setFile={setImage}
              />  */}
                <div className='mt-3'>
                  <Input
                    readOnly
                    label='Mã giảm giá'
                    type='text'
                    name='code'
                    control={control}
                  />
                </div>
                <div className='mt-3'>
                  <Input
                    label='Ngày tạo(*)'
                    type='text'
                    name='createDate'
                    readOnly
                    control={control}
                  />
                  <div className='mt-3'>
                    <Label>Trạng thái</Label>
                    {getValues('isDeleted') ? (
                      <p className="bg-red-200 text-red-500 p-1 py-2 rounded-md text-center font-bold">
                        Đã hủy
                      </p>
                    ) : !getValues('isStarted') ? (
                      <p className="bg-yellow-200 text-yellow-500 p-1 py-2 rounded-md text-center font-bold">
                        Chưa bắt đầu
                      </p>
                    ) : getValues('isEnded') ? (
                      <p className="bg-blue-200 text-blue-500 p-1 py-2 rounded-md text-center font-bold">
                        Đã kết thúc
                      </p>
                    ) : (
                      <p className="bg-green-200 text-green-500 p-1 py-2 rounded-md text-center font-bold">
                        Đang hoạt động
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal key={"cancel"} show={openModalCancel} size="md" onClose={() => {
        reset()
        setOpenModalCancel(false)
      }} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có muốn xóa mã giảm giá {getValues('voucherName')} không?
            </h3>
            <div className="flex justify-center gap-4 mt-10">
              <Button type='submit' color="failure" onClick={handlerDeleteVoucher}>
                {isDelete ? <Spinner /> : "Xóa"}
              </Button>
              <Button type='button' color="gray" onClick={() => {
                reset()
                setOpenModalCancel(false)
              }}>
                Không
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
