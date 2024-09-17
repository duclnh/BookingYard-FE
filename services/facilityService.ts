"use server"
import { fetchWrapper } from "@utils/index";

export async function createFacility(formData: FormData) {
  return await fetchWrapper.post("/api/facility", formData,formData);
}
