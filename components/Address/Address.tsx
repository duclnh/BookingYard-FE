"use client"
import { Input } from '@components/index'
import { getDistrict, getFullAddress, getProvince, getWard } from '@services/addressService'
import { Label, Select } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Control, Controller, FieldValues, UseFormSetValue } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AddressVN } from 'types'

type Props = {
    control: Control<FieldValues, any>,
    setValue: UseFormSetValue<FieldValues>,
    valueWard?: number,
    address: string | undefined,
    fullAddress?: boolean,
    getValues?: Function,
}

export default function Address(props: Props) {
    const [provinces, setProvinces] = useState<AddressVN[] | undefined>(undefined)
    const [districts, setDistricts] = useState<AddressVN[] | undefined>(undefined)
    const [wards, setWards] = useState<AddressVN[] | undefined>(undefined)
    const [selectedProvince, setSelectedProvince] = useState("")
    const [selectedDistrict, setSelectedDistrict] = useState("")
    const [fullAddressWard, setFullAddressWard] = useState("");
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
        if (props.valueWard !== undefined && props.valueWard !== null) {
            let wardId = props.valueWard.toString()
            wardId = wardId.padStart(5, '0');
            getFullAddress(wardId)
                .then(x => {
                    if (x.status === 200) {
                        return x.data
                    } else {
                        toast.error("Lỗi lấy dữ liệu chi tiết phường")
                    }
                })
                .then((addressVN: AddressVN) => {
                    setSelectedProvince((prev) => prev = addressVN.tinh.toString());
                    props.setValue("province", addressVN.tinh.toString())
                    setSelectedDistrict((prev) => prev = addressVN.quan.toString())
                    props.setValue("district", addressVN.quan.toString())
                    props.setValue("ward", addressVN.phuong.toString())
                    setFullAddressWard(addressVN.full_name)
                    if (props.getValues && props.getValues("address")) {
                        if (props.fullAddress) {
                            props.setValue("fullAddress", `${props.getValues && props.getValues("address")}, ${addressVN.full_name}`)
                        }
                    }
                })
                .catch(() => toast.error("Lỗi lấy dữ liệu chi tiết"))

        }
    }, [])
    const handleChangeProvince = (event: any) => {
        if (event.target.value) {
            props.setValue("province", event.target.value)
            setSelectedProvince(event.target.value)
            props.setValue("fullAddress", '')
        } else {
            props.setValue("province", "")
            props.setValue("district", "")
            props.setValue("ward", "")
            if (props.fullAddress) {
                props.setValue("fullAddress", '')
            }
            setDistricts([])
            setWards([])
        }
    };
    const handleChangeDistrict = (event: any) => {
        if (event.target.value) {
            props.setValue("district", event.target.value)
            setSelectedDistrict(event.target.value)
            props.setValue("fullAddress", '')
        } else {
            props.setValue("district", "")
            props.setValue("ward", "")
            if (props.fullAddress) {
                props.setValue("fullAddress", '')
            }
            setWards([])
        }
    };
    const handleChangeWard = async (event: any) => {
        props.setValue("ward", event.target.value)
        var resAddress = await getFullAddress(event.target.value);
        if (resAddress.status == 200) {
            setFullAddressWard(resAddress.data.full_name)
            if (props.getValues && props.getValues("address")) {
                if (props.fullAddress) {
                    props.setValue("fullAddress", `${props.getValues && props.getValues("address")}, ${fullAddressWard}`)
                }
            }
        } else {
            toast.error("Lỗi lấy chi tiết địa chỉ")
        }
    };
    const handlerChangeAddress = () => {
        if (fullAddressWard && props.fullAddress && props.getValues) {
            props.setValue("fullAddress", `${props.getValues("address")}, ${fullAddressWard}`)
        }
    }
    useEffect(() => {
        props.setValue("district", "")
        props.setValue("ward", "")
        getDistrict(selectedProvince)
            .then(x => {
                if (x.status == 200) {
                    return x.data
                } else {
                    toast.error("Lỗi lấy dữ liệu quận / huyện")
                }
            })
            .then((wards: AddressVN[]) => {
                setDistricts(wards)
            })
            .catch(() => {
                toast.error("Lỗi lấy dữ liệu quận / huyện")
            });
    }, [selectedProvince])

    useEffect(() => {
        props.setValue("ward", "")
        getWard(selectedDistrict)
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

    }, [selectedDistrict])


    return (
        <div className='mt-3 grid sm:grid-cols-2'>
            <div className='mb-3 sm:mr-5'>
                <Label htmlFor='province' value='Tỉnh (*)' />
                <Controller
                    name='province'
                    control={props.control}
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
                                    <option key={province.id} value={province.id}>{province.name}</option>
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
                    control={props.control}
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
                                    <option key={district.id} value={district.id}>{district.name}</option>
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
                    control={props.control}
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
                                    <option key={wards.id} value={wards.id}>{wards.name}</option>
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
                    value={props.address}
                    onChange={handlerChangeAddress}
                    control={props.control}
                    rules={{
                        required: "Vui lòng nhập địa chỉ",
                    }}
                />
            </div>
        </div>
    )
}

