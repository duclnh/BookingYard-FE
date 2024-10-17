"use server"
import { fetchWrapper } from "@utils/index";

export async function getBookings(query: string) {
    return await fetchWrapper.get(`/api/booking${query}`);
}

export async function getMyBooking(id: string | undefined, query: string) {
    return await fetchWrapper.get(`/api/booking/${id}${query}`);
}

export async function getBookingDetail(id: string | undefined) {
    return await fetchWrapper.get(`/api/booking/detail/${id}`);
}

export async function getBookingFacility(id: string | undefined, url: string) {
    console.log(`/api/booking/facility/${id}${url}`)
    return await fetchWrapper.get(`/api/booking/facility/${id}${url}`);
}

export async function createBooking(bookingDetails: {
    fullName: string;
    phone: string;
    email: string;
    courtID: number | undefined;
    courtPrice: number | undefined;
    totalPrice: number;
    userID: string | undefined;
    bookingDate: string | undefined;
    startTime: string | undefined;
    point: number;
    endTime: string | undefined;
    collectVoucherID: string | undefined;
    voucherID: string | undefined;
    paymentMethod: string;
}) {
    return await fetchWrapper.post('/api/booking', bookingDetails);
}

export async function payment(query: string) {
    return await fetchWrapper.get(`/api/vnpay/vnpay-return${query}`);
}


export async function cancelBooking(cancel: {
    bookingID?: string,
    reason: string,
    paymentCode?: string,
}) {
    return await fetchWrapper.post('/api/cancel-booking', cancel)
}

export async function getQrCode(id: string) {
    return await fetchWrapper.get(`/api/qrcode-booking/${id}`)
}