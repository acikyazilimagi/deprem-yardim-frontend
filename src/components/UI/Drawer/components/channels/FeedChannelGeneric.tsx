import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { ChannelData } from "@/types";
import { useTranslation } from "next-i18next";

export const FeedChannelGeneric = ({ channel, properties }: ChannelData) => {
  const { icon } = properties as { icon: string | null };
  const { t } = useTranslation("home");

  interface ChannelNameTranslations {
    [key: string]: string;
  }

  const genericChannelNameTranslations: ChannelNameTranslations = {
    teyit_yardim: t("content.channels.verified_relief"),
    teyit_istek: t("content.channels.verified_rescue"),
    uda_yardim: t("content.channels.uda"),
    veteriner: t("content.channels.veterinary"),
    diyaliz_merkezleri: t("content.channels.dialysis"),
    discord: t("content.channels.discord"),
    depremio: t("content.channels.deprem_io"),
    psikolojik_destek: t("content.channels.psychological_support"),
    ahbap_location: t("content.channels.ahbap"),
    depremihtiyaccom: t("content.channels.deprem_ihtiyac"),
    gecici_barinma_gida_dagitim: t("content.channels.temporary_house"),
    hastane: t("content.channels.hospital"),
    tahliye_noktalari: t("content.channels.evacuation"),
  };

  return (
    <div style={styles.container}>
      <div style={styles.logo_container}>
        <Typography style={styles.logo}>
          {genericChannelNameTranslations[channel] || channel}
        </Typography>
        {icon && <img style={styles.icon} src={icon} alt={`${channel} icon`} />}
      </div>
      <Divider />
      {properties.description && (
        <Typography
          style={styles.description}
        >{`${properties.description}`}</Typography>
      )}
    </div>
  );
};

const styles = {
  logo_container: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logo: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 800,
  },
  icon: {
    width: 28,
    height: 28,
  },
  container: {
    padding: "11px 15px 40px 15px",
    margin: "10px 0",
    borderRadius: "12px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
  },
  name: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.35,
    marginTop: 20,
  },
  description: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.35,
    marginTop: 20,
  },
};
