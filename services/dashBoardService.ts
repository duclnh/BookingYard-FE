"use server"
import { fetchWrapper } from "@utils/index";

export async function getRevenue(url: string) {
    return await fetchWrapper.get(`/api/dashboard/revenue${url}`);
}
export async function getRevenueFacility(url: string) {
    return await fetchWrapper.get(`/api/dashboard/revenue/court-owner${url}`);
}