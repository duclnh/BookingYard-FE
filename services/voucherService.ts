"use server"

import { fetchWrapper } from "@utils/fetchWrapper"

export async function createVoucher(data: FormData) {
    return await fetchWrapper.post("/api/voucher", {}, data)
}

export async function getVoucherHome() {
    return await fetchWrapper.get("/api/voucher-home")
}

export async function getVoucherFacility(id: string | undefined, url: string) {
    return await fetchWrapper.get(`/api/voucher-facility/${id}${url}`)
}

export async function collectVoucher(userID: string | undefined, voucherID: string) {
    console.log(userID, voucherID)
    return await fetchWrapper.post("/api/collect-voucher", {
        userID,
        voucherID
    })
}
