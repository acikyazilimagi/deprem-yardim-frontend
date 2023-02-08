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
            label={"Afet Haritasını Kullanmayı Çabucak Öğren"}
          />
          <br />
          <ul>
            <li>
              Karşınızdaki haritada çıkan yuvarlakların üstüne tıkayarak
              yaklaşın.
            </li>
            <li>
              Bölgelere yaklaştıkça bilgi yuvarlakları dağılıp yerleşecektir.
            </li>
            <li>Mavi pinleri görene dek yakınlaşmayı sürdürün.</li>
            <li>Mavi pinlere tıklayıp bilgileri okuyun.</li>
          </ul>
          <Chip
            sx={{ backgroundColor: "#2596be", color: "white" }}
            label={"Bilgi Bölümü"}
          />
          <ul>
            <li>Yeradı/adres bilgisi açılan alanda ilk sırada yazılıdır.</li>
            <li>
              Yeryüzü konumu için teknik yeradı ikinci sırada yazılıdır.
              (Koordinat numarası)
            </li>
            <li>
              Bilgileri Google Haritalar üzerinden kullanmak ister iseniz{" "}
              <b>Google Haritalarda Aç</b> düğmesine tıklayın.
            </li>
            <li>
              Bilgilere göre Google Haritalar üzerinden yol tarifi almak ister
              iseniz <b>Yol Tarifi Al</b> düğmesine tıklayın.
            </li>
            <li>
              Linki/Örkü kopyalayıp paylaşmak için <b>Kopyala</b> düğmesine
              tıklayın.
            </li>
            <li>
              Bilginin elde edildiği kaynağı okumak için <b>Kaynak</b> düğmesine
              tıklayın.
            </li>
            <li>
              Yardım İçeriği adlı bölümde oluşturulan yardım çağrısının nerede
              olduğunu görürsünüz.
            </li>
            <li>
              Kayıtlı veri göster düğmesini etkin kılar iseniz yardım çağrısının
              çıktığı kaynaktan elde edilmiş yazılı yedek bilgiyi görürsünüz.
            </li>
          </ul>
          <Chip
            sx={{ backgroundColor: "#2596be", color: "white" }}
            label={"Kullanma Yöntemleri"}
          />
          <ul>
            <li>
              <b>Bilgi bölümünü</b> kapamak için çarpı simgesine ya da boş alan
              üstüne tıklamanız gerekir.
            </li>
            <li>
              Harita üstündeki (+) artı düğmesi ile haritayı yakınlaştırıp
              bakın.
            </li>
            <li>
              Harita üstündeki (-) eksi düğmesi ile haritayı uzaklaştırıp bakın.
            </li>
            <li>
              Harita üstündeki (o) döndür düğmesi ile haritayı ilk uzaklığına
              döndürüp bakın.
            </li>
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
              <b>Yardım İçeriği</b> bölümünde bir bilgi, bir twit karşınıza
              çıkmıyor ise şunları deneyiniz.
            </li>
            <li>
              Kaynak düğmesine tıklayıp bilgiye doğruca ulaşmayı deneyiniz.
            </li>
            <li>
              Kayıtlı veriyi göster düğmesini etkin kılarak yedek olarak alınmış
              yazılı bilgiyi görmeyi deneyiniz.
            </li>
            <li>
              Bunların dışındaki durumlar altında bilgi bir biçimde erişilemez
              olmuştur. Bunun için üzgünüz.
            </li>
          </ul>
        </Box>
      </Popover>
    </>
  );
}

export default React.memo(MapHelper);
