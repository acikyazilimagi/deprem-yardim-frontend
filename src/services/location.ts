import { locationsURL } from "@/utils/urls";
import { dataFetcher } from "./dataFetcher";
import { APIResponse } from "@/types";

async function getLocationById(locationId: number) {
  if (!locationId) {
    return null;
  }

  const url = locationsURL(locationId);
  const data = await dataFetcher(url);
  return data as APIResponse;
}

export { getLocationById };
