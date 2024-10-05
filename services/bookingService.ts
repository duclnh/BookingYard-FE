"use server"
import { fetchWrapper } from "@utils/index";

export async function getMyBooking(id: string | undefined, query: string) {
    return await fetchWrapper.get(`/api/booking/${id}${query}`);
}

export async function getBookingDetail(id: string | undefined) {
    return await fetchWrapper.get(`/api/booking/detail/${id}`);
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
    endTime: string | undefined;
    voucherID: string | undefined;
    paymentMethod: string;
}) {
    return await fetchWrapper.post('/api/booking', bookingDetails);
}
