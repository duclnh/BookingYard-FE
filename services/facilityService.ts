"use server"
import { fetchWrapper } from "@utils/index";

export async function createFacility(formData: FormData){
  console.log(JSON.stringify(formData))

  return await fetchWrapper.post("/api/facility", formData);
}
