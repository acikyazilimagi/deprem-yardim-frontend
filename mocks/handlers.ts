import { rest } from "msw";
import { Data } from "./types";

export const handlers = [
  // URL değişecek
  rest.get(
    "https://public-sdc.trendyol.com/discovery-web-websfxgeolocation-santral/geocode?address=gaziantep",
    (_req, res, ctx) => {
      return res(
        ctx.json<Data>({
          html_attributions: [],
          results: [
            {
              formatted_address: "Gaziantep, Türkiye",
              geometry: {
                location: {
                  lat: 37.065953,
                  lng: 37.37811,
                },
                viewport: {
                  northeast: {
                    lat: 37.108291,
                    lng: 37.4567749,
                  },
                  southwest: {
                    lat: 37.0092519,
                    lng: 37.303499,
                  },
                },
              },
              icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
              icon_background_color: "#7B9EB0",
              icon_mask_base_uri:
                "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
              name: "Gaziantep",
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
              place_id: "ChIJL4zx97TmMRUR0KprETWLLsA",
              reference: "ChIJL4zx97TmMRUR0KprETWLLsA",
              types: ["locality", "political"],
            },

            {
              formatted_address: "Gaziantep, Türkiye",
              geometry: {
                location: {
                  lat: 37.066053,
                  lng: 37.37821,
                },
                viewport: {
                  northeast: {
                    lat: 37.108291,
                    lng: 37.4567749,
                  },
                  southwest: {
                    lat: 37.0092519,
                    lng: 37.303499,
                  },
                },
              },
              icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
              icon_background_color: "#7B9EB0",
              icon_mask_base_uri:
                "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
              name: "Gaziantep",
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
              place_id: "ChIJL4zx97TmMRUR0KprETWLLsB",
              reference: "ChIJL4zx97TmMRUR0KprETWLLsB",
              types: ["locality", "political"],
            },
            {
              formatted_address: "Gaziantep, Türkiye",
              geometry: {
                location: {
                  lat: 37.085953,
                  lng: 37.39811,
                },
                viewport: {
                  northeast: {
                    lat: 37.108291,
                    lng: 37.4567749,
                  },
                  southwest: {
                    lat: 37.0092519,
                    lng: 37.303499,
                  },
                },
              },
              icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
              icon_background_color: "#7B9EB0",
              icon_mask_base_uri:
                "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
              name: "Gaziantep",
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
              place_id: "ChIJL4zx97TmMRUR0KprETWLLsC",
              reference: "ChIJL4zx97TmMRUR0KprETWLLsC",
              types: ["locality", "political"],
            },
          ],
          status: "OK",
        })
      );
    }
  ),
];
