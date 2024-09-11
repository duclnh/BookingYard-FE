"use client"
import { Heading, Input, InputDate, InputImage, ModalView, NewFeature } from '@components/index'
import { Button, Label, Select } from 'flowbite-react';
import React, { useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { MdHealthAndSafety } from 'react-icons/md';
import { Convenience, Feature, FacilityTime, PeakHour } from 'types';
import { TiDelete } from 'react-icons/ti';
import Address from './address';
import { checkValidateTime, convertToStartTimeAndEndTime } from '@utils/timeOptions';
import toast from 'react-hot-toast';

const TextEditor = dynamic(() => import('@components/TextEditor/TextEditor'), {
    ssr: false,
});
const MapCustom = dynamic(() => import('@components/MapCustom/MapCustom'), {
    ssr: false,
});


export default function CreatePage() {
    const { control, handleSubmit, register, formState: { isSubmitting, isValid }, getFieldState, setValue, getValues, } = useForm({ mode: "onTouched", });
    const [modalMap, setModalMap] = useState(false);
    const [dates, setDates] = useState<Date[]>([])
    const [conveniences, setConveniences] = useState<Convenience[]>([
        {
            title: "payment",
            content: "Các phương thức thanh toán",
            icon: "MdPayments",
            feature: [
                { title: "Thẻ tín dụng (Visa, Master card)", isEnable: true },
                { title: "Momo", isEnable: true },
                { title: "Chuyển khoản", isEnable: true },
                { title: "Tiền mặt", isEnable: true },
            ],
        },
        {
            title: "entertainment",
            content: "Các dịch vụ giải trí",
            icon: "IoStorefrontSharp",
            feature: [
                { title: "Nhà hàng", isEnable: true },
                { title: "Quán nước", isEnable: true },
                { title: "Căn tin", isEnable: true },
                { title: "Karoke", isEnable: true },
                { title: "Cửa hàng tiện lợi", isEnable: true },
            ],
        },
        {
            title: "safe",
            content: "Các dịch vụ an toàn và chăm sóc",
            icon: "MdHealthAndSafety",
            feature: [
                { title: "Bảo vệ", isEnable: true },
                { title: "Nhà gửi xe", isEnable: true },
                { title: "Chăm sóc y tế", isEnable: true },
            ],
        },
    ]);
    const [facilityTimes, setFacilityTimes] = useState<FacilityTime[]>(
        [
            { value: "Monday", name: "Thứ 2", isChecked: false },
            { value: "Tuesday", name: "Thứ 3", isChecked: false },
            { value: "Wednesday", name: "Thứ 4", isChecked: false },
            { value: "Thursday", name: "Thứ 5", isChecked: false },
            { value: "Friday", name: "Thứ 6", isChecked: false },
            { value: "Saturday", name: "Thứ bảy", isChecked: false },
            { value: "Sunday", name: "Chủ nhật", isChecked: false }
        ]
    )
    const [imageOther, setImageOther] = useState<File[]>([])
    const [imageLogo, setImageLogo] = useState<File>()
    const [imageFacility, setImageFacility] = useState<File>()
    const handlerSetFeatures = (title: string, feature: Feature[]) => {
        const oldConveniences = [...conveniences]
        const foundItem = conveniences.find(x => x.title === title);
        if (foundItem) {
            foundItem.feature = feature;
        }
        setConveniences(oldConveniences);
        setValue("convenience", oldConveniences)
    }

    const [peakHours, setPeakHours] = useState<PeakHour[]>([])

    const handlerCheckFacilityTime = (value: string) => {
        const updatedFacilityTime = facilityTimes.map(item =>
            item.value === value ? { ...item, isChecked: !item.isChecked } : item
        );
        setFacilityTimes(updatedFacilityTime);
        setValue("facilitytime", facilityTimes.reduce((acc: string[], x: FacilityTime) => {
            if (x.isChecked && x.value) {
                acc.push(x.name);
            }
            return acc;
        }, []));
    }

    const handlerSetValuePosition = (position: [number, number]) => {
        setValue('location', position)
    }

    const handlerRemoveHoliday = (indexRemove: number) => {
        setDates(dates.filter((_, index) => index != indexRemove))
    }

    const handlerRemovePeakHour = (indexRemove: number) => {
        const updatePeakHour = peakHours.map((item, index) =>
            index === indexRemove ? { ...item, isChecked: !item.isChecked } : item
        )
        setPeakHours(updatePeakHour);
        setValue("peakhour", peakHours.map((x) => x.name));
    }

    const handlerChangePeakHour = (time: string, openTime: boolean) => {
        const { startTime, endTime } = openTime ? convertToStartTimeAndEndTime(time, getValues("close"))
            : convertToStartTimeAndEndTime(getValues("open"), time)

        const newPeakHour = []
        for (let i = startTime; i < endTime; i++) {
            newPeakHour.push({ name: `${i}:00`, isChecked: false })
        }
        setPeakHours(newPeakHour)
    }

    const handleDateChange = (dates: Date | Date[]) => {
        if (Array.isArray(dates)) {
            setDates(dates);
            setValue('holiday', dates)
        }
    };

    const handlerSubmitCreateFacility = (data: FieldValues) => {
        console.log(data)
        if (imageFacility) {
            toast.error("Vui lòng chọn ảnh cơ sở")
            return;
        }
    }

    return (
        <>
            <form method='POST' className='py-5 w-full' onSubmit={handleSubmit(handlerSubmitCreateFacility)}>
                <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo cơ sở mới' center />
                <div className='mt-10 grid md:grid-cols-2 gap-10'>
                    <div>
                        <div className='mb-3'>
                            <Input
                                label='Tên cơ sở (*)'
                                placeholder='Tên cơ sở '
                                type='text'
                                name='namefacility'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập tên cơ sở",
                                }}
                            />
                        </div>
                        <div>
                            <TextEditor
                                label='Mô tả cơ sở (*)'
                                name='description'
                                control={control}
                                className='min-h-40 max-h-64 overflow-y-auto z-10'
                                rules={{
                                    required: "Vui lòng nhập mô tả sân",
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='mb-3'>
                            <InputImage
                                label='Ảnh cơ sở (*)'
                                name='image'
                                value={imageFacility}
                                setFile={setImageFacility}
                                required="Vui lòng chọn ảnh cơ sở"
                            />
                        </div>
                        <div className='mb-3'>
                            <InputImage
                                label='Ảnh logo'
                                name='logo'
                                value={imageLogo}
                                setFile={setImageLogo}
                            />
                        </div>
                        <InputImage
                            label='Ảnh khác'
                            name='other'
                            value={imageOther}
                            setFile={setImageOther}
                            multiple
                        />
                    </div>
                </div>
                <div className='mt-10 grid sm:grid-cols-2 gap-10'>
                    <div>
                        <div className='mb-3'>
                            <Input
                                label='Email (*)'
                                placeholder='Email'
                                type='text'
                                name='email'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập email",
                                }}
                            />
                        </div>
                        <Input
                            label='Số điện thoại (*)'
                            placeholder='Số điện thoại'
                            type='text'
                            name='phone'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập số điện thoại",
                            }}
                        />
                    </div>
                    <div>
                        <div className='mb-3'>
                            <Label htmlFor='package' value='Gói sân (*)' />
                            <Controller
                                name='package'
                                control={control}
                                rules={{ required: 'Vui lòng chọn gói sân' }}
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
                                            <option value=''>Gói sân</option>
                                            <option value="Canada">Miễn phí</option>
                                            <option value="France">Tháng</option>
                                            <option value="Germany">Năm</option>
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
                            label='Họ và tên chủ sân (*)'
                            placeholder='Họ và tên chủ sân'
                            type='text'
                            name='name'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập số tiền cộng thêm ngày lễ",
                            }}
                        />
                    </div>
                </div>
                <div className='mt-3 grid sm:grid-cols-2 gap-10'>
                    <Input
                        label='Số tiền cộng thêm giờ cao điểm (*)'
                        placeholder='Số tiền cộng thêm giờ cao điểm'
                        type='text'
                        name='peakhourprice'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập số tiền cộng thêm giờ cao điểm",
                        }}
                    />
                    <Input
                        label='Số tiền giảm đăng kí tháng (*)'
                        placeholder='Số tiền giảm đăng kí tháng'
                        type='text'
                        name='monthprice'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập số tiền giảm đăng kí tháng",
                        }}
                    />
                </div>
                <div className='mt-3 grid sm:grid-cols-2 gap-10'>
                    <Input
                        label='Số tiền giảm đăng kí năm (*)'
                        placeholder='Số tiền giảm đăng kí năm'
                        type='text'
                        name='yearprice'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập số tiền giảm đăng kí năm",
                        }}
                    />
                    <Input
                        label='Số tiền cộng thêm ngày lễ (*)'
                        placeholder='Số tiền cộng thêm ngày lễ'
                        type='text'
                        name='holidayprice'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập số tiền cộng thêm ngày lễ",
                        }}
                    />
                </div>
                <Address control={control} setValue={setValue} />
                <div className='mt-3 grid sm:grid-cols-2'>
                    <div className='mb-3 sm:mr-5'>
                        <Label htmlFor='open' value='Thời gian mở cửa (*)' />
                        <Controller
                            name='open'
                            control={control}
                            rules={
                                {
                                    required: 'Vui lòng nhập thời gian mở cửa',
                                    validate: (value) => {
                                        if (checkValidateTime(value, getValues("close"))) {
                                            return "Thời gian mở cửa không lớn hơn thời gian đóng cửa"
                                        }
                                        return true;
                                    }
                                }
                            }
                            render={({ field, fieldState }) => (
                                <>
                                    <Select
                                        {...field}
                                        className='focus:ring-transparent'
                                        onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            handlerChangePeakHour(e.target.value || "", true)
                                            setValue("open", e.target.value)
                                        }}
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Chọn thời gian mở cửa</option>
                                        {[...Array(24)].map((_, index) => (
                                            <option key={index} value={`${index + 1}:00`}>{`${index + 1}:00`}</option>
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
                        <Label htmlFor='close' value='Thời gian đóng cửa (*)' />
                        <Controller
                            name='close'
                            control={control}
                            rules={{
                                required: 'Vui lòng chọn thời gian đóng cửa',
                                validate: (value) => {
                                    if (checkValidateTime(getValues("open"), value)) {
                                        return "Thời gian đóng cửa không bé hơn thời gian mở cửa"
                                    }
                                    return true;
                                }
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Select
                                        {...field}
                                        className='focus:ring-transparent'
                                        id="close"
                                        onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            handlerChangePeakHour(e.target.value || "", false)
                                            setValue("close", e.target.value)
                                        }}
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Chọn thời gian đóng cửa</option>
                                        {[...Array(24)].map((_, index) => (
                                            <option key={index} value={`${index + 1}:00`}>{`${index + 1}:00`}</option>
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
                    <div className='mr-5'>
                        <Label htmlFor='time' value='Số buổi trong tuần' />
                        <div className=' mt-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                            {facilityTimes.map((facilityTime: FacilityTime, index) => (
                                <div onClick={() => handlerCheckFacilityTime(facilityTime.value)} key={index} className={`border p-1 text-center rounded-lg hover:cursor-pointer hover:bg-black hover:text-white font-md ${facilityTime.isChecked && 'bg-black text-white'}`}>{facilityTime.name}</div>
                            ))}
                        </div>
                        <Input
                            type='hidden'
                            name='facilitytime'
                            control={control}
                            rules={{
                                required: "Vui lòng chọn thời gian cơ sở",
                            }}
                        />
                    </div>
                </div>
                <div className='mt-5'>
                    <div className='flex items-center'>
                        <Label className='mr-3' value='Ngày lễ' />
                        <InputDate date={dates} handlerChange={handleDateChange} name='date' multiple={true} />
                    </div>
                    <div className='mt-3 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-10'>
                        {dates.map((date: Date, index) => (
                            <div key={index} className='border w-20 leading-10 text-center rounded-md hover:cursor-pointer relative group'>
                                <p>{`${date.getDate()} - ${date.getMonth() + 1}`}</p>
                                <TiDelete size={20} onClick={() => handlerRemoveHoliday(index)} className='text-red-500 absolute -top-2.5 -right-2.5 hidden group-hover:block z-10' />
                            </div>
                        ))}
                    </div>
                </div>
                {peakHours.length > 0 && (
                    <div className='mt-5'>
                        <Label value='Giờ cao điểm' />
                        <div className='mt-3 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-10'>
                            {peakHours.map((peakhour: PeakHour, index) => (
                                <div onClick={() => handlerRemovePeakHour(index)} key={index} className={`border w-20 leading-10 text-center rounded-md hover:cursor-pointer hover:bg-black hover:text-white font-md ${peakhour.isChecked && 'bg-black text-white'}`}>
                                    {peakhour.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className='mt-5'>
                    <Label value='Các tiện ích' />
                    <div className='grid grid-cols-2 mt-5 gap-10  '>
                        {conveniences.map((convenience, index) => (
                            <div key={index}>
                                <div className='flex items-center'>
                                    <MdHealthAndSafety size={15} className='mr-2' />
                                    {convenience.content}
                                </div>
                                <div className='mt-3'>
                                    <NewFeature key={index} name={convenience.title} group features={convenience.feature} handlerSetFeature={handlerSetFeatures} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='my-10'>
                    <Label className='mb-2' htmlFor="file-upload" value="Chọn vị trí trên bản đồ (*)" />
                    {!modalMap && (
                        <MapCustom
                            placePosition={getValues("location")}
                            setPlacePosition={handlerSetValuePosition}
                            handlerExpand={setModalMap}
                            className='min-h-[600px] w-full !z-10'
                        />
                    )}
                    <Input
                        type='hidden'
                        name='location'
                        control={control}
                        rules={{
                            required: "Vui lòng chọn vị trí điểm trên bản đồ",
                        }}
                    />
                </div>
                <Button type='submit'>Tạo mới</Button>
            </form >
            {/*Start view Map */}
            <ModalView key={'View Map'} toggle={modalMap} setToggle={setModalMap} >
                <div className='rounded-lg bg-white shadow dark:bg-gray-700 items-center justify-center w-[100%] h-[100%]'>
                    {modalMap && (
                        <MapCustom
                            placePosition={getValues("location")}
                            setPlacePosition={handlerSetValuePosition}
                            handlerExpand={setModalMap}
                            className='w-full h-full !z-10'
                        />
                    )}
                </div>
            </ModalView>
            {/*End view Map */}
        </>
    )
}
