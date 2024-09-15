"use server"
import { fetchWrapper } from "@utils/fetchWrapper";

export async function createAdvise( name: string, email: string, phone: string, content: string) {
    return await fetchWrapper.post("/api/support/advise", {
        name,
        email,
        phone,
        content
    })
}

export async function createContact(name: string, phone: string, email: string, content: string) {
    return await fetchWrapper.post("/api/support/contact", {
        name,
        phone,
        email,
        content
    })
}

export async function getAllSupport(query: string) {
    return await fetchWrapper.get(`/api/support${query}`)
}

export async function getStatisticSupport() {
    return await fetchWrapper.get('/api/support/statistic')
}

export async function updateSupport(id: number | undefined, note: string | undefined){
     return await fetchWrapper.put('/api/support',{
        supportID: id,
        note
     })
}