import FeedChannelTwitter from "./twitter/FeedChannelTwitter";
import FeedChannelBabala from "./babala/FeedChannelBabala";
import FeedChannelGeneric from "./FeedChannelGeneric";
import { FeedChannelTeleteyit } from "./FeedChannelTeleteyit";
import {
  BaseFeedChannel,
  Channel,
  FeedChannelAhbapProps,
  FeedChannelBabalaProps,
  FeedChannelTwitterProps,
  FeedChannelTeleteyitProps,
} from "../types";
import { FeedChannelAhbap } from "./twitter/FeedChannelAhbap";

type Props = {
  content:
    | FeedChannelTwitterProps
    | FeedChannelBabalaProps
    | FeedChannelAhbapProps
    | FeedChannelTeleteyitProps;
};

const contentMapper = {
  generic: (source: BaseFeedChannel<any>) => <FeedChannelGeneric {...source} />,
  twitter: (source: FeedChannelTwitterProps) => (
    <FeedChannelTwitter {...source} />
  ),
  Babala: (source: FeedChannelBabalaProps) => <FeedChannelBabala {...source} />,
  ahbap: (source: FeedChannelAhbapProps) => <FeedChannelAhbap {...source} />,
  teleteyit: (source: FeedChannelTeleteyitProps) => (
    // @ts-ignore
    <FeedChannelTeleteyit {...source} />
  ),
};

const isChannelExist = (channel?: string) => {
  if (!channel) {
    return false;
  }

  return Object.keys(contentMapper).includes(channel);
};

const FeedContent = ({ content }: Props) => {
  // Mevcutta bulunan channeldan farklı bir channel gelmesi durumunda "generic" channel'ı basılıyor
  const channel: Channel = isChannelExist(content.channel)
    ? content.channel!
    : "generic";

  // @ts-ignore: "content" parametresini tüm channel tipleriyle eşlemeye çalışıyor. Şimdilik ignore bırakıldı
  return <>{contentMapper[channel](content)}</>;
};

export default FeedContent;
