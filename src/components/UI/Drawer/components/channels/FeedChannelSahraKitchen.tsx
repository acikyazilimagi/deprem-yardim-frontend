import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import { FeedChannelSahraProps } from "../../types";
import { useTranslation } from "next-i18next";
export const FeedChannelSahra = (props: FeedChannelSahraProps) => {
  const { t } = useTranslation("home");
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>{props.properties.name}</DrawerContent.Title>
        {/* No longer received from API */}
        {/* <DrawerContent.Badge>
          {props.properties.verified ? "Onaylandı" : "Onaylanmadı"}
        </DrawerContent.Badge> */}
      </DrawerContent.Header>
      <DrawerContent.Text>{t("content.channels.food")}</DrawerContent.Text>
      <DrawerContent.Text>{props.properties.reason}</DrawerContent.Text>
    </DrawerContent>
  );
};
