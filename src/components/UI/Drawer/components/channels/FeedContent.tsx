import FeedChannelTwitter from "./twitter/FeedChannelTwitter";
import FeedChannelBabala from "./babala/FeedChannelBabala";
import FeedChannelGeneric from "./FeedChannelGeneric";
import { FeedChannelTeleteyit } from "./FeedChannelTeleteyit";
import { FeedChannelSatellite } from "./FeedChannelSatellite";
import { FeedChannelSahra } from "./FeedChannelSahraKitchen";
import { FeedChannelPharmacy } from "./FeedChannelPharmacy";
import {
  Channel,
  FeedChannelAhbapProps,
  FeedChannelBabalaProps,
  FeedChannelTwitterProps,
  FeedChannelTeleteyitProps,
  FeedChannelSatelliteProps,
  FeedChannelSafePlacesProps,
  FeedChannelPharmacyProps,
  FeedChannelSahraProps,
  BaseFeedChannel,
} from "@/types";
import { FeedChannelAhbap } from "./twitter/FeedChannelAhbap";
import { FeedChannelSafePlaces } from "@/components/UI/Drawer/components/channels/FeedChannelSafePlaces";
import { DrawerData } from "@/stores/mapStore";

type Props = {
  content: DrawerData;
};

const contentMapper = {
  generic: (source: BaseFeedChannel<any>) => <FeedChannelGeneric {...source} />,
  twitter: (source: FeedChannelTwitterProps) => (
    <FeedChannelTwitter {...source} />
  ),
  babala: (source: FeedChannelBabalaProps) => <FeedChannelBabala {...source} />,
  ahbap: (source: FeedChannelAhbapProps) => <FeedChannelAhbap {...source} />,
  teleteyit: (source: FeedChannelTeleteyitProps) => (
    <FeedChannelTeleteyit {...source} />
  ),
  uydu: (source: FeedChannelSatelliteProps) => (
    <FeedChannelSatellite {...source} />
  ),
  sahra: (source: FeedChannelSahraProps) => <FeedChannelSahra {...source} />,
  eczane: (source: FeedChannelPharmacyProps) => (
    <FeedChannelPharmacy {...source} />
  ),
  guvenli: (source: FeedChannelSafePlacesProps) => (
    <FeedChannelSafePlaces {...source} />
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

  if (!content) {
    return null;
  }
  const channel = isChannelExist(content.channel)
    ? (content.channel!.toLowerCase() as Channel)
    : "generic";
  // @ts-ignore: "content" parametresini tüm channel tipleriyle eşlemeye çalışıyor. Şimdilik ignore bırakıldı
  return <>{contentMapper[channel](content)}</>;
};

export default FeedContent;
