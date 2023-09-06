import { Store } from '@/pages/api/store-locator';
import Link from 'next/link';

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
                <small>{distance} km</small>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};
