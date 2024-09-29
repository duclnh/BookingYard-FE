"use client"
import { Heading, Input, InputImage } from '@components/index'
import { useAppSelector } from '@hooks/hooks';
import { createCourt, getSportCreate } from '@services/index';
import { Button, Label, Select, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SportCreate } from 'types';


export default function CreatePage() {
    const { control, handleSubmit, reset, formState: { isSubmitting, isValid } } = useForm({ mode: "onTouched", });
    const user = useAppSelector(state => state.manager.value);
    const [imageCourt, setImageCourt] = useState<File>()
    const [image360, setImage360] = useState<File>()
    const [sports, setSports] = useState<SportCreate[]>([])
    useEffect(() => {
        getSportCreate()
            .then(x => {
                if (x.status === 200) {
                    console.log(x.data)
                    return x.data
                } else {
                    toast.error("Lỗi lấy thông tin thể thao")
                }
            }).then((sport: SportCreate[]) => {
                setSports(sport)
            }).catch(() => toast.error("Lỗi hệ thống vui lòng thử lại sau"))
    }, [])
    const handlerSubmitCreateFacility = async (data: FieldValues) => {
        try {
            if (imageCourt === undefined) {
                toast.error("Vui lòng chọn ảnh sân")
                return;
            }
            if (image360 === undefined) {
                toast.error("Vui lòng chọn ảnh 360")
                return;
            }
            var formData = new FormData();
            formData.append("facilityID", user?.facilityID || '');
            formData.append("courtName", data.name)
            formData.append("image", imageCourt);
            formData.append("image360", image360);
            formData.append("numberPlayer", data.numberPlayer);
            formData.append("sportID", data.sport);
            formData.append("courtPrice", data.price);

            var res = await createCourt(formData)
            if (res.status === 201) {
                toast.success("Tạo mới sân thành công")
                reset()
                setImageCourt(undefined)
                setImage360(undefined)
            } else {
                toast.error("Tạo mới sân thất bại")
                console.log(res.data)
            }
        } catch (error) {
            toast.error("Lỗi hệ thống vui lòng thử lại")
        }
    }

    return (
        <>
            <form method='POST' className='py-5 w-full' onSubmit={handleSubmit(handlerSubmitCreateFacility)}>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo sân mới' center />
                <div className='mt-10 grid md:grid-cols-2 gap-10'>
                    <div>
                        <div className='mb-3'>
                            <Input
                                label='Tên sân (*)'
                                type='text'
                                name='name'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập tên sân",
                                }}
                            />
                        </div>
                        <div className='mb-3'>
                            <Label htmlFor='sport' value='Môn thể thao (*)' />
                            <Controller
                                name='sport'
                                control={control}
                                rules={{ required: 'Vui lòng nhập môn thể thao' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Select
                                            {...field}
                                            className='focus:ring-transparent'
                                            id="sport"
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
                        <div className='mb-3'>
                            <Input
                                label='Số người chơi (*)'
                                type='text'
                                name='numberPlayer'
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
                        <Input
                            label='Giá tiền (*)'
                            type='text'
                            name='price'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập giá tiền",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Vui lòng nhập số"
                                }
                            }}
                        />
                        <Button className='mt-5' type='submit'>
                            {isSubmitting ? <Spinner /> : "Tạo mới"}
                        </Button>
                    </div>
                    <div>
                        <InputImage
                            name='image'
                            label='Ảnh sân (*)'
                            value={imageCourt}
                            setFile={setImageCourt}
                            required="Vui chọn ảnh sân"
                        />
                        <InputImage
                            name='360'
                            label='Ảnh 360 sân (*)'
                            value={image360}
                            setFile={setImage360}
                            required="Vui chọn ảnh 360 sân"
                        />
                    </div>
                </div>
            </form >
        </>
    )
}
