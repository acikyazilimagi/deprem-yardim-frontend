import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import React from "react";

const SitesIcon = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState<any>(null);
  const handlePopoverOpen = (Popover: string) => {
    const element = document.getElementById("sitesIcon");
    setAnchorEl(element);
    setIsOpen(Popover);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsOpen(null);
  };

  return (
    <Stack
      id="sitesIcon"
      direction="row"
      spacing={2}
      sx={{
        background: "rgba(220, 20, 60, 0.5)",
        padding: "10px",
        borderRadius: "10px",
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
      }}
    >
      <Box>
        <a
          href="https://depremyardim.com/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handlePopoverOpen("depremYardim")}
          onMouseLeave={handlePopoverClose}
        >
          <Avatar alt="deprem yardim icon" src="/icons/depremyardımIcon.svg" />
        </a>

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
          sx={{ background: "rgba(0, 0, 0, 0.1)", pointerEvents: "none" }}
          onClose={handlePopoverClose}
        >
          <Typography sx={{ padding: "10px" }}>
            Deprem Yardım Sitemiz Depremzedelerin Ve Depremzedeleri Aramak İçin
            Kullandığımız Site.
          </Typography>
        </Popover>
      </Box>

      <Box>
        <a
          href="https://deprem.io/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handlePopoverOpen("depremIO")}
          onMouseLeave={handlePopoverClose}
        >
          <Avatar alt="deprem io icon" src="/icons/depremIOIcon.svg" />
        </a>

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
          sx={{ background: "rgba(0, 0, 0, 0.1)", pointerEvents: "none" }}
          onClose={handlePopoverClose}
        >
          <Typography sx={{ padding: "10px" }}>
            Deprem.io Sitemiz Depremzedelerin Ve Depremzedeleri Erzak Yardımı
            İçin Kullandığımız Site.
          </Typography>
        </Popover>
      </Box>

      <Box>
        <a
          href="https://deprem.io/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handlePopoverOpen("depremDiscord")}
          onMouseLeave={handlePopoverClose}
        >
          <Avatar alt="discord icon" src="/icons/discordIcon.svg" />
        </a>

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
          sx={{ background: "rgba(0, 0, 0, 0.1)", pointerEvents: "none" }}
          onClose={handlePopoverClose}
        >
          <Typography sx={{ padding: "10px" }}>
            Discord Sunucumuzda Projelerimizi Geliştirmek Ve Birbirimizle
            İletişim Kurmak İçin Kullandığımız Site.
          </Typography>
        </Popover>
      </Box>
    </Stack>
  );
};

export default SitesIcon;
