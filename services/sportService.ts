"use server"

import { fetchWrapper } from "@utils/index";

export async function GetSportCreate() {
    return await fetchWrapper.get("/api/sport-create");
  }