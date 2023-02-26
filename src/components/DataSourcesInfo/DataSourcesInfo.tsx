import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styles from "./DataSourcesInfo.module.css";
import { Trans } from "next-i18next";

interface DataSourcesInfoProps {
  onClick: () => void;
  open: boolean;
}

export function DataSourcesInfo(props: DataSourcesInfoProps) {
  if (!props.open) return null;

  return (
    <footer className={styles.footer}>
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
    </footer>
  );
}
