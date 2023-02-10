import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

import React from "react";

const SitesIcon = () => {
  const isMinWidth = useMediaQuery("(min-width:1024px)");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState<any>(null);
  const anchor = React.useRef(null);
  const handlePopoverOpen = (Popover: string) => {
    const element = anchor;
    setAnchorEl(element.current);
    setIsOpen(Popover);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsOpen(null);
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
    width: 28,
    height: 28,
  };

  return (
    <>
      <Stack
        ref={anchor}
        id="sitesIcon"
        direction="row"
        spacing={2}
        sx={{
          display: isMinWidth ? "flex" : "none",
          background: "rgba(220, 20, 60, 0.5)",
          padding: "10px",
          borderRadius: "10px",
          position: "absolute",
          top: "10px",
          right: "26px",
          zIndex: 500,
        }}
      >
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
              Depremzedeleri aramak ve yardım etmek için kullandığımız site.
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
              Afetle ilgili çeşitli konularda bilgi almak için kullandığımız web
              sitesi.
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
              Depremzedelere erzak yardımı için kullandığımız site.
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
              Projelerimizi geliştirmek ve birbirimizle iletişim kurmak için
              kullandığımız Discord sunucusu.
            </Typography>
          </Popover>
        </Box>
      </Stack>
    </>
  );
};

export default SitesIcon;
