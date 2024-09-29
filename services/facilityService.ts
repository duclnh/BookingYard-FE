"use server"
import { fetchWrapper } from "@utils/index";

export async function createFacility(formData: FormData) {
  return await fetchWrapper.post("/api/facility", formData, formData);
}

export async function getAllFacilityBooking(query: string) {
  return await fetchWrapper.get(`/api/facility-booking${query}`);
}
export async function getFacilityDetailBooking(id: string) {
  return await fetchWrapper.get(`/api/facility/${id}`);
}

export async function getFacilityHome() {
  return await fetchWrapper.get("/api/facility-home");
}
