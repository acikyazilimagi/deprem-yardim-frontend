import { DrawerContent } from "@/components/Drawer/components/channels/DrawerContent";
import { capitalize } from "@/utils/helpers";
import { FeedChannelSafePlacesProps } from "../../types";
import { useTranslation } from "next-i18next";
export const FeedChannelSafePlaces = (props: FeedChannelSafePlacesProps) => {
  const { t } = useTranslation("home");
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>
          {t("content.channels.safe_places")}
        </DrawerContent.Title>
        <DrawerContent.Badge>
          {capitalize(props?.properties?.reason || "")}
        </DrawerContent.Badge>
      </DrawerContent.Header>
    </DrawerContent>
  );
};
