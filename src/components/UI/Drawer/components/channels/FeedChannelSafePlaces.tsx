import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import { FeedChannelSafePlacesProps } from "@/types";
import { capitalize } from "@/utils/helpers";

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
