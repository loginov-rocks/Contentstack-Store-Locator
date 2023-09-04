import { Stack } from './';

interface SeoGlobalField {
  meta_title: string;
  meta_description: string;
  keywords: string;
  enable_search_indexing: boolean;
}

interface ContentstackEntry {
  uid: string;
}

export interface StoreDetailPageEntry extends ContentstackEntry {
  coordinates: {
    latitude: string;
    longitude: string;
  };
  seo: SeoGlobalField;
  title: string;
  url: string;
}

export interface StoreLocalityPageEntry extends ContentstackEntry {
  seo: SeoGlobalField;
  stores: StoreDetailPageEntry[];
  title: string;
  url: string;
}

export interface StoreCountryPageEntry extends ContentstackEntry {
  country_code: string;
  localities: StoreLocalityPageEntry[];
  seo: SeoGlobalField;
  title: string;
  url: string;
}

type Entry = StoreCountryPageEntry | StoreLocalityPageEntry | StoreDetailPageEntry;

const buildQuery = (contentType: string, references: string[] | void = undefined) => {
  const query = Stack.ContentType(contentType).Query();

  if (references) {
    query.includeReference(references);
  }

  query.toJSON();

  return query;
}

const queryEntries = async (contentType: string, references: string[] | void = undefined): Promise<Entry[]> => {
  const entries = await buildQuery(contentType, references).find();

  return entries[0];
}

const queryEntry = async (contentType: string, url: string, references: string[] | void = undefined): Promise<Entry> => {
  const entries = await buildQuery(contentType, references).where('url', url).find();

  return entries[0][0];
}

export const queryStoreCountryPageEntries = async (): Promise<StoreCountryPageEntry[]> => {
  const entries = await queryEntries('store_country_page');

  return entries as StoreCountryPageEntry[];
}

export const queryStoreCountryPageEntry = async (url: string): Promise<StoreCountryPageEntry> => {
  const entry = await queryEntry('store_country_page', url, [
    'localities',
    'localities.stores',
  ]);

  return entry as StoreCountryPageEntry;
}

export const queryStoreLocalityPageEntry = async (url: string): Promise<StoreLocalityPageEntry> => {
  const entry = await queryEntry('store_locality_page', url, [
    'stores',
  ]);

  return entry as StoreLocalityPageEntry;
}

export const queryStoreDetailPageEntry = async (url: string): Promise<StoreDetailPageEntry> => {
  const entry = await queryEntry('store_detail_page', url);

  return entry as StoreDetailPageEntry;
}
