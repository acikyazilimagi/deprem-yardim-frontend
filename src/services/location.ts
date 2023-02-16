import { locationsURL } from "@/utils/urls";
import { dataFetcher } from "./dataFetcher";

async function getLocationById(locationId: number) {
  if (!locationId) {
    return {};
  }

  const url = locationsURL(locationId);
  const data = await dataFetcher(url);
  return data;
}

export { getLocationById };
