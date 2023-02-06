import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

export default function MyDrawer() {
  const [isOpen, setOpen] = React.useState(false);

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen((prev) => !prev);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      Rendered item
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer()}>Left</Button>
      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer()}>
        {list()}
      </Drawer>
    </div>
  );
}
