import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { StoreLocalityPageEntry, queryStoreLocalityPageEntry } from '@/contentstack/storeLocator';
import { Map } from '@/storeLocator/components/Map';
import { Seo } from '@/storeLocator/components/Seo';
import { StoresList } from '@/storeLocator/components/StoresList';

import styles from './styles.module.css';

interface Props {
  entry: StoreLocalityPageEntry;
}

export default function StoreLocalityPage({ entry }: Props) {
  const markers: Array<{ latitude: number; longitude: number; }> = [];
  entry.stores.forEach((store) => {
    markers.push({
      latitude: parseFloat(store.coordinates.latitude),
      longitude: parseFloat(store.coordinates.longitude),
    });
  });

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
          <h1>{entry.title}</h1>
          <StoresList stores={entry.stores} />
        </div>
        <div className={styles.right}>
          <Map markers={markers} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const entry = await queryStoreLocalityPageEntry(context.resolvedUrl);

  if (!entry) {
    return { notFound: true };
  }

  // Automatically redirect to the store page if it's the only one within this locality.
  if (entry.stores.length === 1) {
    return {
      redirect: {
        destination: entry.stores[0].url,
        permanent: true,
      }
    }
  }

  return {
    props: { entry },
  };
}
