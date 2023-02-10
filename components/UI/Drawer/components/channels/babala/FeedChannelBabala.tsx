import Typography from "@mui/material/Typography";
import { Check } from "@mui/icons-material";

import { FeedChannelBabalaProps } from "../../types";
import { Link, Popover } from "@mui/material";
import { useState } from "react";

const FeedChannelBabala = ({
  full_text,
  extra_parameters,
  reason,
}: FeedChannelBabalaProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<any>(false);

  return (
    <>
      <div style={styles.container}>
        <div style={styles.user}></div>
        <div style={styles.logo_container}>
          <Typography style={styles.logo}>Babala</Typography>
          {!!extra_parameters?.status && (
            <Link
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
            >
              <Check style={styles.confirmation} />
            </Link>
          )}
          {!!reason && (
            <Typography style={styles.reason}>
              {reason.toLowerCase()}
            </Typography>
          )}
        </div>
        <Typography style={styles.fullText}>{full_text}</Typography>
      </div>
      <Popover
        anchorReference="anchorEl"
        open={isPopoverOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          background: "#00000000",
          pointerEvents: "none",
          zIndex: 10000000,
        }}
        onClose={() => setIsPopoverOpen(false)}
      >
        <Typography sx={{ padding: "10px", width: "450px" }}>
          Veri doğrulanmış.
        </Typography>
      </Popover>
    </>
  );
};

// TODO#642: Babala channelından gelen veriler için gösterilecek tasarım
const styles = {
  reason: {
    backgroundColor: "#F05454",
    fontWeight: 800,
    color: "white",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 12,
    width: "fit-content",
    borderRadius: 6,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: "auto",
    marginRight: 0,
  },
  logo_container: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    lineHeight: 0,
    marginBottom: 10,
  },
  confirmation: {
    backgroundColor: "green",
    fontSize: 15,
    fontWeight: 800,
    color: "white",
    marginLeft: 10,
    borderRadius: 12,
  },
  logo: {
    color: "white",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 800,
  },
  container: {
    padding: "11px 15px 40px 15px",
    borderRadius: "12px",
    margin: "10px 0",
    backgroundColor: "#222831",
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
    color: "white",
    lineHeight: 1.35,
    marginTop: 20,
  },
};

export default FeedChannelBabala;
