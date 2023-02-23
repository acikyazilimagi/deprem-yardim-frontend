import { useSnackbarHook } from "@/components/Snackbar/useSnackbar";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { CopyAll } from "@mui/icons-material";
import { Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { FeedChannelTwitterProps } from "../../../types";
import { EmbedTweet } from "./EmbedTweet";
import styles from "./FeedChannelTwitter.module.css";
import { PlaceholderTweet } from "./PlaceholderTweet";

export const FeedChannelTwitter = ({ properties }: FeedChannelTwitterProps) => {
  const { t } = useTranslation("home");
  const [showSavedData, setShowSavedData] = useState(true);
  const { enqueueInfo } = useSnackbarHook();
  const { copyToClipBoard } = useCopyToClipboard();

  const handleClickCopyFullText = () => {
    copyToClipBoard(properties.full_text as string);
    enqueueInfo(t("cluster.copiedContentSuccessfully"));
  };

  return (
    <div className={styles.sourceContent}>
      <div className={styles.sourceHelpContent}>
        <Typography className={styles.sourceContentTitle}>
          {t("content.channels.twitter_relief")}
        </Typography>
        {properties?.name && (
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
        <PlaceholderTweet
          reason={properties.reason || ""}
          source={properties}
        />
      ) : (
        <EmbedTweet reason={properties.reason || ""} source={properties} />
      )}
      {!!properties.full_text && (
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
