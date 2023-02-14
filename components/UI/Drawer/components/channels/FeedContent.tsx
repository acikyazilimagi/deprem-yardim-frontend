import FeedChannelTwitter from "./twitter/FeedChannelTwitter";
import FeedChannelBabala from "./babala/FeedChannelBabala";
import FeedChannelGeneric from "./FeedChannelGeneric";
import { FeedChannelTeleteyit } from "./FeedChannelTeleteyit";
import { FeedChannelSatellite } from "./FeedChannelSatellite";
import { FeedChannelSahraKitchen } from "./FeedChannelSahraKitchen";
import { FeedChannelPharmacy } from "./FeedChannelPharmacy";
import {
  BaseFeedChannel,
  Channel,
  FeedChannelAhbapProps,
  FeedChannelBabalaProps,
  FeedChannelTwitterProps,
  FeedChannelTeleteyitProps,
  FeedChannelSatelliteProps,
  FeedChannelSahraKitchenProps,
} from "../types";
import { FeedChannelAhbap } from "./twitter/FeedChannelAhbap";

type Props = {
  content:
    | FeedChannelTwitterProps
    | FeedChannelBabalaProps
    | FeedChannelAhbapProps
    | FeedChannelTeleteyitProps
    | FeedChannelSatelliteProps
    | FeedChannelSahraKitchenProps;
};

const contentMapper = {
  generic: (source: BaseFeedChannel<any>) => <FeedChannelGeneric {...source} />,
  twitter: (source: FeedChannelTwitterProps) => (
    <FeedChannelTwitter {...source} />
  ),
  babala: (source: FeedChannelBabalaProps) => <FeedChannelBabala {...source} />,
  ahbap: (source: FeedChannelAhbapProps) => <FeedChannelAhbap {...source} />,
  teleteyit: (source: FeedChannelTeleteyitProps) => (
    // @ts-ignore
    <FeedChannelTeleteyit {...source} />
  ),
  uydu: (source: FeedChannelSatelliteProps) => (
    // @ts-ignore
    <FeedChannelSatellite {...source} />
  ),
  sahra_mutfak: (source: FeedChannelSatelliteProps) => (
    // @ts-ignore
    <FeedChannelSahraKitchen {...source} />
  ),
  eczane_excel: (source: FeedChannelSatelliteProps) => (
    // @ts-ignore
    <FeedChannelPharmacy {...source} />
  ),
};

const isChannelExist = (channel?: string) => {
  if (!channel) {
    return false;
  }

  return Object.keys(contentMapper).includes(channel.toLowerCase());
};

const FeedContent = ({ content }: Props) => {
  // Mevcutta bulunan channeldan farklı bir channel gelmesi durumunda "generic" channel'ı basılıyor
  const channel: Channel = isChannelExist(content.channel)
    ? (content.channel!.toLowerCase() as Channel)
    : "generic";

  // @ts-ignore: "content" parametresini tüm channel tipleriyle eşlemeye çalışıyor. Şimdilik ignore bırakıldı
  return <>{contentMapper[channel](content)}</>;
};

export default FeedContent;
