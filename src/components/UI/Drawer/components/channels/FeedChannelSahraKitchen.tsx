import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import { FeedChannelSahraProps } from "../../types";

export const FeedChannelSahra = (props: FeedChannelSahraProps) => {
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>{props.properties.name}</DrawerContent.Title>
        {/* No longer received from API */}
        {/* <DrawerContent.Badge>
          {props.properties.verified ? "Onaylandı" : "Onaylanmadı"}
        </DrawerContent.Badge> */}
      </DrawerContent.Header>
      <DrawerContent.Text>{props.properties.reason}</DrawerContent.Text>
    </DrawerContent>
  );
};
