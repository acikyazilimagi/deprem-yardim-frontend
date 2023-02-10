import CustomErrorPage from "@/pages/_error";
import type { NextPage } from "next";

const NotFoundPage: NextPage = () => {
  return (
    <CustomErrorPage
      title="Lütfen aralıklı olarak tekrar dene. Hataları düzeltmek için sürekli çalışıyoruz"
      detail="Umudunu kaybetme, birazdan tekrar dene. Hata aldığın için üzgünüz. Hataları düzeltmek için sürekli çalışıyoruz.
      Lütfen aralıklı olarak tekrar dene. Bu websitesi gönüllü yüzlerce yazılımcı tarafından sürekli test edilip, geliştirilmeye devam ediyor. Vazgeçmeyeceğiz. Yanınızdayız. "
      statusCode={404}
    />
  );
};

export default NotFoundPage;
