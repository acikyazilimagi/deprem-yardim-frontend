import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import { capitalize } from "@/utils/helpers";
import { useTranslation } from "next-i18next";
interface FeedChannelSatelliteProps {
  channel: string;
  properties: {
    damage: string;
  };
}

export const FeedChannelSatellite = (props: FeedChannelSatelliteProps) => {
  const { t } = useTranslation("home");
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>
          {t("content.channels.satellite")}
        </DrawerContent.Title>
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
