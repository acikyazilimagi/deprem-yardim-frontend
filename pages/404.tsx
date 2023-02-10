import CustomErrorPage from "@/pages/_error";
import type { NextPage } from "next";

const NotFoundPage: NextPage = () => {
  return (
    <CustomErrorPage
      title="Sayfa Bulunamadı"
      detail="Aradığınız sayfa bulunamadı."
      statusCode={404}
    />
  );
};

export default NotFoundPage;
