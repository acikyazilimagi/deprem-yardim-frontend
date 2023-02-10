import { Raw } from "@/mocks/TypesAreasEndpoint";
import { Data } from "@/mocks/TypesAreasEndpoint";
import FeedChannelTwitter from "./PlaceholderTweet";
import FeedChannelBabala from "./FeedChannelBabala";

type Props = {
  source: Raw;
  channel: Data["channel"];
  fullText: string;
};

const contentMapper = {
  twitter: (source: Raw) => <FeedChannelTwitter source={source} />,
  babala: (source: Raw) => (
    <FeedChannelBabala source={source} channel={channel} fullText={fullText} />
  ),
};

const FeedContent = ({ data }: Props) => {
  return <>{contentMapper[channel](data)}</>;
};

export default FeedContent;
