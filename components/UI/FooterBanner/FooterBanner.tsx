import { Logo } from "@/components/UI/Button/Logo";
import RenderIf from "@/components/UI/Common/RenderIf";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect, useState } from "react";
import styles from "./FooterBanner.module.css";

export default function FooterBanner() {
  const [hideFooter, setHideFooter] = useState(true);

  const handleOffIconClick = () => {
    setHideFooter(true);
    localStorage.setItem("hideFooter", "true");
  };

  useEffect(() => {
    const localHideFooter = localStorage.getItem("hideFooter");
    if (!localHideFooter) {
      setHideFooter(false);
    }
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <Logo />
        <RenderIf condition={!hideFooter}>
          <span className={styles.dismissible}>
            <span>
              <HighlightOffIcon onClick={handleOffIconClick} />
            </span>
            <span>
              <b>Açıklama:</b> Twitter, Instagram, Whatsapp ve çeşitli web
              siteleri gibi farklı kaynaklardan gelen tüm yardım çağrılarını
              topluyoruz ve bu veriyi sahada kullanılmak üzere anlamlı, rafine
              hale getiriyoruz. Amacımız bilgi teknolojilerini kullanarak ilgili
              kurum ve STK&apos;lara yardımcı olmak ve afet zamanlarında açık
              bir veri platformu sağlamak.
            </span>
          </span>
        </RenderIf>
      </div>
    </footer>
  );
}
