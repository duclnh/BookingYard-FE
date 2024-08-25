"use client"
import { Heading, Input, NewFeature } from '@components/index'
import { Button, Label, Select } from 'flowbite-react';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

export default function CreateStaff() {
  const { control, handleSubmit, formState: { isSubmitting, isValid }, setValue } = useForm({ mode: "onTouched", });
  const [error, setError] = useState<string | undefined>()

  return (
    <div className='py-5 w-full'>
      <Heading className='lg:px-20 mt-4 mb-24 text-4xl' title='Tạo nhân viên mới' center />
      <form method='POST' className='mt-20'>
        <div className='grid sm:grid-cols-2 gap-10'>
          <div>
            <Input
              label='Tên nhân viên (*)'
              type='text'
              name='name'
              control={control}
              rules={{
                required: "Vui lòng nhập tên nhân viên",
              }}
            />
            <div className='mt-3'>
              <Input
                label='Lương (*)'
                type='number'
                name='salary'
                control={control}
                rules={{
                  required: "Vui lòng nhập lương",
                }}
              />
            </div>
            <div className='mt-3'>
              <Label htmlFor='gender' value='Giới tính (*)' />
              <Controller
                name='gender'
                control={control}
                rules={{ required: 'Vui lòng chọn giới tính' }}
                render={({ field, fieldState }) => (
                  <>
                    <Select
                      {...field}
                      className='focus:ring-transparent'
                      id="gender"
                      color={
                        fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                      }
                    >
                      <option value=''>Giới tính</option>
                      <option value="France">Nam</option>
                      <option value="Germany">Nữ</option>
                      <option value="Germany">Khác</option>
                    </Select>
                    {fieldState.error && (
                      <div className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className='mt-3'>
              <Label htmlFor='role' value='Vai trò (*)' />
              <Controller
                name='role'
                control={control}
                rules={{ required: 'Vui lòng chọn vai trò' }}
                render={({ field, fieldState }) => (
                  <>
                    <Select
                      {...field}
                      className='focus:ring-transparent'
                      id="role"
                      color={
                        fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                      }
                    >
                      <option value=''>Vai trò</option>
                      <option value="France">Quản lý</option>
                      <option value="Germany">Nhân viên</option>
                    </Select>
                    {fieldState.error && (
                      <div className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div>
            <Input
              label='Email (*)'
              type='text'
              name='email'
              control={control}
              rules={{
                required: "Vui lòng nhập email",
              }}
            />
            <div className='mt-3'>
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
            <div className='mt-3'>
              <Label htmlFor='type' value='Hình thức (*)' />
              <Controller
                name='type'
                control={control}
                rules={{ required: 'Vui lòng chọn hình thức' }}
                render={({ field, fieldState }) => (
                  <>
                    <Select
                      {...field}
                      className='focus:ring-transparent'
                      id="type"
                      color={
                        fieldState.error ? 'failure' : fieldState.isDirty ? 'success' : ''
                      }
                    >
                      <option value=''>Hình thức</option>
                      <option value="France">Toàn thời gian</option>
                      <option value="Germany">Bán thời gian</option>
                      <option value="Germany">Thời vụ</option>
                    </Select>
                    {fieldState.error && (
                      <div className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <Button className='mt-4' type='submit' size='sm'>Tạo mới</Button>
      </form>
    </div>
  )
}
