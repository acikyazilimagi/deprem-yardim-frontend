import { Raw } from "@/mocks/TypesAreasEndpoint";
import { Data } from "@/mocks/TypesAreasEndpoint";

type Props = {
  source: Raw;
  channel: Data["channel"];
  fullText: string;
};

const FeedChannelBabala = ({ source, channel, fullText }: Props) => {
  return <>Hello world</>;
};

export default FeedChannelBabala;
