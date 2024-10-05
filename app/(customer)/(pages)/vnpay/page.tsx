"use client";
import { Loading } from '@components/index';
import { payment } from '@services/bookingService';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function VNPAY() {
    const router = useRouter();
    const urlParams = new URLSearchParams(window.location.search);
    useEffect(() => {
        payment(window.location.search)
            .then(x => {
                if (x.status === 200) {
                    return x.data
                } else {
                    toast.error("Thanh toán thất bại")
                    router.push(`/payment`)
                }
            })
            .then((bookingID: string) => {
                toast.success("Thanh toán thành công")
                router.push(`/booking-success/${bookingID}`)
            })
    }, [])

    return (
        <Loading />
    );
}
