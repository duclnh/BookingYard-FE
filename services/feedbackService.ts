"use server"

import { fetchWrapper } from "@utils/index";

export async function getFeedbackFacilityDetail(id: string, query: string) {
  return await fetchWrapper.get(`/api/feedback-facility/${id}${query}`);
}

export async function getFeedbackHome() {
  return await fetchWrapper.get('/api/feedback-home');
}

export async function getFeedbackFacility(id: string | undefined, query: string) {
  return await fetchWrapper.get(`/api/feedback-facility-owner/${id}${query}`);
}
