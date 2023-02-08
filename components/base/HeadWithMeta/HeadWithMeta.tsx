import React from "react";
import { NextSeo } from "next-seo";

// TODO: const below should be replaced with single item service response
const ADDRESS = "Çekmece, samandağ bulvarı 164/a, 31070 Defne/Hatay, Türkiye";
const ENTRY =
  "@ahbap @Ahbap_iletisim ACİL !! Enkazdan kurtulan insanlar Çekmece Mahallesi'nde donuyor. Telefonlarının şarjı bitmek üzere. Hatay Defne İlçesi Çekmece Mahallesi 67. Sokak HECEMAR varmış etraflarında. Onlarca insan çorapsız ayaklarıyla montsuz, susuz, ekmeksiz, korumasız. Lütfen yardım gönderin lütfen!!";
const LOC = "37.5771529,36.9283658";

// TODO: OG_EDGE_URL should be replace with main API
const OG_EDGE_URL =
  "https://deprem-yardim-og-generator.vercel.app/api/dynamic-image";

const HeadWithMeta = () => {
  return (
    <NextSeo
      title={ADDRESS}
      description={ENTRY}
      openGraph={{
        // TODO: base path is missing in next.config static for now
        url: "https://afetharita.com/",
        title: ADDRESS,
        description: ENTRY,
        images: [
          {
            url: `${OG_EDGE_URL}?loc=${encodeURIComponent(
              LOC
            )}&address=${encodeURIComponent(
              ADDRESS
            )}&entry=${encodeURIComponent(ENTRY)}`,
            width: 1200,
            height: 630,
            alt: `${ADDRESS}`,
            type: "image/png",
          },
        ],
        siteName: "Afet Haritası",
      }}
      twitter={{
        handle: "@ihtiyacharitasi",
        cardType: "summary_large_image",
        site: "@ihtiyacharitasi",
      }}
      additionalMetaTags={[
        {
          name: "viewport",
          content: "initial-scale=1, width=device-width",
        },
      ]}
      additionalLinkTags={[
        {
          rel: "icon",
          href: "/favicon.ico",
        },
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
      ]}
    />
  );
};
export default HeadWithMeta;
