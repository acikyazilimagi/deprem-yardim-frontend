import { Logo } from "@/components/UI/Button/Logo";
import RenderIf from "@/components/UI/Common/RenderIf";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
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
            <b>
              <FormattedMessage id="label.explanation" />
            </b>
            <FormattedMessage id="message.explanation" />
            <span className={styles.closeButton}>
              <HighlightOffIcon onClick={handleOffIconClick} />
            </span>
          </span>
        </RenderIf>
      </div>
    </footer>
  );
}
