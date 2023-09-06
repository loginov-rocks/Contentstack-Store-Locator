import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import { StoreHomePageEntry, queryStoreHomePageEntry } from '@/contentstack/storeLocator';

interface Props {
  entry: StoreHomePageEntry;
}

export default function StoreHomePage({ entry }: Props) {
  return (
    <>

      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
      </ul>

      <h1>{entry.title}</h1>

      <ul>
        {entry.countries.map((country) => (
          <li key={country.uid}>
            <Link href={country.url}>{country.title}</Link>
          </li>
        ))}
      </ul>

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
