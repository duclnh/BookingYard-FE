"use server"

import { fetchWrapper } from "@utils/fetchWrapper"

export async function createVoucher(data: FormData) {
    return await fetchWrapper.post("/api/voucher", {}, data)
}

export async function getVoucherHome() {
    return await fetchWrapper.get("/api/voucher-home")
}

export async function getVoucherFacility(id: string | undefined, query: string) {
    return await fetchWrapper.get(`/api/voucher-facility/${id}${query}`)
}

export async function getVoucherAdmin(query: string) {
    return await fetchWrapper.get(`/api/voucher${query}`)
}

export async function collectVoucher(userID: string | undefined, voucherID: string) {
    console.log(userID, voucherID)
    return await fetchWrapper.post("/api/collect-voucher", {
        userID,
        voucherID
    })
}

export async function getCollectVoucher(id: string | undefined, query: string) {
    return await fetchWrapper.get(`/api/collect-voucher/${id}${query}`)
}

export async function getVoucher(id: string | undefined) {
    return await fetchWrapper.get(`/api/voucher-code/${id}`)
}

export async function deleteVoucher(voucherID: string | undefined) {
    return await fetchWrapper.del("/api/voucher", {
        voucherID
    })
}