import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import { capitalize } from "@/utils/helpers";

interface FeedChannelSatelliteProps {
  channel: string;
  properties: {
    damage: string;
  };
}

export const FeedChannelSatellite = (props: FeedChannelSatelliteProps) => {
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>
          {capitalize(props.properties.damage)}
        </DrawerContent.Title>
        <DrawerContent.Badge>{capitalize(props.channel)}</DrawerContent.Badge>
      </DrawerContent.Header>
    </DrawerContent>
  );
};
