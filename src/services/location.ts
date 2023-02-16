import { locationsURL } from "@/utils/urls";
import { dataFetcher } from "./dataFetcher";
import { Data } from "@/types";

async function getLocationById(locationId: number) {
  if (!locationId) {
    return {};
  }

  const url = locationsURL(locationId);
  const data = await dataFetcher(url);
  return data as Data;
}

export { getLocationById };
