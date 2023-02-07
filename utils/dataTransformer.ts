import { LocationsResponseResult, MarkerData } from "@/mocks/types";
import { Data } from "@/mocks/TypesAreasEndpoint";

export default function dataTransformer(data: Data): MarkerData[] {
  return data.results.map((result) => {
    const id = result.id;
    const formatted_address = result?.formatted_address;
    const loc = result?.loc;
    const viewport = result?.viewport;
    const resolution = result?.resolution;
    const source = result?.raw;

    return {
      person: resolution?.name_surname || "",
      formatted_address: formatted_address || resolution?.address || "",
      geometry: {
        viewport,
        location: {
          lat: loc?.[0] || 0,
          lng: loc?.[1] || 0,
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: resolution?.city || "",
      photos: [
        {
          height: 4000,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/104554490980194591952"\u003ex\u003c/a\u003e',
          ],
          photo_reference:
            "AfLeUgM--hh4fswgowJMh2pqkQE8i2Ii38OKjYRtIcdeMYpjyirJExexXqLSEdzpoJP7EQUr-4pfW9J9E-8VXKdaYBUd8BBj0KBIyaSL3zdIjNFG2XSYQ8SwZGVkrlf3CNYrN89q1VgrHxftPyzXc1JwVtvJlnrhfIUyDzPN1Sh4nU0y_8ES",
          width: 3000,
        },
      ],
      place_id: id,
      reference: id,
      types: ["locality", "political"],
      source,
    };
  });
}
