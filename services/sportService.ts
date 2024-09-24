"use server"

import { fetchWrapper } from "@utils/index";

export async function getSportCreate() {
    return await fetchWrapper.get("/api/sport-create");
  }