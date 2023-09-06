import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import { StoreCountryPageEntry, queryStoreCountryPageEntries } from '@/contentstack/storeLocator';

interface Props {
  entries: StoreCountryPageEntry[];
}

export default function StoreHomePage({ entries }: Props) {
  return (
    <>

      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
      </ul>

      <h1>Store Locator</h1>

      <ul>
        {entries.map((entry) => (
          <li key={entry.uid}>
            <Link href={entry.url}>{entry.title}</Link>
          </li>
        ))}
      </ul>

    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const entries = await queryStoreCountryPageEntries();

  if (!entries) {
    return { notFound: true };
  }

  return {
    props: { entries },
  };
}
