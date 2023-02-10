import RenderIf from "@/components/UI/Common/RenderIf";
import useDisableZoom from "@/hooks/useDisableZoom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect, useState } from "react";
import styles from "./FooterBanner.module.css";
import { Trans } from "next-i18next";

export default function FooterBanner() {
  useDisableZoom();
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
        <RenderIf condition={!hideFooter}>
          <span className={styles.dismissible}>
            <span>
              <Trans
                i18nKey="common:footer.banner"
                components={{
                  b: <b />,
                }}
              />
            </span>
            <span className={styles.closeButton}>
              <HighlightOffIcon onClick={handleOffIconClick} />
            </span>
          </span>
        </RenderIf>
      </div>
    </footer>
  );
}
