"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { Label } from 'flowbite-react';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
});

export default function LineChart({ className, label }: { className: string, label?: string }) {
    const hoursOfDay = [];
    for (let i = 0; i < 24; i++) {
        hoursOfDay.push(`${i}:00`);
    }
    const daysOfWeek = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const years = [2020, 2021, 2022, 2023, 2024];
    const generateRandomData = (min: number, max: number, length: number) => {
        return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    };
    const data = {
        labels: daysOfWeek,
        datasets: [
            {
                label: 'Đặt lịch',
                data: generateRandomData(50000, 100000, hoursOfDay.length),
                fill: false,
                borderColor: '#ff6384',
                tension: 0.1,
            }
        ],  
    };
    return (
        <div className={className}>
            <div className='flex justify-between'>
                {label && (
                    <div className='flex'>
                        <div className='h-7 w-2 bg-teal-400 mr-2 rounded-sm'></div>
                        <Label className='text-lg mb-10' value={label} />
                    </div>
                )}
                <select className='h-9 text-xs rounded-md mr-7'>
                    <option>Ngày</option>
                    <option>Tuần</option>
                    <option>Tháng</option>
                    <option>Năm</option>
                </select>
            </div>
            <Line data={data} />
        </div>
    );
}