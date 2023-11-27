import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { StoreDetailPageEntry, queryStoreDetailPageEntries } from '@/contentstack/storeLocator';
import { Map } from '@/storeLocator/components/Map';
import { Seo } from '@/storeLocator/components/Seo';
import { StoreDetailBlocks } from '@/storeLocator/components/StoreDetail/StoreDetailBlocks';
import { StoreDetailHero } from '@/storeLocator/components/StoreDetail/StoreDetailHero';
import { StoreDetailNearbyStoresList } from '@/storeLocator/components/StoreDetail/StoreDetailNearbyStoresList';
import { Store } from '@/storeLocator/interfaces';
import { filterStoresByDistance } from '@/storeLocator/utils/filterStoresByDistance';

import styles from './styles.module.css';

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
      <nav>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/store-locator'>Store Locator</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.container}>
        <div className={styles.left}>
          <StoreDetailHero storeDetailPageEntry={entry} />
        </div>
        <div className={styles.right}>
          <Map markers={markers} />
        </div>
        <div className={styles.bottom}>
          <StoreDetailBlocks storeDetailPageEntryBlocks={entry.blocks} />
          <StoreDetailNearbyStoresList stores={nearbyStores} />
        </div>
      </div>
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
