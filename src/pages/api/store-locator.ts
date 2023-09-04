import type { NextApiRequest, NextApiResponse } from 'next';

import { queryStoreCountryPageEntry } from '@/contentstack/storeLocator';
import { calculateDistance } from '@/storeLocator/calculateDistance';

export interface Store {
  coordinates: {
    latitude: string;
    longitude: string;
  };
  distance?: number;
  title: string;
  uid: string;
  url: string;
}

interface Response {
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
  const maxDistance = parseFloat(process.env.STORE_LOCATOR_MAX_DISTANCE as string);
  const url = req.query.url as string;

  const entry = await queryStoreCountryPageEntry(url);

  if (!entry) {
    return res.status(404).send('Not Found');
  }

  const stores: Store[] = [];

  entry.localities.forEach((locality) => {
    locality.stores.forEach((store) => {
      const storeLatitude = parseFloat(store.coordinates.latitude);
      const storeLongitude = parseFloat(store.coordinates.longitude);
      const distance = calculateDistance(latitude, longitude, storeLatitude, storeLongitude);

      if (distance < maxDistance) {
        stores.push({
          coordinates: store.coordinates,
          distance,
          title: store.title,
          uid: store.uid,
          url: store.url,
        });
      }
    });
  });

  res.status(200).json({ address, latitude, longitude, maxDistance, stores, url });
};
