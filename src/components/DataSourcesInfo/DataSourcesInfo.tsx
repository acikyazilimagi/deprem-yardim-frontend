import styles from "./DataSourcesInfo.module.css";
import { Trans } from "next-i18next";
import CloseIcon from "@mui/icons-material/Close";

interface DataSourcesInfoProps {
  onClick: () => void;
  open: boolean;
}

export function DataSourcesInfo(props: DataSourcesInfoProps) {
  if (!props.open) return null;

  return (
    <footer className={styles.footer}>
      <Trans
        i18nKey="common:footer.banner"
        components={{
          b: <b />,
        }}
      />
      <div className={styles.closeButton}>
        <CloseIcon onClick={props.onClick} />
      </div>
    </footer>
  );
}
