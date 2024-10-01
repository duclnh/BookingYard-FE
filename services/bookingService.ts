"use server"
import { fetchWrapper } from "@utils/index";

export async function getMyBooking(id: string | undefined, query: string) {
    return await fetchWrapper.get(`/api/booking/${id}${query}`);
}

export async function getBookingDetail(id: string | undefined) {
    return await fetchWrapper.get(`/api/booking/detail/${id}`);
}