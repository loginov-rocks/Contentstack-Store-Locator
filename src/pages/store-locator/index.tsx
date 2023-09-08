import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { StoreHomePageEntry, queryStoreHomePageEntry } from '@/contentstack/storeLocator';
import { CountriesList } from '@/storeLocator/components/CountriesList';
import { Seo } from '@/storeLocator/components/Seo';

interface Props {
  entry: StoreHomePageEntry;
}

export default function StoreHomePage({ entry }: Props) {
  return (
    <>
      <Head>
        <Seo seo={entry.seo} />
      </Head>
      <nav>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
        </ul>
      </nav>
      <h1>{entry.title}</h1>
      <CountriesList storeCountryPageEntries={entry.countries} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const entry = await queryStoreHomePageEntry(context.resolvedUrl);

  if (!entry) {
    return { notFound: true };
  }

  return {
    props: { entry },
  };
}
