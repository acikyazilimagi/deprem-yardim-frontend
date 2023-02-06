import RenderIf from "@/components/UI/Common/RenderIf";
import { useState } from "react";
import styles from "./FooterBanner.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function FooterBanner() {
  const [hideFooter, setHideFooter] = useState(false);

  return (
    <RenderIf condition={!hideFooter}>
      <span className={styles.footer}>
        <span>
          <b>Açıklama:</b> Twitter, Instagram, Whatsapp ve çeşitli web siteleri
          gibi farklı kaynaklardan gelen tüm yardım çağrılarını topluyoruz ve bu
          veriyi sahada kullanılmak üzere anlamlı, rafine hale getiriyoruz.
          Amacımız bilgi teknolojilerini kullanarak ilgili kurum ve
          STK&apos;lara yardımcı olmak ve afet zamanlarında açık bir veri
          platformu sağlamak.
        </span>
        <span>
          <HighlightOffIcon onClick={() => setHideFooter(true)} />
        </span>
      </span>
    </RenderIf>
  );
}
