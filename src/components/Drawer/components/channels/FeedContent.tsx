import { FeedChannelGeneric } from "./FeedChannelGeneric";
import { DrawerData } from "@/stores/mapStore";

type Props = {
  content: DrawerData;
};

export const FeedContent = ({ content }: Props) => {
  if (!content) {
    return null;
  }

  return <FeedChannelGeneric {...content} />;
};
