"use client"
import { Address, Input, InputTextArea } from '@components/index'
import { useAppSelector } from '@hooks/hooks'
import { updateUser } from '@services/userService'
import { getImage } from '@utils/index'
import { Button, Label, Radio, Select } from 'flowbite-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function Profile() {
  const { control, handleSubmit, formState: { isSubmitting, isValid }, setValue, getValues } = useForm({ mode: "onTouched", });
  const user = useAppSelector(state => state.manager.value);
  const [imageString, setImageString] = useState<string>('');
  const [file, setFile] = useState<File>()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files !== null && files[0]) {
      setImageString(URL.createObjectURL(files[0]))
      setFile(files[0])
    }
  }

  const handlerSubmitUpdate = async (data: FieldValues) => {
    try {
      const formData = new FormData();
      if (user?.id) {
        formData.set("UserId", user?.id)
      }
      formData.set("address", data.address)
      formData.set("gender", data.gender ?? user?.gender)
      formData.set("phone", data.phone)
      formData.set("wardID", data.ward)
      formData.set("name", data.name)
      if (file) {
        formData.set("image", file)
      }
      var res = await updateUser(formData)
      if (res.status === 200) {
        toast.success("Cập nhật thông tin thành công")
        window.location.reload()
      } else {
        toast.error("Cập nhật thông tin thất bại")
      }
    } catch {
      toast.error("Lỗi hệ thống vui lòng thử lại")
    }
  }
  const handlerChoseGender = (gender: string) => {
    setValue("gender", gender)
  }
  return (
    <div className='col-span-3 rounded-2xl border'>
      <div className='text-2xl font-bold border-b-2 px-5 py-3'>
        Thông tin cá nhân
      </div>
      <form method='POST' className='p-5' onSubmit={handleSubmit(handlerSubmitUpdate)}>
        <div>Tải ảnh hồ sơ của bạn lên <span className='text-red-700'>*</span></div>
        <div className='mt-3 flex items-center justify-between w-56'>
          <Image height={70} width={70} className='rounded-[50%] border h-20 w-20' src={imageString || getImage(user?.imageUrl) || '/assets/images/avatar-default.png'} alt="avatar" />
          <label className='inline-block bg-[#edecfb] text-blue-700 font-medium rounded-md p-1 px-3 hover:cursor-pointer' htmlFor="file">Thay đổi ảnh</label>
          <input onChange={handleFileChange} id='file' hidden type='file' />
        </div>
        <div className='mt-5 grid grid-cols-2'>
          <div className='mb-3 sm:mr-5'>
            <Input value={user?.name} label='Họ và tên (*)' name='name' type='text' control={control} />
          </div>
          <div className='sm:ml-5'>
            <Input readOnly value={user?.email} label='Email (*)' name='email' type='email' control={control} />
          </div>
          <div className='sm:mr-5'>
            <Input value={user?.phone} label='Số điện thoại (*)' name='phone' type='text' control={control} />
          </div>
          <div className='sm:ml-5'>
            <Label htmlFor="male" value="Giới tính (*)" />
            <div className='grid grid-cols-2 gap-2 lg:grid-cols-3 w-44 mt-3 lg:gap-5'>
              <div className="flex items-center gap-2">
                <Radio className='hover:cursor-pointer' onClick={() => handlerChoseGender("male")} id="male" name="gender" value="male" defaultChecked={user?.gender == "Male" ? true : false} />
                <Label className='hover:cursor-pointer' htmlFor="male">Nam</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio className='hover:cursor-pointer' onClick={() => handlerChoseGender("female")} id="female" name="gender" value="female" defaultChecked={user?.gender == "Female" ? true : false} />
                <Label className='hover:cursor-pointer' htmlFor="female">Nữ</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio className='hover:cursor-pointer' onClick={() => handlerChoseGender("other")} id="other" name="gender" value="other" defaultChecked={user?.gender == "Other" ? true : false} />
                <Label className='hover:cursor-pointer' htmlFor="other">Khác</Label>
              </div>
            </div>
          </div>
        </div>
        <Address address={user?.address} valueWard={user?.wardID} fullAddress getValues={getValues} control={control} setValue={setValue} />
        <div className='mt-3'>
          <InputTextArea
            label='Chi tiết địa chỉ'
            type='text'
            name='fullAddress'
            row={3}
            control={control}
            readOnly
          />
        </div>
        <Button size='sm' className='float-end px-4 leading-8 my-10 rounded-lg' type='submit'>Cập nhật</Button>
      </form>
    </div>
  )
}
