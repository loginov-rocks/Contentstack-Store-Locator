import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import { StoreCountryPageEntry, queryStoreCountryPageEntry } from '@/contentstack/storeLocator';
import { searchStores, SearchStoresResponse } from '@/storeLocator/api';
import { Map } from '@/storeLocator/Map';
import { SearchBox } from '@/storeLocator/SearchBox';
import { StoresList } from '@/storeLocator/StoresList';

interface Props {
  entry: StoreCountryPageEntry;
}

export default function StoreContryPage({ entry }: Props) {
  const initialMarkers: Array<{ latitude: number; longitude: number; }> = [];
  entry.localities.forEach((locality) => {
    locality.stores.forEach((store) => {
      initialMarkers.push({
        latitude: parseFloat(store.coordinates.latitude),
        longitude: parseFloat(store.coordinates.longitude),
      });
    });
  });

  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [markers, setMarkers] = useState<Array<{ latitude: number; longitude: number; }>>(initialMarkers);
  const [searchStoresResponse, setSearchStoresResponse] = useState<SearchStoresResponse | null>(null);

  const handleClear = () => {
    setMarkers(initialMarkers);
    setSearchStoresResponse(null);
  }

  const handleSelect = async (address: string, latitude: number, longitude: number) => {
    const response = await searchStores(address, latitude, longitude, entry.url);
    const storesMarkers: Array<{ latitude: number; longitude: number; }> = [];

    response.stores.forEach((store) => {
      storesMarkers.push({
        latitude: parseFloat(store.coordinates.latitude),
        longitude: parseFloat(store.coordinates.longitude),
      });
    });

    setMarkers(storesMarkers);
    setSearchStoresResponse(response);
  };

  const renderSearchStores = () => {
    if (searchStoresResponse === null) {
      return null;
    }

    const distance = Math.round(searchStoresResponse.maxDistance / 1000).toLocaleString();

    if (searchStoresResponse.stores.length === 0) {
      return <div>Sorry, no stores within {distance} km area of your location.</div>;
    }

    return (
      <>
        <div>Stores within {distance} km area of your location.</div>
        <StoresList stores={searchStoresResponse.stores} />
      </>
    );
  }

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

      {isMapLoaded && (
        <SearchBox countryCode={entry.country_code} onClear={handleClear} onSelect={handleSelect} />
      )}

      {searchStoresResponse === null ? (
        <ul>
          {entry.localities.map((locality) => (
            <li key={locality.uid}>
              <Link href={locality.url}>{locality.title}</Link>
            </li>
          ))}
        </ul>
      ) : renderSearchStores()}

      <Map markers={markers} onLoad={() => setIsMapLoaded(true)} />

    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const entry = await queryStoreCountryPageEntry(context.resolvedUrl);

  if (!entry) {
    return { notFound: true };
  }

  return {
    props: { entry },
  };
}
