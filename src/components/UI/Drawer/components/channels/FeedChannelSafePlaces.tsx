import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import { capitalize } from "@/utils/helpers";

interface FeedChannelSafePlacesProps {
  channel: string;
  properties: {
    reason: string;
    verified: string;
    name: string;
  };
  id: number;
}

export const FeedChannelSafePlaces = (props: FeedChannelSafePlacesProps) => {
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>Güvenli Bölgeler ve Oteller</DrawerContent.Title>
        <DrawerContent.Badge>
          {capitalize(props?.properties?.reason || "")}
        </DrawerContent.Badge>
      </DrawerContent.Header>
    </DrawerContent>
  );
};
