import { Response } from '@/pages/api/store-locator';

export type { Response as SearchStoresResponse } from '@/pages/api/store-locator';

export const searchStores = async (
  address: string,
  latitude: number,
  longitude: number,
  url: string,
): Promise<Response> => {
  const response = await fetch('/api/store-locator?' + new URLSearchParams({
    address,
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    url: url,
  }));

  return response.json();
};
