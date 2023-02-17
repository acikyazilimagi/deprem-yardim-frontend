import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Divider } from "@mui/material";
import { capitalize, isNaN } from "@/utils/helpers";
import { FeedChannelBabalaProps } from "../../../types";

const FeedChannelBabala = ({ properties }: FeedChannelBabalaProps) => {
  // const extraValues =
  //   properties.extraParams &&
  //   Object.entries(properties.extraParams).map(([k, v]) => {
  //     if (!isNaN(v) && v !== "<nil>" && (typeof v !== "string" || !!v.trim())) {
  //       return (
  //         <Typography key={k} style={styles.fullText}>
  //           {v as string}
  //         </Typography>
  //       );
  //     }
  //   });

  console.log({ properties });

  return (
    <>
      <div style={styles.container}>
        <div style={styles.logo_container}>
          <Typography style={styles.logo}>Babala</Typography>
        </div>
        <Divider />
        <Typography style={styles.fullText}>{properties.full_text}</Typography>
        {/* {extraValues} */}

        {!isNaN(properties.reason) && properties.reason && (
          <div style={styles.chip_container}>
            <Chip label={capitalize(properties.reason)} color="info" />
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  chip_container: {
    display: "flex",
    gap: 5,
    marginTop: "10px",
    fontWeight: 500,
  },
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
  container: {
    padding: "11px 15px 40px 15px",
    margin: "10px 0",
    borderRadius: "12px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
  },
  fullText: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.35,
    marginTop: 20,
  },
};

export default FeedChannelBabala;
