import React from 'react'
import { CardFeature } from '@components/index'
import { AiOutlineDollar } from 'react-icons/ai'
import { CgPerformance } from 'react-icons/cg'
import { FaHeadphones } from 'react-icons/fa'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { GrUpdate } from 'react-icons/gr'
import { HiViewGridAdd } from 'react-icons/hi'
import { PiCourtBasketballBold } from 'react-icons/pi'
import { TbHandClick } from 'react-icons/tb'

export default function Feature() {
    return (
        <div className='bg-[#eff1f7] py-14'>
            <div className='mx-20'>
                <div className='text-center mb-24'>
                    <div className='lg:text-6xl md:text-4xl text-3xl font-black'>
                        <p>Điểm Khác Biệt Phần Mềm</p>
                        <p className='mt-2'>Quản Lý Đặt Lịch Hẹn</p>
                        <p className='mt-2'>Sân Fieldy</p>
                    </div>
                    <div className='mt-3 font-medium lg:text-2xl'>Quản lý lịch hẹn tối ưu, thao tác đơn giản, dễ sử dụng</div>
                </div>
                <div className='mx-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16'>
                    <CardFeature
                        key={1}
                        bgColor='bg-[#4f86fb]'
                        icon={PiCourtBasketballBold}
                        title='Đặt sân online 24/7'
                        subtitle='Khách hàng dễ dàng đặt sân qua website hoặc ứng dụng di động tiện lợi'
                    />
                    <CardFeature
                        key={2}
                        bgColor='bg-[#75d893]'
                        icon={CgPerformance}
                        title='Tối ưu lịch hẹn'
                        subtitle='Quản lý thời gian đặt sân và sắp xếp lịch hẹn tự động giúp tối ưu lịch trống'
                    />
                    <CardFeature
                        key={3}
                        bgColor='bg-[#f540e3]'
                        icon={HiViewGridAdd}
                        title='Tương thích nhiều thiết bị'
                        subtitle='Hoạt động tốt trên điện thoại di động, laptop, PC, ...'
                    />
                    <CardFeature
                        key={4}
                        bgColor='bg-[#8c318e]'
                        icon={AiOutlineDollar}
                        title='Nâng cao doanh thu'
                        subtitle='Tăng lượt khách đặt sân, tiết kiệm chi phí vận hành cho chủ sân'
                    />
                    <CardFeature
                        key={5}
                        bgColor='bg-[#932902]'
                        icon={TbHandClick}
                        title='Đơn giản, dễ dàng sử dụng'
                        subtitle='Giao diện thân thiện, làm quen sau 5 phút'
                    />
                    <CardFeature
                        key={6}
                        bgColor='bg-[#2d5582]'
                        icon={FaMoneyBillTransfer}
                        title='Chi phí hợp lí'
                        subtitle='Chỉ từ 6.000 đồng/ngày để sở hữu ngay một phần mềm'
                    />
                    <CardFeature
                        key={7}
                        bgColor='bg-[#f94503]'
                        icon={GrUpdate}
                        title='Luôn cập nhật phiên bạn mới'
                        subtitle='Hỗ trợ nâng cấp phần mềm với các tính năng mới nhất'
                    />
                    <CardFeature
                        key={8}
                        bgColor='bg-[#4671cb]'
                        icon={FaHeadphones}
                        title='Triển khai, hỗ trợ nhanh chóng'
                        subtitle='Tư vấn, triển khai và hỗ trợ kỹ thuật nhanh chóng'
                    />
                </div>
            </div>
        </div>
    )
}
