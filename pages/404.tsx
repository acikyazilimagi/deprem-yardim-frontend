import CustomErrorPage from "@/pages/_error";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const NotFoundPage: NextPage = () => {
  const { t } = useTranslation("error");
  return (
    <CustomErrorPage
      title={t("404.title").toString()}
      detail={t("404.detail").toString()}
      statusCode={404}
    />
  );
};

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["error"])),
    },
  };
}

export default NotFoundPage;
