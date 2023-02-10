import React from "react";
import { NextSeo } from "next-seo";
import { DESCRIPTION, OG_EDGE_URL, TITLE } from "./HeadWithMeta.constants";
import { OpenGraphMedia } from "next-seo/lib/types";

interface IHeadWithMeta {
  singleItemDetail: any;
}

// TODO: OG_EDGE_URL should be replace with main API
const HeadWithMeta = (props: IHeadWithMeta) => {
  const validateAddress =
    props.singleItemDetail.formatted_address !== undefined;
  const validateEntry = props.singleItemDetail.full_text !== undefined;
  const validateLoc =
    props.singleItemDetail.lat !== undefined &&
    props.singleItemDetail.lng !== undefined;

  const isPropsValid = validateAddress && validateEntry && validateLoc;

  const ADDRESS = isPropsValid
    ? (props.singleItemDetail.formatted_address as string)
    : TITLE;
  const ENTRY = isPropsValid
    ? (props.singleItemDetail.full_text as string)
    : DESCRIPTION;
  const LOC = isPropsValid
    ? (`${props.singleItemDetail.lat},${props.singleItemDetail.lng}` as string)
    : "";
  const IMAGES: OpenGraphMedia[] | undefined = isPropsValid
    ? [
        {
          url: `${OG_EDGE_URL}?loc=${encodeURIComponent(
            LOC
          )}&address=${encodeURIComponent(ADDRESS)}&entry=${encodeURIComponent(
            ENTRY
          )}`,
          width: 1200,
          height: 630,
          alt: `${ADDRESS}`,
          type: "image/png",
        },
      ]
    : [
        {
          url: "icons/base-og-img.png",
          width: 1200,
          height: 630,
          alt: `${ADDRESS}`,
          type: "image/png",
        },
      ];

  return (
    <NextSeo
      title={ADDRESS}
      description={ENTRY}
      openGraph={{
        type: "website",
        url: `https://afetharita.com/`,
        title: ADDRESS,
        description: ENTRY,
        siteName: "Afet Haritası",
        images: IMAGES,
      }}
      twitter={{
        handle: "afetharita.com",
        cardType: "summary_large_image",
        site: "afetharita.com",
      }}
      additionalMetaTags={[
        {
          name: "viewport",
          content:
            "width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi",
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
