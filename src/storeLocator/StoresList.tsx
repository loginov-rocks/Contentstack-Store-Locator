import { Store } from '@/pages/api/store-locator';
import Link from 'next/link';

interface Props {
  stores: Store[];
}

export const StoresList = ({ stores }: Props) => {
  return (
    <ul>
      {stores.map((store) => (
        <li key={store.uid}>
          <Link href={store.url}>{store.title}</Link>
        </li>
      ))}
    </ul>
  );
};
