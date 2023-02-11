import { NextApiRequest, NextApiResponse } from "next";
import * as converter from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
import KMZ from "parse2-kmz";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // This value is considered fresh for ten seconds (s-maxage=300).
  // If a request is repeated within the next 300 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 599 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=599).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=599"
  );

  // fetch Ahbap locations from Google Maps
  const kml = (await KMZ.toKML(
    "https://www.google.com/maps/d/u/0/kml?mid=1aQ0TJi4q_46XAZiSLggkbTjPzLGkTzQ"
  )) as string;
  const parsedKML = new DOMParser().parseFromString(kml, "utf8");

  // convert our kml to geojson
  const geojson = converter.kml(parsedKML);

  res.status(200).json({ data: geojson.features });
}
