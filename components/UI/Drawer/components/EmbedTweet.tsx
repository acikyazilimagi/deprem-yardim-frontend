import { Raw } from "@/mocks/TypesAreasEndpoint";
import React, { useEffect, useState } from "react";

import TweetEmbed from "react-tweet-embed";
import PlaceholderTweet from "./PlaceholderTweet";

type Props = {
  source: Raw;
};

const EmbedTweet = ({ source }: Props) => {
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
      {isLoading && <PlaceholderTweet source={source} />}
      {isReadyForRender && (
        <TweetEmbed
          options={{ conversation: "none" }}
          tweetId={source.tweet_id}
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
