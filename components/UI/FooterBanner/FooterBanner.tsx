import RenderIf from "@/components/UI/Common/RenderIf";
import useDisableZoom from "@/hooks/useDisableZoom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styles from "./FooterBanner.module.css";
import { Trans } from "next-i18next";

interface FooterBannerProps {
  onClick: () => void;
  open: boolean;
}

export default function FooterBanner(props: FooterBannerProps) {
  useDisableZoom();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <RenderIf condition={!props.open}>
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
              <HighlightOffIcon onClick={props.onClick} />
            </span>
          </span>
        </RenderIf>
      </div>
    </footer>
  );
}
