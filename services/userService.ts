"use server"
import { fetchWrapper } from "@utils/fetchWrapper";

export async function getUserUpdate(id: string) {
    return await fetchWrapper.get(`/api/user-update/${id}`)
}
export async function getUser(id: string) {
    return await fetchWrapper.get(`/api/user/${id}`)
}

export async function getAllUser(url: string) {
    return await fetchWrapper.get(`/api/user${url}`)
}


export async function getManager(id: string) {
    return await fetchWrapper.get(`/api/manager/${id}`)
}

export async function updateUser(data: FormData) {
    return await fetchWrapper.put('/api/user', {}, data)
}

export async function getHistoryScoreUser(id: string, query: string) {
    return await fetchWrapper.get(`/api/historypoint/${id}${query}`)
}