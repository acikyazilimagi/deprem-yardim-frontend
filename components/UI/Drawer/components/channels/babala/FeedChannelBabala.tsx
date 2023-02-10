import Typography from "@mui/material/Typography";
import { FeedChannelBabalaProps } from "../../types";

const FeedChannelBabala = ({
  full_text,
  extra_parameters,
}: FeedChannelBabalaProps) => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.user}></div>
        <Typography style={styles.fullText}>{full_text}</Typography>
        <Typography style={styles.fullText}>
          {extra_parameters.status}
        </Typography>
        <Typography style={styles.confirmation}>
          {extra_parameters.manual_confirmation}
        </Typography>
      </div>
    </>
  );
};
// TODO#642: Babala channelından gelen veriler için gösterilecek tasarım
const styles = {
  container: {
    padding: "11px 15px 15px 15px",
    border: "1px solid rgb(207, 217, 222)",
    borderRadius: "12px",
    margin: "10px 0",
  },
  user: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 11,
  },
  fullText: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.87)",
    lineHeight: 1.35,
  },
  confirmation: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeight: 800,
    color: "red",
    lineHeight: 1.35,
  },
};

export default FeedChannelBabala;
