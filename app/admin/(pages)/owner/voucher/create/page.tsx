"use client"
import { Heading, Input, InputImage } from '@components/index'
import { useAppSelector } from '@hooks/hooks';
import { createVoucher, getSportCreate } from '@services/index';
import { Button, Label, Select, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SportCreate } from 'types';

export default function CreateVoucher() {
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

  const handlerCreateVoucher = async (data: FieldValues) => {
    try {
      var formData = new FormData();
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

      if (data.sport) {
        formData.append("SportID", data.sport);
      }

      var res = await createVoucher(formData)
      if (res.status === 201) {
        toast.success("Tạo mới mã giảm giá thành công")
        window.location.href = "/admin/owner/voucher"
      } else if (res.status === 409) {
        toast.error("Mã code này đã có")
      } else {
        toast.error("Tạo mới mã giảm giá thất bại")
      }
    } catch (error) {
      toast.error("Lỗi hệ thống vui lòng thử lại")
    }
  }

  return (
    <div className='py-5 w-full'>
      <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo mã giảm giá' center />
      <form method='POST' className='mt-20' onSubmit={handleSubmit(handlerCreateVoucher)}>
        <div className='grid sm:grid-cols-2 gap-10'>
          <div>
            <Input
              label='Tên mã giảm giá (*)'
              type='text'
              name='name'
              control={control}
              rules={{
                required: "Vui lòng nhập tên giảm giá",
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
                  min: {
                    value: 1,
                    message: "Vui lòng nhập số lượng tối thiểu 1"
                  },
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
                      <option value=''>Tất cả</option>
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
