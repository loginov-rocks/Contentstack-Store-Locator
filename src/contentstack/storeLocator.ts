import { Stack } from './';

interface SeoGlobalField {
  meta_title: string;
  meta_description: string;
  keywords: string;
  enable_search_indexing: boolean;
}

export interface StoreCountryPageEntry {
  seo: SeoGlobalField;
  title: string;
  url: string;
}

export interface StoreLocalityPageEntry {
  seo: SeoGlobalField;
  title: string;
  url: string;
}

export interface StoreDetailPageEntry {
  seo: SeoGlobalField;
  title: string;
  url: string;
}

type Entry = StoreCountryPageEntry | StoreLocalityPageEntry | StoreDetailPageEntry;

const queryEntry = async (contentType: string, url: string, references: string[] | void = undefined): Promise<Entry> => {
  const query = Stack.ContentType(contentType).Query();

  if (references) {
    query.includeReference(references);
  }

  query.toJSON();

  const entries = await query.where('url', url).find();

  return entries[0][0];
}

export const queryStoreCountryPageEntry = (url: string): Promise<StoreCountryPageEntry> => {
  return queryEntry('store_country_page', url);
}

export const queryStoreLocalityPageEntry = (url: string): Promise<StoreLocalityPageEntry> => {
  return queryEntry('store_locality_page', url);
}

export const queryStoreDetailPageEntry = (url: string): Promise<StoreDetailPageEntry> => {
  return queryEntry('store_detail_page', url);
}
