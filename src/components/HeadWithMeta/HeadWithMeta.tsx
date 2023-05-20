import { NextSeo } from "next-seo";
import {
  DESCRIPTION,
  OG_EDGE_URL_BASE,
  TITLE,
  SEO_LANG,
} from "./HeadWithMeta.constants";
import { OpenGraphMedia } from "next-seo/lib/types";

// TODO: OG_EDGE_URL should be replace with main API
export const HeadWithMeta = () => {
  const IMAGES: OpenGraphMedia[] = [
    {
      url: new URL(OG_EDGE_URL_BASE).href,
      width: 1200,
      height: 630,
      alt: `${TITLE}`,
      type: "image/png",
    },
  ];

  return (
    <NextSeo
      title={TITLE}
      description={DESCRIPTION}
      openGraph={{
        type: "website",
        url: "https://afetharita.com/",
        title: TITLE,
        description: DESCRIPTION,
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
      languageAlternates={[
        {
          hrefLang: SEO_LANG.HREFLANG_TR,
          href: SEO_LANG.HREF_TR,
        },
        {
          hrefLang: SEO_LANG.HREFLANG_EN,
          href: SEO_LANG.HREF_EN,
        },
      ]}
    />
  );
};
