import React from "react";
import { NextSeo } from "next-seo";
import { DESCRIPTION, OG_EDGE_URL, TITLE } from "./HeadWithMeta.constants";
import { OpenGraphMedia } from "next-seo/lib/types";

// TODO: OG_EDGE_URL should be replace with main API
interface IHeadWithMeta {
  address?: string;
  entry?: string;
  loc?: string;
}

const HeadWithMeta = (props: IHeadWithMeta) => {
  const validateAddress = props.address !== undefined;
  const validateEntry = props.entry !== undefined;
  const validateLoc = props.loc !== undefined;

  const isPropsValid = validateAddress && validateEntry && validateLoc;

  const ADDRESS = isPropsValid ? (props.address as string) : TITLE;
  const ENTRY = isPropsValid ? (props.entry as string) : DESCRIPTION;
  const LOC = isPropsValid ? (props.loc as string) : "";
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
          alt: `${props.address}`,
          type: "image/png",
        },
      ]
    : undefined;

  return (
    <NextSeo
      title={props.address}
      description={props.entry}
      openGraph={{
        // TODO: base path is missing in next.config static for now
        url: "https://afetharita.com/",
        title: props.address,
        description: props.entry,
        images: IMAGES,
        siteName: "Afet Haritası",
      }}
      twitter={{
        handle: "afetharita.com",
        cardType: "summary_large_image",
        site: "https://afetharita.com/",
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
