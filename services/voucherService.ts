"use server"

import { fetchWrapper } from "@utils/fetchWrapper"

export async function createVoucher(data: FormData) {
    return await fetchWrapper.post("/api/voucher", {}, data)
}