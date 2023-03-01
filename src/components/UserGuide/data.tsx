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
        type: "paragraph",
        data: {
          text: "Afet harita,  çeşitli mecralardan toplanan kazazede, yardım talepleri ve hizmetler ile ilgili konum ve yoğunluk bilgilerinin görüntülenmesini sağlamaktadır. Harita üzerinden teyit edilmiş yardım noktalarına filtreler kullanılarak erişilebilir.",
          level: 6,
        },
      },
      {
        type: "header",
        data: {
          text: "Harita Kullanımı",
          level: 6,
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Karşınızdaki haritada bölgelere çıkan yuvarlakların üstüne tıklayarak yaklaşın.",
            "Üzerinde adet bilgisi yer alan daireler ile karşılaşacaksınız, bunlara tıklayarak yakınlaşın.",
            "Bölgelere yaklaştıkça bilgi daireleri dağılacaktır.",
            "Pin görene dek yakınlaşmayı sürdürün.",
            "Pinlere tıklayıp içerik detaylarını görüntüleyebilirsiniz.",
            "Yardım çağrısı detaylarını kapatmak için çarpı simgesine ya da boş alan üstüne tıklamanız gereklidir.",
            "Afetle ilgili diğer uygulamalara da sağ altta bulunan linklerden ulaşabilirsiniz.",
          ],
        },
      },
      {
        type: "header",
        data: {
          text: "İçerik Detayları",
          level: 3,
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Yer adı/adres bilgisi ve bildirimin oluşturulduğu tarih bilgisini en tepede görebilirsiniz.",
            "“İçerik” alanında yardım çağrısının içeriği ve kaynak bilgisini görebilirsiniz.",
            "Konum bilgilerini Google Haritalar ya da Apple Haritalar üzerinden görüntülemek isterseniz Yol tarifi altından **Google Haritalarda Aç** ya da **Apple Haritalarda Aç** butonlarına tıklayabilirsiniz.",
            "Pinin koordinat bilgilerini en altta görüntüleyebilirsiniz.",
          ],
        },
      },
      {
        type: "header",
        data: {
          text: "Yoğunluk Haritası Gösterimleri",
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
      {
        type: "header",
        data: {
          text: "Faydalı Siteler",
          level: 6,
        },
      },
      {
        type: "links",
        data: {
          withHeadings: false,
          content: [
            ["depremyardim.com", "https://depremyardim.com/"],
            ["deprem.io", "https://deprem.io/"],
            ["afetbilgi.com", "https://www.afetbilgi.com/"],
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
        level: 5,
      },
    },
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "The disaster map provides the display of location and density information regarding Relief aid, Rescue help and Services media collected from various platforms. Confirmed help points on the map can be accessed using filters.",
          level: 6,
        },
      },
      {
        type: "header",
        data: {
          text: "Map Usage",
          level: 6,
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "After filtering, click the **Scan Field** button.",
            "Click on the circles with numbers on to zoom in.",
            "Information circles will dissipate as you get closer to the regions.",
            "Keep zooming until you see the pins.",
            "You can click on the pins to view the content details.",
            "To close the details of the call for help, you need to click on the cross icon or on the empty space.",
            "You can also access other disaster-related applications from the links at the bottom right.",
          ],
        },
      },
      {
        type: "header",
        data: {
          text: "Content Details",
          level: 3,
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "You can see the location name/address information and the date the notification was created at the top.",
            "In the 'Content' area, you can see the content and source information of the call for help.",
            "If you want to view the location information on Google Maps or Apple Maps, you can click the **Open in Google Maps** or **Open in Apple Maps** buttons under directions.",
            "You can view the coordinate information of the pin at the bottom.",
          ],
        },
      },
      {
        type: "header",
        data: {
          text: "Heatmap",
          level: 6,
        },
      },
      {
        type: "table",
        data: {
          withHeadings: false,
          content: [
            ["Less Intense", "1"],
            ["Low-Medium Intense", "2"],
            ["Medium Intense", "3"],
            ["Medium-High Intense", "4"],
            ["High Intensity", "5"],
            ["Very Intense", "6"],
          ],
        },
      },
      {
        type: "header",
        data: {
          text: "Useful Sites",
          level: 6,
        },
      },
      {
        type: "links",
        data: {
          withHeadings: false,
          content: [
            ["depremyardim.com", "https://depremyardim.com/"],
            ["deprem.io", "https://deprem.io/"],
            ["afetbilgi.com", "https://www.afetbilgi.com/"],
          ],
        },
      },
    ],
  },
};
