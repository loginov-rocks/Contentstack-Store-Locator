import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { StoreDetailPageEntry, queryStoreDetailPageEntries } from '@/contentstack/storeLocator';
import { Map } from '@/storeLocator/components/Map';
import { NearbyStoresList } from '@/storeLocator/components/NearbyStoresList';
import { Seo } from '@/storeLocator/components/Seo';
import { Store } from '@/storeLocator/interfaces';
import { filterStoresByDistance } from '@/storeLocator/utils/filterStoresByDistance';

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

      <Head>
        <Seo seo={entry.seo} />
      </Head>

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
  // The first candidate for cache/optimization because fetches all store detail page entries.
  // Consider whether the nearby stores feature is required in your use case.
  const allEntries = await queryStoreDetailPageEntries();

  // const entry = await queryStoreDetailPageEntry(context.resolvedUrl);
  const entry = allEntries.find((_entry) => _entry.url === context.resolvedUrl);

  if (!entry) {
    return { notFound: true };
  }

  const storeLatitude = parseFloat(entry.coordinates.latitude);
  const storeLongitude = parseFloat(entry.coordinates.longitude);
  const maxDistance = parseInt(process.env.STORE_LOCATOR_NEARBY_MAX_DISTANCE as string, 10);

  const nearbyStores: Store[] = filterStoresByDistance(allEntries, storeLatitude, storeLongitude, maxDistance)
    .filter((_entry) => _entry.uid !== entry.uid);

  return {
    props: { entry, nearbyStores },
  };
}
