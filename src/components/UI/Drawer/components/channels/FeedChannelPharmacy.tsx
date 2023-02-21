import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import capitalize from "@mui/utils/capitalize";
import { FeedChannelPharmacyProps } from "../../types";
import { useTranslation } from "next-i18next";

export const FeedChannelPharmacy = (props: FeedChannelPharmacyProps) => {
  const { reason, name, description } = props.properties;
  const { t } = useTranslation("home");
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>
          {t("content.channels.pharmacy")}
        </DrawerContent.Title>
        <DrawerContent.Badge>{capitalize(reason || "")}</DrawerContent.Badge>
      </DrawerContent.Header>
      {name && <DrawerContent.Text>{name}</DrawerContent.Text>}
      {description && <DrawerContent.Text>{description}</DrawerContent.Text>}
    </DrawerContent>
  );
};
