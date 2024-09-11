"use client"
import { Input } from '@components/index'
import { getDistrict, getProvince, getWard } from '@services/addressService'
import { Label, Select } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Control, Controller, FieldValues, UseFormSetValue } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AddressVN } from 'types'

export default function Address({ control, setValue }: { control: Control<FieldValues, any>, setValue: UseFormSetValue<FieldValues> }) {
    const [provinces, setProvinces] = useState<AddressVN[] | undefined>(undefined)
    const [districts, setDistricts] = useState<AddressVN[] | undefined>(undefined)
    const [wards, setWards] = useState<AddressVN[] | undefined>(undefined)
    const [selectedProvince, setSelectedProvince] = useState("")
    const [selectedDistrict, setSelectedDistrict] = useState("")

    useEffect(() => {
        getProvince()
            .then(x => {
                if (x.status == 200) {
                    return x.data
                } else {
                    toast.error("Lỗi lấy dữ liệu tỉnh thành")
                }
            })
            .then((province: AddressVN[]) => {
                setProvinces(province)
            })
            .catch(() => {
                toast.error("Lỗi lấy dữ liệu tỉnh thành")
            })
    }, [])
    const handleChangeProvince = (event: any) => {
        if (event.target.value) {
            setValue("province", event.target.value)
            setSelectedProvince(event.target.value)
        } else {
            setValue("province", "")
            setValue("district", "")
            setValue("ward", "")
            setDistricts([])
            setWards([])
        }
    };
    const handleChangeDistrict = (event: any) => {
        if (event.target.value) {
            setValue("district", event.target.value)
            setSelectedDistrict(event.target.value)
        }else{
            setValue("district", "")
            setValue("ward", "")
            setWards([])
        }
    };
    const handleChangeWard = (event: any) => {
        setValue("ward", event.target.value)
    };
    useEffect(() => {
        setValue("district", "")
        setValue("ward", "")
        const selectProvince = provinces && provinces.find(
            (district) => district.full_name === selectedProvince
        );

        if (selectProvince) {
            getDistrict(selectProvince.id)
                .then(x => {
                    if (x.status == 200) {
                        return x.data
                    } else {
                        toast.error("Lỗi lấy dữ liệu xã / phường")
                    }
                })
                .then((wards: AddressVN[]) => {
                    setDistricts(wards)
                })
                .catch(() => {
                    toast.error("Lỗi lấy dữ liệu xã / phường")
                });
        }
    }, [selectedProvince])

    useEffect(() => {
        setValue("ward", "")
        const selectDistrict = districts && districts.find(
            (district) => district.full_name === selectedDistrict
        );

        if (selectDistrict) {
            getWard(selectDistrict.id)
                .then(x => {
                    if (x.status == 200) {
                        return x.data
                    } else {
                        toast.error("Lỗi lấy dữ liệu xã / phường")
                    }
                })
                .then((wards: AddressVN[]) => {
                    setWards(wards)
                })
                .catch(() => {
                    toast.error("Lỗi lấy dữ liệu xã / phường")
                })
        }

    }, [selectedDistrict])


    return (
        <div className='mt-3 grid sm:grid-cols-2'>
            <div className='mb-3 sm:mr-5'>
                <Label htmlFor='province' value='Tỉnh (*)' />
                <Controller
                    name='province'
                    control={control}
                    rules={{ required: 'Vui lòng chọn tỉnh' }}
                    render={({ field, fieldState }) => (
                        <>
                            <Select
                                {...field}
                                className='focus:ring-transparent'
                                onInput={handleChangeProvince}
                                id="province"
                                color={
                                    fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                }
                            >
                                <option value=''>Tỉnh</option>
                                {provinces?.map((province: AddressVN) => (
                                    <option key={province.id} value={province.full_name}>{province.name}</option>
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
            <div className='mb-3 sm:ml-5'>
                <Label htmlFor='province' value='Quận / Huyện (*)' />
                <Controller
                    name='district'
                    control={control}
                    rules={{ required: 'Vui lòng chọn Quận / Huyện ' }}
                    render={({ field, fieldState }) => (
                        <>
                            <Select
                                {...field}
                                className='focus:ring-transparent'
                                onInput={handleChangeDistrict}
                                id="district"
                                color={
                                    fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                }
                            >
                                <option value=''>Quận / Huyện</option>
                                {districts?.map((district: AddressVN) => (
                                    <option key={district.id} value={district.full_name}>{district.name}</option>
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
            <div className='sm:mr-5'>
                <Label htmlFor='province' value='Phường / Xã (*)' />
                <Controller
                    name='ward'
                    control={control}
                    rules={{ required: 'Vui lòng chọn Phường / Xã ' }}
                    render={({ field, fieldState }) => (
                        <>
                            <Select
                                {...field}
                                className='focus:ring-transparent'
                                onInput={handleChangeWard}
                                id="ward"
                                color={
                                    fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                }
                            >
                                <option value=''>Phường / Xã</option>
                                {wards?.map((wards: AddressVN) => (
                                    <option key={wards.id} value={wards.full_name}>{wards.name}</option>
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
            <div className='sm:ml-5'>
                <Input
                    label='Địa chỉ (*)'
                    placeholder='Địa chỉ'
                    type='text'
                    name='address'
                    control={control}
                    rules={{
                        required: "Vui lòng nhập địa chỉ",
                    }}
                />
            </div>
        </div>
    )
}

