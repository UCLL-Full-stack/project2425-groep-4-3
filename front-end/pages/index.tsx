import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>PedaLenen</title>
        <meta name="description" content="PedaLenen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center ">
        <span className="mb-8 flex flex-col items-center">
          <Image
            src="/images/courses.png"
            alt="Courses Logo"
            className=""
            width={250} // Larger size for the image
            height={250}
          />
          <h1 className="text-black text-4xl font-bold mt-4">
            {t("home.title")}
          </h1>
        </span>

        <div className="max-w-2xl px-4 text-center">
          <p className="text-black text-lg">{t("home.info")}</p>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "nl", ["common"])),
  },
});

export default Home;
