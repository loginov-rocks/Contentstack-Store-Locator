import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import { StoreDetailPageEntry, queryStoreDetailPageEntry } from '@/contentstack/storeLocator';
import { Map } from '@/storeLocator/Map';

interface Props {
  entry: StoreDetailPageEntry;
}

export default function StoreDetailPage({ entry }: Props) {
  const markers: Array<{ latitude: number; longitude: number; }> = [
    {
      latitude: parseFloat(entry.coordinates.latitude),
      longitude: parseFloat(entry.coordinates.longitude),
    }
  ];

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
      <Map markers={markers} />
      <pre>{JSON.stringify(entry, null, 2)}</pre>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const entry = await queryStoreDetailPageEntry(context.resolvedUrl);

  if (!entry) {
    return { notFound: true };
  }

  return {
    props: { entry },
  };
}
