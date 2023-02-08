import NextHead from "next/head";

const Head = () => {
  return (
    <NextHead>
      {/* <Partytown debug={true} forward={["dataLayer.push"]} /> */}
      <title>Afet Haritası | Anasayfa</title>
      <meta
        name="description"
        content="Twitter, Instagram, Whatsapp ve çeşitli web siteleri gibi farklı kaynaklardan gelen tüm yardım çağrılarını topluyoruz ve bu veriyi sahada kullanılmak üzere anlamlı, rafine hale getiriyoruz. Amacımız bilgi teknolojilerini kullanarak ilgili kurum ve STK'lara yardımcı olmak ve afet zamanlarında açık bir veri platformu sağlamak."
      />
      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://afetharita.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Afet Haritası | Anasayfa" />
      <meta
        property="og:description"
        content="Twitter, Instagram, Whatsapp ve çeşitli web siteleri gibi farklı kaynaklardan gelen tüm yardım çağrılarını topluyoruz ve bu veriyi sahada kullanılmak üzere anlamlı, rafine hale getiriyoruz. Amacımız bilgi teknolojilerini kullanarak ilgili kurum ve STK'lara yardımcı olmak ve afet zamanlarında açık bir veri platformu sağlamak. "
      />
      <meta property="og:image" content="" />
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="afetharita.com" />
      <meta property="twitter:url" content="https://afetharita.com/" />
      <meta name="twitter:title" content="Afet Haritası | Anasayfa" />
      <meta
        name="twitter:description"
        content="Twitter, Instagram, Whatsapp ve çeşitli web siteleri gibi farklı kaynaklardan gelen tüm yardım çağrılarını topluyoruz ve bu veriyi sahada kullanılmak üzere anlamlı, rafine hale getiriyoruz. Amacımız bilgi teknolojilerini kullanarak ilgili kurum ve STK'lara yardımcı olmak ve afet zamanlarında açık bir veri platformu sağlamak. "
      />
      <meta name="twitter:image" content="" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi"
      />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
