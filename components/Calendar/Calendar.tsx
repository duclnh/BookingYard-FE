"use client"
import InputDate from '@components/InputDate/InputDate';
import { Button, CustomFlowbiteTheme, Popover } from 'flowbite-react';
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

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isDate, setIsDate] = useState(false);

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

    const handleDateChange = (date: Date) => {
        setCurrentDate(date);
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
    const getCurrentDateOfWeek = () => {
        const date = weekDaysWithDates.find(x => x.date == currentDate.getDate());
        return `${date?.date} ${date?.dayOfWeek}`
    }
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
                <div className={`border border-gray-200 p-2 ${isDate ? 'col-span-7 grid grid-cols-8 gap-5' : 'flex flex-col space-y-1'} `}>
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
                            <div key={index} className={`text-white p-1 rounded-md hover:cursor-pointer bg-slate-500`}>
                                <p>{` ${booking.startTime}-${booking.endTime}`}</p>
                                <p>{booking.name}</p>
                            </div>
                        </Popover>
                    ))}
                </div>
            );
        }

        return <div className={`border border-gray-200 p-2 ${isDate ? 'col-span-7':''}`}></div>;
    };

    return (
        <div className="w-full mx-auto mt-10">
            <div className="flex justify-between items-center mb-4">
                {!isDate && (
                    <Button color={"gray"} size={"xs"} onClick={handlePrevWeek} className="px-4 py-2 font-bold">
                        Tuần trước
                    </Button>
                )}
                <div>
                    <InputDate date={currentDate} handlerChange={handleDateChange} name='date' multiple={false} />
                </div>
                {isDate && (
                    <Button color={"gray"} size={"xs"} onClick={() => setIsDate(false)} className="px-4 py-2 font-bold">
                        Tháng
                    </Button>
                )}
                {!isDate && (
                    <div className='flex space-x-3'>
                        <Button color={"gray"} size={"xs"} onClick={() => setIsDate(true)} className="px-4 py-2 font-bold">
                            Ngày
                        </Button>
                        <Button color={"gray"} size={"xs"} onClick={handleNextWeek} className="px-4 py-2 font-bold">
                            Tuần sau
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-8 text-center font-bold">
                <div className="p-2 border border-gray-300">Thời gian</div>
                {!isDate && weekDaysWithDates.map((day, index) => (
                    <div key={index} className="p-2 border border-gray-300">
                        {day.date} {day.dayOfWeek}
                    </div>
                ))}
                {isDate && (
                    <div className="p-2 border col-span-7 border-gray-300">
                        {getCurrentDateOfWeek()}
                    </div>
                )}
            </div>

            {hoursInDay.map((hour, hourIndex) => (
                <div key={hourIndex} className="grid grid-cols-8">
                    <div className="p-2 border border-gray-200 text-center">
                        {hour}
                    </div>
                    {isDate && (
                        <React.Fragment key={`${hourIndex}`}>
                            {renderBookings(currentDate.getDate(), hour)}
                        </React.Fragment>
                    )}
                    {!isDate && weekDaysWithDates.map((day, dayIndex) => (
                        <React.Fragment key={`${hourIndex}-${dayIndex}`}>
                            {renderBookings(day.date, hour)}
                        </React.Fragment>
                    ))
                    }
                </div>
            ))}
        </div>
    );
};

export default Calendar;
