import { useEffect, useState } from "react";

import TweetEmbed from "react-tweet-embed";
import PlaceholderTweet from "./PlaceholderTweet";
import { TwitterParameters } from "../../types";

type Props = {
  reason: string;
  source: TwitterParameters;
};

const EmbedTweet = ({ source, reason }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReadyForRender, setIsReadyForRender] = useState(false);

  // Propagate render to fix lag issue when showSavedData switch changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReadyForRender(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <PlaceholderTweet reason={reason} source={source} />}
      {isReadyForRender && (
        <TweetEmbed
          options={{ conversation: "none" }}
          tweetId={source?.tweet_id}
          placeholder={"Loading"}
          onTweetLoadSuccess={(element) => {
            setIsLoading(element === undefined);
          }}
          onTweetLoadError={(error) => console.error("Error", error)}
        />
      )}
    </>
  );
};

export default EmbedTweet;
