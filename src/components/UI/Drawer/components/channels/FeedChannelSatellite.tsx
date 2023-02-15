import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import { capitalize } from "@/utils/helpers";

interface FeedChannelSatelliteProps {
  channel: string;
  properties: {
    damage: string;
  };
}

export const FeedChannelSatellite = (props: FeedChannelSatelliteProps) => {
  console.log(props);
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>
          {capitalize(
            //https://github.com/acikkaynak/deprem-yardim-frontend/issues/1019
            props?.properties?.damage === "Destroyed"
              ? "Collapsed"
              : props?.properties?.damage
          )}
        </DrawerContent.Title>
        <DrawerContent.Badge>{capitalize(props.channel)}</DrawerContent.Badge>
      </DrawerContent.Header>
    </DrawerContent>
  );
};
