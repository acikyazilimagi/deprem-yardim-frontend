import { Box, Button, Popover } from "@mui/material";
import React, { useState } from "react";
import { Help } from "@mui/icons-material";
import { useDevice } from "@/stores/mapStore";

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
            maxHeight: device === "mobile" ? "30vw" : "20vw",
            minHeight: device === "mobile" ? "30vw" : "20vw",
            maxWidth: device === "mobile" ? "60vw" : "20vw",
            minWidth: device === "mobile" ? "60vw" : "20vw",
            overflow: "auto",
          }}
        >
          Karşınızdaki haritada bölgelere çıkan yuvarlakların üstüne tıkayarak
          yaklaşın. Bölgelere yaklaştıkça bilgiler haritada yer yer
          görünecektir. Yakınlaşmayı sürdürdükçe bilgilere erişeceksiniz. Mavi
          pinlere tıklayıp bilgileri görüntüleyin.
          <br />
          <br />
          En başta yeradı/adres bilgisini okuyacaksınız. Düğmeler ile amacına
          uygun ilerlemek isteyebilirsiniz.
          <br />
          <h4>Kullanma Yöntemleri</h4>
          <br />
          1- *+*: artı düğmesi ile haritayı yakınlaştırıp bakın.
          <br />
          2- *-*: eksi düğmesi ile haritayı uzaklaştırıp bakın.
          <br />
          ## Renkli Yuvarlakların Anlamları
          <br />
          <b>**YEŞİL**:</b>
          <br />
          <b>**ALAYEŞİL**: Düşük yoğunluk</b>
          <br />
          <b>**SARI**: Orta-alt yoğunluk</b>
          <br />
          <b>**TURUNCU**: Orta yoğunluk</b>
          <br />
          <b>**ALAKIZIL**: Orta-üst yoğunluk</b>
          <br />
          <b>**KIZIL**: Yüksek yoğunluk</b>
          <br />
          <br />
          <br />
          <h3> UYARI </h3>
          <br />
          Yardım İçeriği bölümünde bir bilgi, bir twit karşınıza çıkmıyor ise
          şunları deneyiniz.
          <br />
          1- Kaynak düğmesine tıklayıp bilgiye ulaşabilirsiniz.
          <br />
          2- Kayıtlı veriyi göster düğmesini etkin kılınız.
          <br />
          <br />
          Bunların dışında bilgi bir biçimde erişilemez olmuştur.
        </Box>
      </Popover>
    </>
  );
}

export default React.memo(MapHelper);
