import { Store } from '@/storeLocator/interfaces';
import { StoresList } from '@/storeLocator/components/StoresList';

interface Props {
  stores: Store[];
}

export const StoreDetailNearbyStoresList = ({ stores }: Props) => {
  if (stores.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>Nearby Stores</h2>
      <StoresList stores={stores} />
    </section>
  );
};
