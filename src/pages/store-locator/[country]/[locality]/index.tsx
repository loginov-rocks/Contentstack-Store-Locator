import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import { StoreLocalityPageEntry, queryStoreLocalityPageEntry } from '@/contentstack/storeLocator';

interface Props {
  entry: StoreLocalityPageEntry;
}

export default function StoreLocalityPage({ entry }: Props) {
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
        {entry.stores.map((store) => (
          <li key={store.uid}>
            <Link href={store.url}>{store.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const entry = await queryStoreLocalityPageEntry(context.resolvedUrl);

  if (!entry) {
    return { notFound: true };
  }

  return {
    props: { entry },
  };
}
