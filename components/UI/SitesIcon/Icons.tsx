import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import ArrowForwardNewIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export type SitesIconProps = {
  mobile: boolean;
};

const SitesIcon: React.FC<SitesIconProps> = ({ mobile }) => {
  const { t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<any>(null);
  const anchor = useRef(null);
  const handlePopoverOpen = (Popover: string) => {
    const element = anchor;
    setAnchorEl(element.current);
    setIsOpen(Popover);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsOpen(!isOpen);
  };
  // I make this way because = https://smartdevpreneur.com/4-mui-sx-hover-examples/
  const toBiggerIcon = {
    "&:hover": {
      transform: "scale(1.2)",
    },
    "&": {
      transition: "all 0.3s ease-in-out",
    },
  };

  const littleIcon = {
    width: mobile ? 24 : 24,
    height: mobile ? 24 : 24,
  };

  return (
    <>
      <Stack
        ref={anchor}
        id="sitesIcon"
        direction="row"
        spacing={2}
        sx={{
          background: "white",
          padding: "3px",
          borderRadius: "5px",
          border: "1px solid #19857B",
          position: "absolute",
          top: "173px",
          left: mobile ? "10px" : "10px",
          zIndex: 500,
        }}
      >
        {isOpen ? (
          <>
            <ArrowBackIosNewIcon color="#19857B" onClick={handlePopoverClose} />
            <Box sx={toBiggerIcon}>
              <Link
                href="https://depremyardim.com/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => handlePopoverOpen("depremYardim")}
                onMouseLeave={handlePopoverClose}
              >
                <Avatar
                  sx={littleIcon}
                  alt="deprem yardim icon"
                  src="/icons/depremyardımIcon.svg"
                />
              </Link>
              <Popover
                anchorReference="anchorEl"
                anchorEl={anchorEl}
                open={"depremYardim" === isOpen ? true : false}
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
                  zIndex: 600,
                }}
                onClose={handlePopoverClose}
              >
                <Typography sx={{ padding: "10px", width: "450px" }}>
                  {t("site.depremyardim")}
                </Typography>
              </Popover>
            </Box>
            <Box sx={toBiggerIcon}>
              <Link
                href="https://www.afetbilgi.com/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => handlePopoverOpen("afetBilgi")}
                onMouseLeave={handlePopoverClose}
                style={{
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    color: "white",
                    height: "100%",
                    width: 40,
                    borderRadius: 20,
                    backgroundColor: "orange",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none !important",
                    textTransform: "none",
                  }}
                >
                  <Typography fontSize={14}>AFET</Typography>
                </Box>
              </Link>

              <Popover
                anchorReference="anchorEl"
                anchorEl={anchorEl}
                open={"afetBilgi" === isOpen ? true : false}
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
                  zIndex: 600,
                }}
                onClose={handlePopoverClose}
              >
                <Typography sx={{ padding: "10px", width: "450px" }}>
                  {t("site.afetbilgi")}
                </Typography>
              </Popover>
            </Box>
            <Box sx={toBiggerIcon}>
              <Link
                href="https://deprem.io/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => handlePopoverOpen("depremIO")}
                onMouseLeave={handlePopoverClose}
              >
                <Avatar
                  sx={littleIcon}
                  alt="deprem io icon"
                  src="/icons/depremIOIcon.svg"
                />
              </Link>

              <Popover
                anchorReference="anchorEl"
                anchorEl={anchorEl}
                open={"depremIO" === isOpen ? true : false}
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
                  zIndex: 600,
                }}
                onClose={handlePopoverClose}
              >
                <Typography sx={{ padding: "10px", width: "450px" }}>
                  {t("site.depremio")}
                </Typography>
              </Popover>
            </Box>
            <Box sx={toBiggerIcon}>
              <Link
                href="https://discord.gg/itdepremyardim"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => handlePopoverOpen("depremDiscord")}
                onMouseLeave={handlePopoverClose}
              >
                <Avatar
                  sx={littleIcon}
                  alt="discord icon"
                  src="/icons/discordIcon.svg"
                />
              </Link>

              <Popover
                anchorReference="anchorEl"
                anchorEl={anchorEl}
                open={"depremDiscord" === isOpen ? true : false}
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
                  zIndex: 600,
                }}
                onClose={handlePopoverClose}
              >
                <Typography sx={{ padding: "10px", width: "450px" }}>
                  {t("site.discord")}
                </Typography>
              </Popover>
            </Box>
          </>
        ) : (
          <ArrowForwardNewIosIcon
            color="#333030"
            onClick={handlePopoverClose}
          />
        )}
      </Stack>
    </>
  );
};

export default SitesIcon;
