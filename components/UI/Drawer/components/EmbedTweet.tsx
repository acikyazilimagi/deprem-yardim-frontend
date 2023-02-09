import { Raw } from "@/mocks/TypesAreasEndpoint";
import React, { useState } from "react";

import TweetEmbed from "react-tweet-embed";
import PlaceholderTweet from "./PlaceholderTweet";

type Props = {
  source: Raw;
};

const EmbedTweet = ({ source }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <PlaceholderTweet source={source} />}
      <TweetEmbed
        options={{ conversation: "none" }}
        tweetId={source.tweet_id}
        placeholder={"Loading"}
        onTweetLoadSuccess={(element) => {
          setIsLoading(element === undefined);
        }}
        onTweetLoadError={(error) => console.log("Error", error)}
      />
    </>
  );
};

export default EmbedTweet;
