import { Stack } from './';

export interface SeoGlobalField {
  meta_title: string;
  meta_description: string;
  keywords: string;
  enable_search_indexing: boolean;
}

interface ContentstackEntry {
  uid: string;
}

export interface StoreDetailPageEntryAboutBlock {
  about: {
    // JSON Rich Text Editor.
    // TODO: Correct type.
    about: unknown;
  };
}

export interface StoreDetailPageEntryFacilitiesBlock {
  facilities: {
    // Single Line Textbox, multiple.
    facilities: string[];
  };
}

export interface StoreDetailPageEntryHoursBlock {
  hours: {
    // Group, multiple.
    days: Array<{
      // Single Line Textbox.
      day: string;
      // Single Line Textbox.
      start_time: string;
      // Single Line Textbox, optional.
      end_time?: string;
    }>;
    // Single Line Textbox, optional.
    notice?: string;
  };
}

export interface StoreDetailPageEntryNetworksBlock {
  networks: {
    // Link, multiple.
    links: Array<{
      title: string;
      href: string;
    }>;
  };
}

export type StoreDetailPageEntryBlock = StoreDetailPageEntryAboutBlock | StoreDetailPageEntryFacilitiesBlock
  | StoreDetailPageEntryHoursBlock | StoreDetailPageEntryNetworksBlock;

export interface StoreDetailPageEntry extends ContentstackEntry {
  // Multi Line Textbox, optional.
  address?: string;
  // Modular Blocks.
  blocks: StoreDetailPageEntryBlock[];
  // Custom, optional.
  brand_color?: string
  // Group.
  coordinates: {
    // Single Line Textbox.
    latitude: string;
    // Single Line Textbox.
    longitude: string;
  };
  // Single Line Textbox, optional.
  primary_phone?: string;
  // Global.
  seo: SeoGlobalField;
  // Default Title.
  title: string;
  // Default URL.
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

export interface StoreHomePageEntry extends ContentstackEntry {
  countries: StoreCountryPageEntry[];
  seo: SeoGlobalField;
  title: string;
  url: string;
}

type Entry = StoreHomePageEntry | StoreCountryPageEntry | StoreLocalityPageEntry | StoreDetailPageEntry;

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

export const queryStoreHomePageEntry = async (url: string): Promise<StoreHomePageEntry> => {
  const entry = await queryEntry('store_home_page', url, [
    'countries',
  ]);

  return entry as StoreHomePageEntry;
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

export const queryStoreDetailPageEntries = async (): Promise<StoreDetailPageEntry[]> => {
  const entries = await queryEntries('store_detail_page');

  return entries as StoreDetailPageEntry[];
}

export const queryStoreDetailPageEntry = async (url: string): Promise<StoreDetailPageEntry> => {
  const entry = await queryEntry('store_detail_page', url);

  return entry as StoreDetailPageEntry;
}
