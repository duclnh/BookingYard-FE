"use server"
import { fetchWrapper } from "@utils/fetchWrapper";

export async function getUserUpdate(id: string) {
    return await fetchWrapper.get(`/api/user/${id}`)
}