import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";

interface FeedChannelSahraKitchenProps {
  channel: string;
  properties: {
    name: string;
  };
  id: number;
  reason: string;
  verified: string;
}

export const FeedChannelSahraKitchen = (
  props: FeedChannelSahraKitchenProps
) => {
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>{props?.properties?.name}</DrawerContent.Title>
        <DrawerContent.Badge>
          {props?.verified ? "Onaylandı" : "Onaylanmadı"}
        </DrawerContent.Badge>
      </DrawerContent.Header>
      <DrawerContent.Text>{props?.reason}</DrawerContent.Text>
    </DrawerContent>
  );
};
