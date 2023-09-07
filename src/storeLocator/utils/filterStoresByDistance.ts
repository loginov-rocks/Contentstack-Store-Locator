import { StoreDetailPageEntry } from '@/contentstack/storeLocator';
import { Store } from '@/storeLocator/interfaces';

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const lat1Angle = (lat1 * Math.PI) / 180;
  const lon1Angle = (lon1 * Math.PI) / 180;
  const lat2Angle = (lat2 * Math.PI) / 180;
  const lon2Angle = (lon2 * Math.PI) / 180;

  const cosLat1 = Math.cos(lat1Angle);
  const sinLat1 = Math.sin(lat1Angle);

  const cosLat2 = Math.cos(lat2Angle);
  const sinLat2 = Math.sin(lat2Angle);

  const delta = lon2Angle - lon1Angle;
  const cosDelta = Math.cos(delta);
  const sinDelta = Math.sin(delta);

  const y = Math.sqrt(((cosLat2 * sinDelta) ** 2) + ((cosLat1 * sinLat2 - sinLat1 * cosLat2 * cosDelta) ** 2));
  const x = sinLat1 * sinLat2 + cosLat1 * cosLat2 * cosDelta;

  const atan2 = Math.atan2(y, x);

  return atan2 * 6372795;
};

export const filterStoresByDistance = (
  storeDetailPageEntries: StoreDetailPageEntry[],
  latitude: number,
  longitude: number,
  maxDistance: number,
): Store[] => {
  const stores: Store[] = [];

  storeDetailPageEntries.forEach((storeDetailPageEntry) => {
    const storeLatitude = parseFloat(storeDetailPageEntry.coordinates.latitude);
    const storeLongitude = parseFloat(storeDetailPageEntry.coordinates.longitude);
    const distance = calculateDistance(latitude, longitude, storeLatitude, storeLongitude);

    if (distance < maxDistance) {
      stores.push({
        coordinates: storeDetailPageEntry.coordinates,
        distance,
        title: storeDetailPageEntry.title,
        uid: storeDetailPageEntry.uid,
        url: storeDetailPageEntry.url,
      });
    }
  });

  return stores;
};
