import { SalientFeature } from '@components/index'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
export default function Salient() {
    return (
        <div className='bg-[#efdfd1] pt-14 pb-7'>
            <div className='sm:mx-32 mx-10'>
                <div className='mb-20'>
                    <div className='lg:text-6xl md:text-4xl text-3xl font-black'>
                        Tính Năng Tiêu Biểu
                    </div>
                    <div className='my-3 font-medium lg:text-2xl'>
                        <p>Giải pháp số quản lý tối ưu lịch hẹn đặt sân tập,</p>
                        <p>sân bóng đá, sân cầu lông...</p>
                    </div>
                </div>
                <div className='xl:flex xl:flex-row-reverse xl:items-center'>
                    <img src="assets/images/salient.png" alt="partner" className="w-full h-full mb-16 md:mb-36" />
                    <div className='xl:w-[1700px] sm:grid sm:grid-cols-2 sm:gap-10'>
                        <SalientFeature
                            key={1}
                            title='Đặt thuê sân trực tuyến'
                            subtitle='Khách có thể đặt lịch thuê sân ngay cả khi đã ngoài giờ làm việc và nhận được xác nhận đặt lịch tự động nhanh chóng từ hệ thống.'
                            dotColor='bg-[#4f86fb]'
                        />
                        <SalientFeature
                            key={2}
                            title='Sắp xếp và quản lý sân'
                            subtitle='Thiết lập và theo dõi tình trạng sân như: sân trống, sân đã đặt, đang có khách, đang sửa chữa…'
                            dotColor='bg-[#75d893]'
                        />
                        <SalientFeature
                            key={3}
                            title='Quản lý lịch hẹn đặt sân'
                            subtitle='Quản lý thông tin lịch hẹn, thông tin khách hàng. Cho phép hẹn đặt lịch thuê sân cố định thời gian tùy theo yêu cầu.'
                            dotColor='bg-[#f540e3]'
                        />
                        <SalientFeature
                            key={4}
                            title='SMS, Email thông báo lịch đặt sân'
                            subtitle='Gửi tin nhắn xác nhận lịch đặt sân, nhắc lịch, hủy lịch, thay đổi thời gian đặt…'
                            dotColor='bg-[#8c318e]'
                        />
                        <SalientFeature
                            key={5}
                            title='Quản lý đa nền tảng'
                            subtitle='Dễ dàng sử dụng trên các nền tảng: mobile app, trình duyệt web cùng nhiều loại thiết bị khác nhau có kết nối Internet.'
                            dotColor='bg-[#932902]'
                        />
                        <SalientFeature
                            key={6}
                            title='Báo cáo - Thống kê'
                            subtitle='Theo dõi doanh thu và các thống kê về lịch đặt sân như: số lượng lịch đặt sân theo tuần/tháng/năm…'
                            dotColor='bg-[#2d5582]'
                        />
                        <a href='#trial' className='rounded-lg px-2 py-1 border border-black font-bold flex items-center justify-center'>
                            Đăng Kí Dùng Thử <FaArrowRightLong className='mx-2' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
