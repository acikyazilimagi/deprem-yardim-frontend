import React from "react";
import { NextSeo } from "next-seo";
import { DESCRIPTION, OG_EDGE_URL, TITLE } from "./HeadWithMeta.constants";
import { OpenGraphMedia } from "next-seo/lib/types";
import { useRouter } from "next/router";

const constructObjectFromAsPath = (asPath: string) => {
  const clearHash = asPath.replace("/#", "");
  const splitFrom = clearHash.split("&");
  const constructObjectFromClearHash = splitFrom.map((value) => {
    const splitKeyAndValue = value.split("=");
    return {
      [`${splitKeyAndValue[0]}`]: decodeURIComponent(splitKeyAndValue[1]),
    };
  });
  const queries = Object.assign({}, ...constructObjectFromClearHash);
  return queries;
};

// TODO: OG_EDGE_URL should be replace with main API
const HeadWithMeta = () => {
  const { asPath } = useRouter();
  const queries = constructObjectFromAsPath(asPath);

  const validateAddress = queries.address !== undefined;
  const validateEntry = queries.entry !== undefined;
  const validateLoc = queries.loc !== undefined;

  const isPropsValid = validateAddress && validateEntry && validateLoc;

  const ADDRESS = isPropsValid ? (queries.address as string) : TITLE;
  const ENTRY = isPropsValid ? (queries.entry as string) : DESCRIPTION;
  const LOC = isPropsValid ? (queries.loc as string) : "";
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
    : undefined;

  return (
    <NextSeo
      title={ADDRESS}
      description={ENTRY}
      openGraph={{
        // TODO: base path is missing in next.config static for now
        url: `https://afetharita.com/${asPath}`,
        title: ADDRESS,
        description: ENTRY,
        images: IMAGES,
        siteName: "Afet Haritası",
      }}
      twitter={{
        handle: "afetharita.com",
        cardType: "summary_large_image",
        site: `https://afetharita.com/${asPath}`,
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
