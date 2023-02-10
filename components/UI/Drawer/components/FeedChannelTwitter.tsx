import PlaceholderTweet from "./PlaceholderTweet";

const FeedChannelTwitter = ({ source }: Props) => {
  return (
    <>
      <div className={styles.sourceHelpContent}>
        <Typography className={styles.sourceContentTitle}>
          Yardım İçeriği
        </Typography>
        {extraParameters.name && (
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
        <PlaceholderTweet source={extraParameters} />
      ) : (
        <EmbedTweet source={extraParameters} />
      )}
    </>
  );
};

export default FeedChannelTwitter;
