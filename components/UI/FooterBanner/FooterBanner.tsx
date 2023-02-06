import { useState } from "react";

import styles from "./FooterBanner.module.css";

const FooterBanner = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={styles.footer}>
      <>
        <span className={styles.showButton} onClick={() => setShow(!show)}>
          {show === false ? "Açıklama Göster" : "Gizle"}
        </span>
      </>

      {show === true ? (
        <div className={styles.bottom}>
          <b>Açıklama:</b> Twitter, Instagram, Whatsapp ve çeşitli web siteleri
          gibi farklı kaynaklardan gelen tüm yardım çağrılarını topluyoruz ve bu
          veriyi sahada kullanılmak üzere anlamlı, rafine hale getiriyoruz.
          Amacımız bilgi teknolojilerini kullanarak ilgili kurum ve
          STK&apos;lara yardımcı olmak ve afet zamanlarında açık bir veri
          platformu sağlamak.
        </div>
      ) : null}
    </div>
  );
};

export default FooterBanner;
