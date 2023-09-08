import { StoreDetailPageEntry } from '@/contentstack/storeLocator';

interface Props {
  storeDetailPageEntry: StoreDetailPageEntry;
}

export const StoreDetailHero = ({ storeDetailPageEntry }: Props) => (
  <div style={{ backgroundColor: storeDetailPageEntry.brand_color }}>

    <h1>{storeDetailPageEntry.title}</h1>

    {storeDetailPageEntry.address && (
      <>
        <h3>Address</h3>
        <address style={{ whiteSpace: 'pre-wrap' }}>
          {storeDetailPageEntry.address}
        </address>
      </>
    )}

    {storeDetailPageEntry.primary_phone && (
      <>
        <h3>Phone</h3>
        <a href={`tel:${storeDetailPageEntry.primary_phone}`}>{storeDetailPageEntry.primary_phone}</a>
      </>
    )}

  </div>
);
