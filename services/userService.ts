"use server"
import { fetchWrapper } from "@utils/fetchWrapper";

export async function getUserUpdate(id: string) {
    return await fetchWrapper.get(`/api/user-update/${id}`)
}
export async function getUser(id: string) {
    return await fetchWrapper.get(`/api/user/${id}`)
}