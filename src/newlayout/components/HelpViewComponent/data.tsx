//TODO: this data should be moved to public/locales
export const data = {
  tr: {
    title: {
      type: "header",
      data: {
        text: "Kullanım Kılavuzu",
        level: 5,
      },
    },
    blocks: [
      {
        type: "header",
        data: {
          text: "Nasıl Kullanırım?",
          level: 6,
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Karşınızdaki haritada bölgelere çıkan yuvarlakların üstüne tıklayarak yaklaşın.",
            "Bölgelere yaklaştıkça bilgiler haritada yer yer görünecektir.",
            "Yakınlaşmayı sürdürdükçe bilgilere erişeceksiniz.",
            "Mavi pinlere tıklayıp bilgileri görüntüleyin.",
            "En başta yer adı/adres bilgisini okuyacaksınız. Düğmeler ile amacına uygun ilerlemek isteyebilirsiniz.",
          ],
        },
      },
      {
        type: "header",
        data: {
          text: "Kullanma yöntemleri",
          level: 3,
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "*+* artı düğmesi ile haritayı yakınlaştırıp bakın.",
            "*-* artı düğmesi ile haritayı uzaklaştırıp bakın.",
          ],
        },
      },
      {
        type: "header",
        data: {
          text: "Renk alanlarının anlamları",
          level: 6,
        },
      },
      {
        type: "table",
        data: {
          withHeadings: false,
          content: [
            ["Az Yoğun", "1"],
            ["Az-Orta Yoğun", "2"],
            ["Orta Yoğun", "3"],
            ["Orta-Yüksek Yoğun", "4"],
            ["Yüksek Yoğun", "5"],
            ["Çok Yoğun", "6"],
          ],
        },
      },
    ],
  },
  en: {
    title: {
      type: "header",
      data: {
        text: "Manual",
        level: 2,
      },
    },
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Nasıl Kullanırım?",
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Karşınızdaki haritada bölgelere çıkan yuvarlakların üstüne tıklayarak yaklaşın.",
            "Bölgelere yaklaştıkça bilgiler haritada yer yer görünecektir.",
            "Yakınlaşmayı sürdürdükçe bilgilere erişeceksiniz.",
            "Mavi pinlere tıklayıp bilgileri görüntüleyin.",
            "En başta yer adı/adres bilgisini okuyacaksınız. Düğmeler ile amacına uygun ilerlemek isteyebilirsiniz.",
          ],
        },
      },
      {
        type: "paragraph",
        data: {
          text: "Kullanma yöntemleri",
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "*+* artı düğmesi ile haritayı yakınlaştırıp bakın.",
            "*-* artı düğmesi ile haritayı uzaklaştırıp bakın.",
          ],
        },
      },
      {
        type: "header",
        data: {
          text: "Renk alanlarının anlamları",
          level: 6,
        },
      },
      {
        type: "table",
        data: {
          withHeadings: false,
          content: [
            ["Az Yoğun", "1"],
            ["Az-Orta Yoğun", "2"],
            ["Orta Yoğun", "3"],
            ["Orta-Yüksek Yoğun", "4"],
            ["Yüksek Yoğun", "5"],
            ["Çok Yoğun", "6"],
          ],
        },
      },
    ],
  },
};
