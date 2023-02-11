import useSnackbarHook from "@/components/base/Snackbar/useSnackbar";
import { CopyAll } from "@mui/icons-material";
import { Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useCallback, useState } from "react";
import { FeedChannelTwitterProps } from "../../types";
import EmbedTweet from "./EmbedTweet";
import styles from "./FeedChannelTwitter.module.css";
import PlaceholderTweet from "./PlaceholderTweet";

const FeedChannelTwitter = ({
  full_text,
  extra_parameters,
}: FeedChannelTwitterProps) => {
  const { t } = useTranslation("home");
  const [showSavedData, setShowSavedData] = useState(true);
  const { enqueueInfo } = useSnackbarHook();

  const handleClickCopyFullText = useCallback(() => {
    navigator.clipboard.writeText(full_text as string);
    enqueueInfo(t("cluster.copiedContentSuccessfully"));
  }, [full_text, t, enqueueInfo]);

  return (
    <div className={styles.sourceContent}>
      <div className={styles.sourceHelpContent}>
        <Typography className={styles.sourceContentTitle}>
          {t("content.helpContent")}
        </Typography>

        {extra_parameters && extra_parameters.name && (
          <div className={styles.sourceContentSwitch}>
            <p> {t("content.showData")}</p>
            <Switch
              checked={showSavedData}
              onChange={() => setShowSavedData((s) => !s)}
            />
          </div>
        )}
      </div>
      {showSavedData ? (
        <PlaceholderTweet source={extra_parameters!} full_text={full_text} />
      ) : (
        <EmbedTweet source={extra_parameters!} />
      )}
      {!!full_text && (
        <Button
          variant="outlined"
          size="small"
          fullWidth
          onClick={handleClickCopyFullText}
          startIcon={<CopyAll className={styles.btnIcon} />}
        >
          {t("cluster.copyFullText")}
        </Button>
      )}
    </div>
  );
};

export default FeedChannelTwitter;
