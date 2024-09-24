"use server"
import { fetchWrapper } from "@utils/index";

export async function createCourt(formData: FormData) {
    return await fetchWrapper.post("/api/court", {}, formData);
}

export async function updateCourt(formData: FormData) {
    return await fetchWrapper.put("/api/court", {}, formData);
}

export async function getAllCourts(id: string | undefined) {
    return await fetchWrapper.get(`/api/court-facility/${id}`);
}

export async function getCourtDetail(id: string | undefined) {
    return await fetchWrapper.get(`/api/court/${id}`);
}