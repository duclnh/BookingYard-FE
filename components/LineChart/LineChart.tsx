"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { Label } from 'flowbite-react';
import React from 'react';
import { DailyRevenue, DayOfWeekRevenue, DetailsRevenue, HourlyRevenue, MonthlyRevenue } from 'types';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
});

export default function LineChart({ className, label, setChangeType, detailsRevenue }:
    { className: string, label?: string, setChangeType: Function, detailsRevenue: DetailsRevenue | undefined }) {
    type Days = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

    const daysOfWeek: Record<Days, string> = {
        Monday: "Thứ 2",
        Tuesday: "Thứ 3",
        Wednesday: "Thứ 4",
        Thursday: "Thứ 5",
        Friday: "Thứ 6",
        Saturday: "Thứ 7",
        Sunday: "Chủ nhật"
    };
    const generateLabelsData = () => {
        if (detailsRevenue !== undefined) {
            if (detailsRevenue.dailyDetails !== null) {
                return detailsRevenue.dailyDetails.map((dailyRevenue: DailyRevenue) => dailyRevenue.day.split('-').reverse().join('-'))
            } else if (detailsRevenue.dayOfWeekDetails !== null) {
                return detailsRevenue.dayOfWeekDetails.map((dateOfWeekRevenue: DayOfWeekRevenue) => daysOfWeek[dateOfWeekRevenue.day as Days])
            } else if (detailsRevenue.monthlyDetails) {
                return detailsRevenue.monthlyDetails.map((monthRevenue: MonthlyRevenue) => `Tháng ${monthRevenue.month}`)
            } else if (detailsRevenue.hourlyDetails) {
                return detailsRevenue.hourlyDetails.map((hourlyRevenue: HourlyRevenue) => hourlyRevenue.hour.split(':').slice(0, 2).join(':'));
            }
        }
    }
    const generateData = () => {
        if (detailsRevenue !== undefined) {
            if (detailsRevenue.dailyDetails !== null) {
                return detailsRevenue.dailyDetails.map((dailyRevenue: DailyRevenue) => dailyRevenue.amount)
            } else if (detailsRevenue.dayOfWeekDetails !== null) {
                return detailsRevenue.dayOfWeekDetails.map((dateOfWeekRevenue: DayOfWeekRevenue) => dateOfWeekRevenue.amount)
            } else if (detailsRevenue.monthlyDetails) {
                return detailsRevenue.monthlyDetails.map((monthRevenue: MonthlyRevenue) => monthRevenue.amount)
            } else if (detailsRevenue.hourlyDetails) {
                return detailsRevenue.hourlyDetails.map((hourlyRevenue: HourlyRevenue) => hourlyRevenue.amount);
            }
        }
    };
    const data = {
        labels: generateLabelsData(),
        datasets: [
            {
                label: 'Đặt lịch',
                data: generateData(),
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
                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setChangeType(e.target.value)} className='h-9 text-xs rounded-md mr-7'>
                    <option value="date" >Ngày</option>
                    <option value="week">Tuần</option>
                    <option value="month">Tháng</option>
                    <option value="year">Năm</option>
                </select>
            </div>
            <Line data={data} />
        </div>
    );
}