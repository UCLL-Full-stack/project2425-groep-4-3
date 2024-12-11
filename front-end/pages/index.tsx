import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';

import { GetServerSideProps, GetServerSidePropsContext} from 'next';
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
      <main className="flex flex-col items-center">
        <span>
          <Image
            src="/images/courses.png"
            alt="Courses Logo"
            className=""
            width={50}
            height={50}
          />
          <h1 className='text-red-600'>{t("home.title")}</h1>
        </span>

        <div >
          <p className="text-red-300">{t("home.info")}
            
          </p>
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({locale}) =>({
  props: {
    ...(await serverSideTranslations(locale ?? "nl" ,["common"])),
  },
})

export default Home;
