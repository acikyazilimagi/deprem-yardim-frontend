import { Box, Button, Chip, Popover } from "@mui/material";
import React, { useState } from "react";
import { Help } from "@mui/icons-material";
import { useDevice } from "@/stores/mapStore";
import "./Map.module.css";
import { Tags } from "@/components/UI/Tag/Tag.types";
import styles from "@/components/UI/Map/Map.module.css";

const HELPER_ID = "map-helper";

function MapHelper() {
  const device = useDevice();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openHelper, setOpenHelper] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenHelper(!openHelper);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenHelper(false);
  };

  return (
    <>
      <Button
        sx={{
          position: "absolute",
          top: "14%",
          left: "0",
          marginLeft: "12px",
          zIndex: "1000",
          maxWidth: "30px",
          minWidth: "30px",
          width: "30px",
          height: "30px",
          backgroundColor: "#f54a4a",
          ":hover": {
            backgroundColor: "#f54a4a",
          },
        }}
        aria-describedby={HELPER_ID}
        variant={"contained"}
        onClick={handleClick}
      >
        <Help />
      </Button>
      <Popover
        id={HELPER_ID}
        open={openHelper}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            maxHeight: device === "mobile" ? "40vh" : "50vh",
            minHeight: device === "mobile" ? "40vh" : "50vh",
            maxWidth: device === "mobile" ? "60vw" : "30vw",
            minWidth: device === "mobile" ? "60vw" : "30vw",
            overflow: "auto",
            padding: "20px 20px",
          }}
        >
          <Chip
            sx={{ backgroundColor: "#2596be", color: "white" }}
            label={"Nasıl Kullanırım"}
          />
          <br />
          <ul>
            <li>
              Karşınızdaki haritada bölgelere çıkan yuvarlakların üstüne
              tıkayarak yaklaşın.
            </li>
            <li>
              Bölgelere yaklaştıkça bilgiler haritada yer yer görünecektir.
            </li>
            <li>
              Yakınlaşmayı sürdürdükçe bilgilere erişeceksiniz. Mavi pinlere
              tıklayıp bilgileri görüntüleyin.
            </li>
            <li>
              En başta yeradı/adres bilgisini okuyacaksınız. Düğmeler ile
              amacına uygun ilerlemek isteyebilirsiniz.
            </li>
          </ul>
          <Chip
            sx={{ backgroundColor: "#2596be", color: "white" }}
            label={"Kullanma Yöntemleri"}
          />
          <ul>
            <li>*+*: artı düğmesi ile haritayı yakınlaştırıp bakın.</li>
            <li>*-*: eksi düğmesi ile haritayı uzaklaştırıp bakın.</li>
          </ul>
          <Chip
            sx={{ backgroundColor: "#2596be", color: "white" }}
            label={"Renkli Yuvarlakların Anlamları"}
          />
          <br />
          <br />
          <div className={" map_helper"}>
            {Object.keys(Tags).map((intensity) => (
              <Button
                key={intensity}
                className="map_helper_button"
                sx={{
                  color: "black",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  margin: "5px 10px",
                }}
                aria-label={Tags[intensity].intensity}
                onClick={(event) => handleClick(event, intensity)}
              >
                <div
                  className={styles.legend_item__color}
                  style={{ backgroundColor: Tags[intensity].color }}
                />
                <span>&nbsp;&nbsp;{Tags[intensity].intensity}</span>
              </Button>
            ))}
          </div>
          <br />
          <br />
          <Chip
            sx={{ backgroundColor: "#2596be", color: "white" }}
            label={"UYARI"}
          />
          <br />
          <ul>
            <li>
              Yardım İçeriği bölümünde bir bilgi, bir twit karşınıza çıkmıyor
              ise şunları deneyiniz.
            </li>
            <li>Kaynak düğmesine tıklayıp bilgiye ulaşabilirsiniz.</li>
            <li>Kayıtlı veriyi göster düğmesini etkin kılınız.</li>
            <li>Bunların dışında bilgi bir biçimde erişilemez olmuştur.</li>
          </ul>
        </Box>
      </Popover>
    </>
  );
}

export default React.memo(MapHelper);
