import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  title: "Afet Haritası",
  description:
    "Twitter, Instagram, Whatsapp ve çeşitli web siteleri gibi farklı kaynaklardan gelen tüm yardım çağrılarını topluyoruz ve bu veriyi sahada kullanılmak üzere anlamlı, rafine hale getiriyoruz. Amacımız bilgi teknolojilerini kullanarak ilgili kurum ve STK'lara yardımcı olmak ve afet zamanlarında açık bir veri platformu sağlamak.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://afetharita.com/",
    site_name: "Afet Haritası",
    images: [
      {
        url: "https://afetharita.com/logo.svg",
        width: 1024,
        height: 1024,
        alt: "Afet Haritası",
      },
    ],
    siteName: "Afet Haritası",
  },
  twitter: {
    // handle: "@afetharita",
    // site: "@afetharita",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    // {
    //   rel: "apple-touch-icon",
    //   href: "/logo.svg",
    // },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
  additionalMetaTags: [
    {
      name: "keywords",
      content: "afet, harita, yardım, yardım çağrısı, afet haritası",
    },
    {
      name: "viewport",
      content: "initial-scale=1, width=device-width",
    },
    {
      name: "author",
      content: "Afet Haritası",
    },
    {
      name: "publisher",
      content: "Afet Haritası",
    },
  ],
};

export default config;
