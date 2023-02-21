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
          {capitalize(
            props?.properties?.damage === "Destroyed"
              ? "Collapsed"
              : props?.properties?.damage
          )}
        </DrawerContent.Title>
        <DrawerContent.Badge>
          {t("content.channels.satellite")}
        </DrawerContent.Badge>
      </DrawerContent.Header>
    </DrawerContent>
  );
};
