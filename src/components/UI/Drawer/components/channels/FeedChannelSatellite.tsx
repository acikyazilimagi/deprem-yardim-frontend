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
        <DrawerContent.Title>Uydu Verisi</DrawerContent.Title>
        <DrawerContent.Badge>
          {capitalize(
            props?.properties?.damage === "Destroyed"
              ? "Collapsed"
              : props?.properties?.damage
          )}
        </DrawerContent.Badge>
      </DrawerContent.Header>
    </DrawerContent>
  );
};
