import RenderIf from "@/components/UI/Common/RenderIf";
import useDisableZoom from "@/hooks/useDisableZoom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styles from "./FooterBanner.module.css";
import { Trans } from "next-i18next";
import {
  useIsFooterBannerOpen,
  useSetIsFooterBannerOpen,
} from "@/stores/commonStore";

export default function FooterBanner() {
  useDisableZoom();
  const setIsFooterBannerOpen = useSetIsFooterBannerOpen();
  const isOpen = useIsFooterBannerOpen();

  return (
    <footer className={styles.footer}>
      <RenderIf condition={isOpen}>
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
            <HighlightOffIcon onClick={() => setIsFooterBannerOpen(!isOpen)} />
          </span>
        </span>
      </RenderIf>
    </footer>
  );
}
