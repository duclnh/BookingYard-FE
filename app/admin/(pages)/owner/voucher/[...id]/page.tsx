"use client"
import { Heading, Input, InputImage } from '@components/index'
import { useAppSelector } from '@hooks/hooks';
import { createVoucher, getSportCreate } from '@services/index';
import { Button, Label, Select, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SportCreate } from 'types';

export default function CreateStaff({ params }: { params: { id: string } }) {
    const { control, handleSubmit, reset, formState: { isSubmitting, isValid } } = useForm({ mode: "onTouched", });
    const [error, setError] = useState<string | undefined>()
    const [image, setImage] = useState<File>()
    const [sports, setSports] = useState<SportCreate[]>([])
    const user = useAppSelector(state => state.manager.value)

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

    const handlerUpdateVoucher = async (data: FieldValues) => {
        try {
            var formData = new FormData();
            formData.append("VoucherID", params.id);
            formData.append("VoucherName", data.name);
            formData.append("Code", data.code);
            if (image) {
                formData.append("Image", image);
            }
            formData.append("Percentage", data.discount);
            formData.append("Quantity", data.quantity);
            formData.append("RegisterDate", data.start);
            formData.append("ExpiredDate", data.end);
            if (user?.facilityID) {
                formData.append("FacilityID", user?.facilityID);
            }
            formData.append("SportID", data.sport);

            var res = await createVoucher(formData)
            if (res.status === 201) {
                toast.success("Cập nhật mã giảm giá thành công")
                reset()
                setImage(undefined)
            } else if (res.status === 409) {
                toast.error("Mã code này đã có")
            } else {
                toast.error("Cập nhật mã giảm giá thất bại")
            }
        } catch (error) {
            toast.error("Lỗi hệ thống vui lòng thử lại")
        }
    }

    return (
        <div className='py-5 w-full'>
            <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Cập nhật giảm giá' center />
            <form method='POST' className='mt-20' onSubmit={handleSubmit(handlerUpdateVoucher)}>
                <div className='grid sm:grid-cols-2 gap-10'>
                    <div>
                        <Input
                            label='Tên mã giảm giá (*)'
                            type='text'
                            name='name'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập tên nhân viên",
                            }}
                        />
                        <div className='mt-3'>
                            <Input
                                label='Phần trăm giảm (*)'
                                type='number'
                                name='discount'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập phần trăm giảm",
                                }}
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
                                }}
                            />
                        </div>
                        <div className='mt-3'>
                            <Input
                                label='Ngày bắt đầu (*)'
                                type='date'
                                name='start'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập số lượng",
                                }}
                            />
                        </div>
                        <div className='mt-3'>
                            <Input
                                label='Ngày kết thúc (*)'
                                type='date'
                                name='end'
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ngày kết thúc",
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='mb-3'>
                            <Label htmlFor='package' value='Môn thể thao (*)' />
                            <Controller
                                name='sport'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Select
                                            {...field}
                                            className='focus:ring-transparent'
                                            id="package"
                                            color={
                                                fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                            }
                                        >
                                            <option value='0'>Tất cả</option>
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
                <Button disabled={isSubmitting} className='mt-4 w-28' type='submit' size='sm'>
                    {isSubmitting ? <Spinner /> : "Tạo mới"}
                </Button>
            </form>
        </div>
    )
}
