import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import { capitalize } from "@/utils/helpers";
import { FeedChannelSafePlacesProps } from "../../types";

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
