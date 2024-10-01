"use client"
import { CardStatistic, EmptyList, Heading, Loading, LoadingData } from '@components/index'
import { Button, Label, Modal, Pagination, Select, Table, TableCell, Textarea, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaEye, FaPencil } from 'react-icons/fa6'
import { IoMdSearch } from 'react-icons/io'
import { MdHeadsetMic, MdHeadsetOff } from 'react-icons/md'
import { PiHeadCircuitBold } from 'react-icons/pi'
import { PageResult, StatisticSupport, Support as SupportModel, UserUpdate } from 'types'
import qs from "query-string";
import { getAllSupport, getStatisticSupport, updateSupport } from '@services/index'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { getUserUpdate } from '@services/userService'

export default function Support() {
    const [currentPage, setCurrentPage] = useState(1);
    const [value, setValue] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [listSupports, setListSupports] = useState<PageResult<SupportModel> | undefined>(undefined)
    const [statisticSupport, setStatisticSupport] = useState<StatisticSupport | undefined>(undefined)
    const [userUpdate, setUserUpdate] = useState<UserUpdate | undefined>(undefined)
    const [support, setSupport] = useState<SupportModel | undefined>(undefined)
    const [type, setType] = useState("")
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const url = qs.stringifyUrl({
        url: "", query: {
            "search": search,
            "currentPage": currentPage,
            "pageSize": 10,
            "type": type
        }
    });
    const handlerClick = () => {
        setSearch(value)
    }

    const handlerCloseViewDetail = () => {
        setUserUpdate(undefined);
        setOpenModalUpdate(false);
    }

    const handlerChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        if (e.target.value.length == 0 && search.length > 0) {
            setSearch('')
        }
    }

    const handlerViewDetail = (support: SupportModel) => {
        setSupport(support)
        if (support.modifiedBy) {
            getUserUpdate(support.modifiedBy)
                .then(x => {
                    if (x.status == 200) {
                        return x.data
                    }
                })
                .then((user: UserUpdate) => {
                    setUserUpdate(user)
                }).catch(() => {
                    toast.error("Hệ thống đang lỗi vui lòng thử lại sau!", { duration: 120 })
                });
        }
        setOpenModalUpdate(true)
    }

    const handlerUpdateSupport = async (e: any) => {
        e.preventDefault();
        try {
            var res = await updateSupport(support?.id, support?.note)
            if (res.status == 200) {
                toast.success('Cập nhật thành công');
                getAllSupport(url)
                    .then(x => {
                        if (x.status == 200) {
                            return x.data
                        }
                    })
                    .then((listSupports: PageResult<SupportModel>) => {
                        setListSupports(listSupports);
                    })
                    .catch(() => {
                        toast.error("Hệ thống đang lỗi vui lòng thử lại sau!", { duration: 120 })
                    });
                setOpenModalUpdate(false);
            } else {
                toast.error("Cập nhật thất bại")
            }
        } catch {
            toast.error("Lỗi hệ thống vui lòng thử lại")
        }
    }

    useEffect(() => {
        getStatisticSupport()
            .then(x => {
                if (x.status == 200) {
                    return x.data
                }
            })
            .then((statistic: StatisticSupport) => {
                setStatisticSupport(statistic);
            })
            .catch(() => {
                toast.error("Hệ thống đang lỗi vui lòng thử lại sau!", { duration: 120 })
            }).finally(() => {
                setLoading(false)
            });
    }, [])

    useEffect(() => {
        setLoading(true)
        getAllSupport(url)
            .then(x => {
                if (x.status == 200) {
                    return x.data
                }
            })
            .then((listSupports: PageResult<SupportModel>) => {
                setListSupports(listSupports);
            })
            .catch(() => {
                toast.error("Hệ thống đang lỗi vui lòng thử lại sau!", { duration: 120 })
            }).finally(() => {
                setLoading(false)
            });
    }, [url]);
    return (
        <>
            <div className='py-5 w-full'>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Liên hệ từ khách hàng' center />
                {statisticSupport && (
                    <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
                        <CardStatistic
                            title='Tổng số liên hệ'
                            amount={statisticSupport.totalSupport}
                            icon={PiHeadCircuitBold}
                            gradientFrom='from-cyan-700'
                            gradientTo='to-cyan-500'
                            iconColor='text-cyan-700'
                        />
                        <CardStatistic
                            title='Đã liên hệ'
                            amount={statisticSupport.totalProcessed}
                            icon={MdHeadsetMic}
                            gradientFrom='from-green-700'
                            gradientTo='to-green-500'
                            iconColor='text-green-700'
                        />
                        <CardStatistic
                            title='Chưa liên hệ'
                            amount={statisticSupport.totalUnProcessed}
                            icon={MdHeadsetOff}
                            gradientFrom='from-red-700'
                            gradientTo='to-red-500'
                            iconColor='text-red-700'
                        />
                    </div>
                )}
                <div className='mt-36 bg-white'>
                    <div className='mt-10 sm:flex justify-between mb-3'>
                        <div className='flex'>
                            <input onChange={handlerChangeSearch} className='border rounded-md px-3 sm:w-96 w-full' name='search' value={value} placeholder={'Tìm kiếm theo tên, số điện thoại'} />
                            <Button className='p-1' onClick={handlerClick}>
                                <IoMdSearch className='font-bold' size={18} />
                            </Button>
                        </div>
                        <Select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)} className='mt-3 md:mt-0'>
                            <option value="">Tất cả</option>
                            <option value="0">Tư vấn</option>
                            <option value="1">Liên hệ</option>
                        </Select>
                    </div>
                    <div className="border rounded-lg min-w-full max-w-[390px] overflow-x-auto">
                        <Table hoverable>
                            <Table.Head className='text-center'>
                                <Table.HeadCell>STT</Table.HeadCell>
                                <Table.HeadCell className='min-w-32 text-left'>Họ và tên</Table.HeadCell>
                                <Table.HeadCell className='min-w-32 text-left'>Số điện thoại</Table.HeadCell>
                                <Table.HeadCell className='min-w-48 text-left'>Nội dung</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Loại</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Trạng thái</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>Ngày tạo</Table.HeadCell>
                                <Table.HeadCell className='min-w-32'>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {loading ? <TableCell colSpan={8}>
                                    <LoadingData />
                                </TableCell> :
                                    listSupports && listSupports.results.length > 0 ? <>
                                        {listSupports?.results.map((support: SupportModel, index: number) => (
                                            <Table.Row key={index} className='text-center'>
                                                <Table.Cell>{++index}</Table.Cell>
                                                <Table.Cell className='text-left text-black font-bold'>{support.name}</Table.Cell>
                                                <Table.Cell className='text-left'>{support.phone}</Table.Cell>
                                                <Table.Cell className='text-left'>{support.content}</Table.Cell>
                                                <Table.Cell>
                                                    {support.typeSupport == "Contact" ?
                                                        <p className='text-black font-bold'>
                                                            Liên hệ
                                                        </p>
                                                        : <p className='text-black font-bold'>
                                                            Tư vấn
                                                        </p>
                                                    }
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {support.isProcessed ?
                                                        <p className='bg-green-200 text-green-500 p-1 rounded-md text-center font-bold'>
                                                            Đã xử lí
                                                        </p>
                                                        : <p className='bg-yellow-200 text-yellow-700 p-1 rounded-md text-center font-bold'>
                                                            Chưa xử lí
                                                        </p>
                                                    }
                                                </Table.Cell>
                                                <Table.Cell>{support.createdAt}</Table.Cell>
                                                <Table.Cell className='flex space-x-2'>
                                                    <Button size='xs' onClick={() => handlerViewDetail(support)}>
                                                        <FaEye size={16} />
                                                    </Button>
                                                    {support.typeSupport == "Partner" && (
                                                        <Button color='warning' type='submit' size='xs'>
                                                            <FaPencil size={16} />
                                                        </Button>
                                                    )}
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </> : <Table.Row>
                                        <TableCell colSpan={8}>
                                            <EmptyList />
                                        </TableCell>
                                    </Table.Row>
                                }
                            </Table.Body>
                        </Table>
                    </div>
                    {!loading && listSupports && listSupports.totalPages > 0 && (
                        <div className="flex justify-end">
                            <Pagination
                                layout="pagination"
                                currentPage={currentPage}
                                totalPages={listSupports?.totalPages || 0}
                                onPageChange={onPageChange}
                                previousLabel=""
                                nextLabel=""
                                showIcons
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Start Update */}
            <Modal show={openModalUpdate} size="3xl" onClose={handlerCloseViewDetail} popup>
                <form id='update-support' method='PUT' className="mt-5" onSubmit={handlerUpdateSupport}>
                    <Modal.Header className='border-b-2'>
                        <p className='text-lg ml-4'>Thông tin chi tiết</p>
                    </Modal.Header>
                    <Modal.Body>

                        <div className='my-3 grid grid-cols-2 gap-10'>
                            <div className='space-y-3'>
                                <div>
                                    <Label>Họ và tên</Label>
                                    <TextInput
                                        readOnly
                                        value={support?.name}
                                    />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <TextInput
                                        readOnly
                                        value={support?.email}
                                    />
                                </div>
                                <div>
                                    <Label>Số điện thoại</Label>
                                    <TextInput
                                        readOnly
                                        value={support?.phone}
                                    />
                                </div>
                                <div>
                                    <Label>Nội dung</Label>
                                    <Textarea
                                        readOnly
                                        rows={3}
                                        defaultValue={support?.content}
                                    />
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <div>
                                    <Label>Loại</Label>
                                    <TextInput
                                        readOnly
                                        value={support?.typeSupport == "Contact" ? "Liên hệ" : "Tư vấn"}
                                    />
                                </div>
                                <div>
                                    <Label>Trạng thái</Label>
                                    {support?.isProcessed ?
                                        <p className='bg-green-200 text-green-500 p-2 rounded-md text-center font-bold'>
                                            Đã xử lí
                                        </p>
                                        : <p className='bg-yellow-200 text-yellow-700 p-2 rounded-md text-center font-bold'>
                                            Chưa xử lí
                                        </p>
                                    }
                                </div>
                                <div>
                                    <Label>Ngày tạo</Label>
                                    <TextInput
                                        readOnly
                                        value={support?.createdAt}
                                    />
                                </div>

                                <div>
                                    <Label>Ghi chú</Label>
                                    <Textarea
                                        placeholder="Nội dung..."
                                        rows={3}
                                        defaultValue={support?.note}
                                        required
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            if (support) {
                                                setSupport({ ...support, note: e.target.value });
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        {support?.modifiedBy && userUpdate && (
                            <div className='grid sm:grid-cols-2'>
                                <div>
                                    <Label className='mb-2'>Người cập nhật</Label>
                                    <div className='border-b-2 border-white flex justify-between items-center space-x-2'>
                                        <Image height={45} width={45} src={`${userUpdate?.imageUrl ? userUpdate?.imageUrl : '"/assets/images/avatar-default.png"'}`} alt="avatar" />
                                        <div className='mt-2'>
                                            <div className='text-base font-medium'>{userUpdate?.name}</div>
                                            <div className='mt-0.5 text-sm'>{userUpdate?.role == 'Customer' ? 'No' : ''}</div>
                                        </div>
                                        <p className='text-center max-w-24'>{support.modifiedAt}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="pt-4 border-t-2  flex justify-center gap-4">
                        <Button type='submit' size='md' color="info">
                            Cập nhật
                        </Button>
                        <Button size='md' color="gray" onClick={handlerCloseViewDetail}>
                            Không
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            {/* End Report */}
        </>
    )
}
