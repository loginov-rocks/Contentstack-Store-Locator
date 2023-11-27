import Link from 'next/link';

import { Store } from '@/storeLocator/interfaces';

interface Props {
  stores: Store[];
}

export const StoresList = ({ stores }: Props) => {
  return (
    <ul>
      {stores.map((store) => {
        const distance = store.distance ? (Math.round(store.distance) / 1000).toFixed(2).toLocaleString() : null;

        return (
          <li key={store.uid}>
            <Link href={store.url}>{store.title}</Link>
            {distance && (
              <>
                {' '}
                <b>{distance} km</b>
              </>
            )}
            {store.address && (
              <>
                <br />
                {store.address}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};
