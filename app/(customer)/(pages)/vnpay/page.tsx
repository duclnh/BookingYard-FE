"use client";
import { Loading } from '@components/index';
import { cancelBooking, payment } from '@services/bookingService';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function VNPAY() {
    const router = useRouter();

    useEffect(() => {
        const handlePayment = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const response = await payment(window.location.search);

                if (response.status === 200) {
                    toast.success("Thanh toán thành công");
                    router.push(`/booking-success/${response.data}`);
                } else {
                    toast.error("Thanh toán thất bại");
                    console.log(urlParams.get("vnp_OrderInfo"))
                    const result = await cancelBooking({
                        paymentCode: urlParams.get("vnp_OrderInfo") || "",
                        reason: "Huỷ thanh toán"
                    });
                    if (result.status === 200) {
                        router.push(`/payment`);
                    }
                }
            } catch (error) {
                toast.error("Lỗi hệ thống");
            }
        };

        handlePayment();
    }, []);

    return (
        <Loading />
    );
}
