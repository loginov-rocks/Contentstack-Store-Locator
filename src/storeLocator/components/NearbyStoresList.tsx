import Link from 'next/link';

import { Store } from '@/storeLocator/interfaces';

interface Props {
  stores: Store[];
}

export const NearbyStoresList = ({ stores }: Props) => {
  if (stores.length === 0) {
    return null;
  }

  return (
    <>
      <h2>Nearby Stores</h2>
      <ul>
        {stores.map((store) => {
          const distance = store.distance ? (Math.round(store.distance) / 1000).toFixed(2).toLocaleString() : null;

          return (
            <li key={store.uid}>
              <Link href={store.url}>{store.title}</Link>
              {distance && (
                <>
                  {' '}
                  <small>{distance} km</small>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};
