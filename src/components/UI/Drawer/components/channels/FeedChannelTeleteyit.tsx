import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import { FeedChannelTeleteyitProps } from "@/types";
import { capitalize } from "@/utils/helpers";

export const FeedChannelTeleteyit = (props: FeedChannelTeleteyitProps) => {
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>{capitalize(props.channel)}</DrawerContent.Title>
        <DrawerContent.Badge>
          {capitalize(props.properties?.status || "")}
        </DrawerContent.Badge>
      </DrawerContent.Header>
      <DrawerContent.Body>
        <DrawerContent.Text>
          Açıklama: {capitalize(props.properties?.description || "")}
        </DrawerContent.Text>
        <DrawerContent.Text>
          İl: {capitalize(props.properties?.city || "")}
        </DrawerContent.Text>
        <DrawerContent.Text>
          İlçe: {capitalize(props.properties?.district || "")}
        </DrawerContent.Text>
      </DrawerContent.Body>
    </DrawerContent>
  );
};
