import type { NextApiRequest, NextApiResponse } from 'next';

import { StoreDetailPageEntry, queryStoreCountryPageEntry } from '@/contentstack/storeLocator';
import { Store } from '@/storeLocator/interfaces';
import { filterStoresByDistance } from '@/storeLocator/utils/filterStoresByDistance';

export interface Response {
  address: string;
  latitude: number;
  longitude: number;
  maxDistance: number;
  stores: Store[];
  url: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<string | Response>) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  if (!req.query || !req.query.address || !req.query.latitude || !req.query.longitude || !req.query.url) {
    return res.status(400).send('Bad Request');
  }

  const address = req.query.address as string;
  const latitude = parseFloat(req.query.latitude as string);
  const longitude = parseFloat(req.query.longitude as string);
  const maxDistance = parseInt(process.env.STORE_LOCATOR_SEARCH_MAX_DISTANCE as string, 10);
  const url = req.query.url as string;

  const storeCountrPageEntry = await queryStoreCountryPageEntry(url);

  if (!storeCountrPageEntry) {
    return res.status(404).send('Not Found');
  }

  const storeDetailPageEntries: StoreDetailPageEntry[] = [];

  storeCountrPageEntry.localities.forEach((storeLocalityPageEntry) => {
    storeLocalityPageEntry.stores.forEach((storeDetailPageEntry) => {
      storeDetailPageEntries.push(storeDetailPageEntry);
    });
  });

  const stores = filterStoresByDistance(storeDetailPageEntries, latitude, longitude, maxDistance);

  res.status(200).json({ address, latitude, longitude, maxDistance, stores, url });
};
