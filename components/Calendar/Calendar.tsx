"use client"
import InputDate from '@components/InputDate/InputDate';
import { CustomFlowbiteTheme, Popover } from 'flowbite-react';
import React, { useState } from 'react';

const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
const hoursInDay = Array.from({ length: 24 }, (_, i) => `${i + 1}:00`);

// Example bookings data
const bookings = [
    {
        name: 'Nguyễn Thiên An',
        day: 27, // Ngày đặt sân
        startTime: '1:00',
        endTime: '2:00',
    },
    {
        name: 'Lê Văn B',
        day: 27,
        startTime: '1:00',
        endTime: '2:00',
    },
    { name: 'Trần Văn C', day: 28, startTime: '3:00', endTime: '4:00' },
    { name: 'Phạm Thị D', day: 29, startTime: '2:00', endTime: '3:00' },
    { name: 'Phạm Thị E', day: 29, startTime: '2:00', endTime: '3:00' },
    { name: 'Nguyễn Văn E', day: 30, startTime: '4:00', endTime: '5:00' },
    { name: 'Lê Thị F', day: 27, startTime: '5:00', endTime: '6:00' },
    { name: 'Trần Thị G', day: 26, startTime: '6:00', endTime: '7:00' },
    { name: 'Phạm Văn H', day: 31, startTime: '7:00', endTime: '8:00' },
    { name: 'Nguyễn Thị I', day: 29, startTime: '8:00', endTime: '9:00' },
    { name: 'Lê Văn J', day: 30, startTime: '9:00', endTime: '10:00' },
];
const colors = [
    'bg-teal-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-indigo-500',
    'bg-gray-500',
];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePrevWeek = () => {
        setCurrentDate(prevDate => {
            const prevWeek = new Date(prevDate);
            prevWeek.setDate(prevWeek.getDate() - 7);
            return prevWeek;
        });
    };

    const handleNextWeek = () => {
        setCurrentDate(prevDate => {
            const nextWeek = new Date(prevDate);
            nextWeek.setDate(nextWeek.getDate() + 7);
            return nextWeek;
        });
    };

    const handleDateChange = (event: any) => {
        setCurrentDate(new Date(event.target.value));
    };

    const getStartOfWeek = (date: Date) => {
        const startOfWeek = new Date(date);
        const dayOfWeek = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Monday start
        startOfWeek.setDate(diff);
        return startOfWeek;
    };

    const startOfWeek = getStartOfWeek(currentDate);

    const weekDaysWithDates = Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + index);
        return {
            date: date.getDate(),
            dayOfWeek: daysOfWeek[index],
        };
    });

    const customPopover: CustomFlowbiteTheme["popover"] = {
        "arrow": {
            "base": "absolute h-2 w-2 z-0 rotate-45 mix-blend-lighten bg-black border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:mix-blend-color",
            "placement": "-4px"
        }
    }

    const renderBookings = (day: number, hour: string) => {
        // Find all bookings that match the day and hour
        const filteredBookings = bookings.filter(
            b =>
                b.day === day &&
                b.startTime === hour
        );

        if (filteredBookings.length > 0) {
            return (
                <div className="border border-gray-200 p-2 flex flex-col space-y-1">
                    {filteredBookings.map((booking, index) => (
                        <Popover
                            key={index}
                            aria-labelledby="booking-popover"
                            trigger='hover'
                            placement='auto'
                            theme={customPopover}
                            content={
                                <div className="w-64 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex justify-between">
                                            <p className="font-semibold">Tên Sân:</p>
                                            <p>Sân bóng đá thiên ân</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-semibold">Môn thể thao:</p>
                                            <p>Bóng đá</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-semibold">Sân:</p>
                                            <p>Sân 1</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-semibold">Ngày đặt:</p>
                                            <p>23-10-2024</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            <div key={index} className={`text-white p-1 rounded-md hover:cursor-pointer ${getRandomColor()}`}>
                                {booking.name}
                            </div>
                        </Popover>
                    ))}
                </div>
            );
        }

        return <div className="border border-gray-200 p-2"></div>;
    };

    return (
        <div className="w-full mx-auto mt-10">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevWeek} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
                    Tuần trước
                </button>
                <div>
                    <InputDate name='date' multiple={false}  />
                </div>
                <button onClick={handleNextWeek} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
                    Tuần sau
                </button>
            </div>

            <div className="grid grid-cols-8 text-center font-bold">
                <div className="p-2 border border-gray-300 bg-gray-200">Time</div>
                {weekDaysWithDates.map((day, index) => (
                    <div key={index} className="p-2 border border-gray-300 bg-gray-200">
                        {day.date} {day.dayOfWeek}
                    </div>
                ))}
            </div>

            {hoursInDay.map((hour, hourIndex) => (
                <div key={hourIndex} className="grid grid-cols-8">
                    <div className="p-2 border border-gray-200 text-center">
                        {hour}
                    </div>
                    {weekDaysWithDates.map((day, dayIndex) => (
                        <React.Fragment key={`${hourIndex}-${dayIndex}`}>
                            {renderBookings(day.date, hour)}
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Calendar;
