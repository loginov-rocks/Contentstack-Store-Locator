import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import { StoreDetailPageEntry, queryStoreDetailPageEntry } from '@/contentstack/storeLocator';
import { Map } from '@/storeLocator/components/Map';
import { NearbyStoresList } from '@/storeLocator/components/NearbyStoresList';
import { Store } from '@/storeLocator/interfaces';

interface Props {
  entry: StoreDetailPageEntry;
  nearbyStores: Store[];
}

export default function StoreDetailPage({ entry, nearbyStores }: Props) {
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

      <NearbyStoresList stores={nearbyStores} />

      <pre>{JSON.stringify(entry, null, 2)}</pre>

    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const entry = await queryStoreDetailPageEntry(context.resolvedUrl);

  if (!entry) {
    return { notFound: true };
  }

  const nearbyStores: Store[] = [];

  return {
    props: { entry, nearbyStores },
  };
}
