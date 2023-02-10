import { useState } from "react";
import styles from "./FeedChannelTwitter.module.css";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import PlaceholderTweet from "./PlaceholderTweet";
import { FeedChannelTwitterProps } from "../../types";
import EmbedTweet from "./EmbedTweet";

const FeedChannelTwitter = ({
  full_text,
  extra_parameters,
}: FeedChannelTwitterProps) => {
  const [showSavedData, setShowSavedData] = useState(true);

  return (
    <div className={styles.sourceContent}>
      <div className={styles.sourceHelpContent}>
        <Typography className={styles.sourceContentTitle}>
          Yardım İçeriği
        </Typography>
        {extra_parameters && extra_parameters.name && (
          <div className={styles.sourceContentSwitch}>
            <p>Kayıtlı veriyi göster</p>
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
    </div>
  );
};

export default FeedChannelTwitter;
