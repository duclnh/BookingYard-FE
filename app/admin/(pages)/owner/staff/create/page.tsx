"use client"
import { Heading, Input } from '@components/index'
import { Button, Label, Radio, Select } from 'flowbite-react';
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
              <Label htmlFor="male" value="Giới tính (*)" />
              <div className='grid grid-cols-2 gap-2 lg:grid-cols-3 w-44 mt-3 lg:gap-5'>
                <div className="flex items-center gap-2">
                  <Radio id="male" name="gender" value="male" defaultChecked />
                  <Label htmlFor="male">Nam</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="female" name="gender" value="female" />
                  <Label htmlFor="female">Nữ</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="other" name="gender" value="other" />
                  <Label htmlFor="other">Khác</Label>
                </div>
              </div>
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
                      <div className="text-red-500 text-sm mt-2">
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
                      <div className="text-red-500 text-sm mt-2">
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
