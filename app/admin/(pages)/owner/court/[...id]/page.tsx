"use client"
import { CardStatistic, Input, InputImage, Loading, ModalView } from '@components/index'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Button, Label, Modal, Select, Spinner } from 'flowbite-react';
import { CourtDetail, SportCreate } from 'types';
import { getSportCreate } from '@services/sportService';
import toast from 'react-hot-toast';
import { getCourtDetail, updateCourt } from '@services/courtService';
import { getImage } from '@utils/imageOptions';
import { useAppSelector } from '@hooks/hooks';


export default function DetailPage({ params }: { params: { id: string } }) {
    const user = useAppSelector(state => state.manager.value);
    const [court, setCourt] = useState<CourtDetail | undefined>(undefined);
    const { control, handleSubmit, reset, formState: { isSubmitting, isValid }, setValue } = useForm({ mode: "onTouched", });
    const [sports, setSports] = useState<SportCreate[]>([])
    const [imageCourt, setImageCourt] = useState<File>()
    const [image360, setImage360] = useState<File>()
    const [reloading, setReloading] = useState<boolean>(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
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
            }).catch(() => {
                toast.error("Lỗi hệ thống vui lòng thử lại sau")
            })
    }, [])

    useEffect(() => {
        getCourtDetail(params.id)
            .then(x => {
                if (x.status == 200) {
                    return x.data
                }
            })
            .then((court: CourtDetail) => {
                setCourt(court);
                setValue('name', court.courtName)
                setValue('price', court.courtPrice)
                setValue('numberPlayer', court.numberPlayer)
                setValue('sport', court.sportID)
            })
            .catch(() => {
                toast.error("Lỗi hệ thống vui lòng thử lại sau")
            });
    }, [reloading])

    const handlerUpdateSupport = async (data: FieldValues) => {
        try {
            console.log(data)
            var formData = new FormData();
            formData.append("courtID", court?.courtID.toString() || '');
            formData.append("facilityID", user?.facilityID || '');
            formData.append("courtName", data.updateName)
            if (imageCourt !== undefined) {
                formData.append("image", imageCourt);
            }
            if (image360 !== undefined) {
                formData.append("image360", image360);
            }
            formData.append("numberPlayer", data.updateNumberPlayer);
            formData.append("sportID", data.updateSport);
            formData.append("courtPrice", data.updatePrice);
            formData.append("isActive", data.isActive);

            var res = await updateCourt(formData)
            if (res.status === 200) {
                toast.success("Cập nhật thông tin sân thành công")
                reset()
                setImageCourt(undefined)
                setImage360(undefined)
                setOpenModalUpdate(false);
                setReloading(!reloading);
            } else {
                toast.error("Cập nhật thông tin sân thất bại")
                console.log(res.data)
            }
        } catch (error) {
            toast.error("Lỗi hệ thống vui lòng thử lại")
        }
    }
    return (
        <>
            <div className='py-5 px-20 w-full'>
                <div className='mt-10'>
                    {/* Start information court */}
                    <div className='grid place-items-center'>
                        <div className='text-3xl font-bold mr-3'>
                            Thông tin chi tiết sân
                        </div>
                    </div>
                    {/* <div className='my-24 w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-10  place-items-center'>
                        <CardStatistic
                            title='Đặt lịch'
                            amount={3000}
                            icon={BsBuilding}
                            gradientFrom='from-cyan-700'
                            gradientTo='to-cyan-500'
                            iconColor='text-cyan-700'
                        />
                        <CardStatistic
                            title='Hủy đặt lịch'
                            amount={3300}
                            icon={BsBuildingCheck}
                            gradientFrom='from-green-700'
                            gradientTo='to-green-500'
                            iconColor='text-green-700'
                        />
                        <CardStatistic
                            title='Báo cáo'
                            amount={3300}
                            icon={BsBuildingFillX}
                            gradientFrom='from-red-700'
                            gradientTo='to-red-500'
                            iconColor='text-red-700'
                        />
                    </div> */}
                    <div className='my-20 border shadow-3xl p-5 rounded-xl min-h-96'>
                        <div className='grid sm:grid-cols-2 gap-20'>
                            <div className=''>
                                <div className='mb-3'>
                                    <Label className='mb-1' value='Ảnh sân (*)' />
                                    <Image className='rounded-md' src={getImage(court?.image) || '/assets/images/logo.png'} height={600} width={600} alt='Sân' />
                                </div>
                                <div>
                                    <Label className='mb-1' value='Ảnh 360 (*)' />
                                    <Image className='rounded-md' src={getImage(court?.image360) || '/assets/images/logo.png'} height={600} width={600} alt='Sân' />
                                </div>
                            </div>
                            <div className=''>
                                <div className='mb-3'>
                                    <Input readOnly label='Tên sân (*)' name='name' type='text' control={control} />
                                </div>
                                <div className='mb-3'>
                                    <Label htmlFor='sport' value='Môn thể thao (*)' />
                                    <Controller
                                        name='sport'
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    className='focus:ring-transparent pointer-events-none'
                                                    id="sport"
                                                    color={
                                                        fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                                    }
                                                >
                                                    <option value={""}>Chọn môn thể thao</option>
                                                    {sports.map((sport: SportCreate, index) => (
                                                        <option key={index} value={sport.sportID}>{sport.sportName}</option>
                                                    ))}
                                                </Select>
                                                {fieldState.error && (
                                                    <div className="text-red-500 text-sm mt-2">
                                                        {fieldState.error.message}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <Input readOnly label='Số người chơi (*)' name='numberPlayer' type='text' control={control} />
                                </div>
                                <div className='mb-3'>
                                    <Input readOnly label='Giá sân (*)' name='price' type='text' control={control} />
                                </div>
                                <div className='mb-3'>
                                    <Label>Trạng thái</Label>
                                    {court?.isActive ?
                                        <p className='bg-green-200 text-green-500 p-2 rounded-md text-center font-bold'>
                                            Đang hoạt động
                                        </p>
                                        : <p className='bg-yellow-200 text-yellow-700 p-2 rounded-md text-center font-bold'>
                                            Đang bảo trì
                                        </p>
                                    }
                                </div>
                                <div className='flex space-x-4'>
                                    <Button onClick={() => setOpenModalUpdate(true)} type='button'>Cập nhật</Button>
                                    {/* <Button color={'failure'} type='button'>Xóa</Button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Start Update */}
                <Modal show={openModalUpdate} size="3xl" onClose={() => setOpenModalUpdate(false)} popup>
                    <form method='PUT' className="mt-5" onSubmit={handleSubmit(handlerUpdateSupport)}>
                        <Modal.Header className='border-b-2'>
                            <p className='text-lg ml-4'>Cập nhật thông tin sân</p>
                        </Modal.Header>
                        <Modal.Body className='overflow-y-auto max-h-[500px]'>
                            <div className='mt-5 grid grid-cols-2 gap-5'>
                                <div>
                                    <InputImage
                                        name='image'
                                        label='Ảnh sân (*)'
                                        value={imageCourt}
                                        setFile={setImageCourt}
                                        required="Vui chọn ảnh sân"
                                    />
                                </div>
                                <InputImage
                                    name='360'
                                    label='Ảnh 360 sân (*)'
                                    value={image360}
                                    setFile={setImage360}
                                    required="Vui chọn ảnh 360 sân"
                                />
                            </div>
                            <div className='mb-3'>
                                <Input
                                    label='Tên sân (*)'
                                    type='text'
                                    name='updateName'
                                    value={court?.courtName}
                                    control={control}
                                    rules={{
                                        required: "Vui lòng nhập tên sân",
                                    }}
                                />
                            </div>
                            <div className='grid sm:grid-cols-2 gap-10'>
                                <div>
                                    <Label htmlFor='updateSport' value='Môn thể thao (*)' />
                                    <Controller
                                        name='updateSport'
                                        defaultValue={court?.sportID}
                                        control={control}
                                        rules={{ required: 'Vui lòng nhập môn thể thao' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    className='focus:ring-transparent'
                                                    id="updateSport"
                                                    color={
                                                        fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                                    }
                                                >
                                                    <option value=''>Chọn môn thể thao</option>
                                                    {sports.map((sport: SportCreate, index) => (
                                                        <option key={index} value={sport.sportID}>{sport.sportName}</option>
                                                    ))}
                                                </Select>
                                                {fieldState.error && (
                                                    <div className="text-red-500 text-sm mt-2">
                                                        {fieldState.error.message}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                                <Input
                                    label='Số người chơi (*)'
                                    type='text'
                                    name='updateNumberPlayer'
                                    value={court?.numberPlayer.toString() || "0"}
                                    control={control}
                                    rules={{
                                        required: "Vui lòng nhập số người chơi",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Vui lòng nhập số"
                                        }
                                    }}
                                />
                            </div>
                            <div className='grid sm:grid-cols-2 gap-10'>
                                <Input
                                    label='Giá tiền (*)'
                                    type='text'
                                    name='updatePrice'
                                    value={court?.courtPrice.toString()}
                                    control={control}
                                    rules={{
                                        required: "Vui lòng nhập giá tiền",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Vui lòng nhập số"
                                        }
                                    }}
                                />
                                <div>
                                    <Label htmlFor='isActive' value='Trạng thái (*)' />
                                    <Controller
                                        name='isActive'
                                        control={control}
                                        defaultValue={court?.isActive.toString()}
                                        rules={{ required: 'Vui lòng chọn trạng thái' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    className='focus:ring-transparent'
                                                    id="isActive"
                                                    color={
                                                        fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                                    }
                                                >
                                                    <option value=''>Chọn trạng thái</option>
                                                    <option value='false'>Đang bảo trì</option>
                                                    <option value='true'>Đang hoạt động</option>
                                                </Select>
                                                {fieldState.error && (
                                                    <div className="text-red-500 text-sm mt-2">
                                                        {fieldState.error.message}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="pt-4 border-t-2  flex justify-center gap-4">
                            <Button type='submit' size='md' color="info">
                                {isSubmitting ? <Spinner /> : "Cập nhật"}
                            </Button>
                            <Button size='md' color="gray" onClick={() => setOpenModalUpdate(false)}>
                                Không
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        </>
    )
}
