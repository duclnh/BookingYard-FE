"use client"
import { Heading, Input } from '@components/index'
import { Label, Select } from 'flowbite-react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

export default function Create() {
  const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({ mode: "onTouched", });
  return (
    <div className='py-5 w-full'>
      <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo đặt lịch mới' center />
      <div className='grid sm:grid-cols-2 sm:gap-10 gap-3'>
        <Input
          label='Tên khách hàng (*)'
          type='text'
          name='name'
          control={control}
          rules={{
            required: "Vui lòng nhập tên khách hàng",
          }}
        />
        <Input
          label='Email'
          type='text'
          name='email'
          control={control}
        />
      </div>
      <div className='mt-3 grid sm:grid-cols-2 sm:gap-10 gap-3'>
        <div>
          <Label htmlFor='package' value='Môn thể thao (*)' />
          <Controller
            name='sport'
            control={control}
            rules={{ required: 'Vui lòng chọn môn thể thao' }}
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
                  <option value='soccer'>Bóng đá</option>
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
          label='Số điện thoại'
          type='text'
          name='phone'
          control={control}
        />
      </div>
    </div>
  )
}
