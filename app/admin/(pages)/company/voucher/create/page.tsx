"use client"
import { Heading, Input, InputImage } from '@components/index'
import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

export default function CreateStaff() {
  const { control, handleSubmit, formState: { isSubmitting, isValid }, getFieldState } = useForm({ mode: "onTouched", });
  const [error, setError] = useState<string | undefined>()

  return (
    <div className='py-5 w-full'>
      <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo mã giảm giá' center />
      <form method='POST' className='mt-20'>
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
            <InputImage
              label='Ảnh mã giảm giá (*)'
              getFieldState={getFieldState}
              name='image'
              control={control}
              rules={{
                required: "Vui lòng chọn ảnh mã giảm giá",
              }}
            />
          </div>
        </div>
        <Button className='mt-4' type='submit' size='sm'>Tạo mới</Button>
      </form>
    </div>
  )
}
