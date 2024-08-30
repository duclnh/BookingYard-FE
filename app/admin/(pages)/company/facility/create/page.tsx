"use client"
import { Heading, Input, InputDate, InputImage, ModalView, NewFeature } from '@components/index'
import { Button, Label, Select } from 'flowbite-react';
import React, { useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { MdHealthAndSafety, MdPayments } from 'react-icons/md';
import { Convenience, Feature } from 'types';
import { TiDelete } from 'react-icons/ti';

const TextEditor = dynamic(() => import('@components/TextEditor/TextEditor'), {
    ssr: false,
});
const MapCustom = dynamic(() => import('@components/MapCustom/MapCustom'), {
    ssr: false,
});


export default function CreatePage() {
    const { control, handleSubmit, formState: { isSubmitting, isValid }, getFieldState, setValue, getValues, } = useForm({ mode: "onTouched", });
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
    const handlerSetFeatures = (title: string, feature: Feature[]) => {
        const oldConveniences = [...conveniences]
        const foundItem = conveniences.find(x => x.title === title);
        if (foundItem) {
            foundItem.feature = feature;
        }
        setConveniences(oldConveniences);
    }


    const handlerSetValuePosition = (position: [number, number]) => {
        setValue('location', position)
    }

    const handlerRemoveHoliday = (indexRemove: number) => {
        setDates(dates.filter((_, index) => index != indexRemove))
    }
    const handleDateChange = (dates: Date | Date[]) => {
        if (Array.isArray(dates)) {
            setDates(dates); 
        } 
    };

    const handlerSubmitCreateFacility = (data: FieldValues) => {
        console.log(data)
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
                                type='text'
                                name='name'
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
                    <InputImage
                        label='Ảnh cơ sở hoặc logo (*)'
                        name='image'
                        getState={getFieldState}
                        control={control}
                        rules={{
                            required: "Vui lòng chọn ảnh cơ sở hoặc logo",
                        }}
                    />
                </div>
                <div className='mt-10 grid sm:grid-cols-2 gap-10'>
                    <div>
                        <div className='mb-3'>
                            <Input
                                label='Email (*)'
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
                            label='Số tiền cộng thêm ngày lễ (*)'
                            type='text'
                            name='phone'
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
                        type='text'
                        name='phone'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập số tiền cộng thêm giờ cao điểm",
                        }}
                    />
                    <Input
                        label='Số tiền giảm đăng kí tháng (*)'
                        type='text'
                        name='phone'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập số tiền giảm đăng kí tháng",
                        }}
                    />
                </div>
                <div className='mt-3 grid sm:grid-cols-2 gap-10'>
                    <Input
                        label='Số tiền giảm đăng kí năm (*)'
                        type='text'
                        name='phone'
                        control={control}
                        rules={{
                            required: "Vui lòng nhập số tiền giảm đăng kí năm",
                        }}
                    />
                </div>
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
                                        id="province"
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Tỉnh</option>
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
                                        id="district"
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Quận / Huyện</option>
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
                                        id="ward"
                                        color={
                                            fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                                        }
                                    >
                                        <option value=''>Phường / Xã</option>
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
                            type='text'
                            name='address'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập địa chỉ",
                            }}
                        />
                    </div>
                </div>
                <div className='mt-3 grid sm:grid-cols-2'>
                    <div className='mb-3 sm:mr-5'>
                        <Label htmlFor='open' value='Thời gian mở cửa (*)' />
                        <Controller
                            name='open'
                            control={control}
                            rules={{ required: 'Vui lòng nhập thời gian mở cửa' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Select
                                        {...field}
                                        className='focus:ring-transparent'
                                        id="open"
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
                            rules={{ required: 'Vui lòng chọn thời gian đóng cửa' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Select
                                        {...field}
                                        className='focus:ring-transparent'
                                        id="close"
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
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className='border p-1 text-center rounded-lg hover:cursor-pointer hover:bg-black hover:text-white font-md'>{`Thứ ${index + 2}`}</div>
                            ))}
                            <div className='border p-1 text-center rounded-lg hover:cursor-pointer font-md hover:bg-black hover:text-white'>Thứ bảy</div>
                            <div className='border p-1 text-center rounded-lg hover:cursor-pointer font-md hover:bg-black hover:text-white bg-black text-white'>Chủ nhật</div>
                        </div>
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
                <div className='mt-5'>
                    <Label value='Giờ cao điểm' />
                    <div className='mt-3 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-10'>
                        {[...Array(24)].map((_, index) => (
                            <div key={index} className='border w-20 leading-10 text-center rounded-xl hover:cursor-pointer'>
                                {`${index}:00`}
                            </div>
                        ))}
                    </div>
                </div>
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
