import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import { StoreCountryPageEntry, queryStoreCountryPageEntry } from '@/contentstack/storeLocator';

interface Props {
  entry: StoreCountryPageEntry;
}

export default function StoreContryPage({ entry }: Props) {
  return (
    <>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/store-locator'>Store Locator</Link>
        </li>
      </ul>
      <h1>{entry.title}</h1>
      <ul>
        {entry.localities.map((locality) => (
          <li key={locality.uid}>
            <Link href={locality.url}>{locality.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const entry = await queryStoreCountryPageEntry(context.resolvedUrl);

  if (!entry) {
    return { notFound: true };
  }

  return {
    props: { entry },
  };
}
