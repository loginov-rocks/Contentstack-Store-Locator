import Link from 'next/link';

import { StoreCountryPageEntry } from '@/contentstack/storeLocator';

interface Props {
  storeCountryPageEntries: StoreCountryPageEntry[];
}

export const CountriesList = ({ storeCountryPageEntries }: Props) => (
  <ul>
    {storeCountryPageEntries.map((country) => (
      <li key={country.uid}>
        <Link href={country.url}>{country.title}</Link>
      </li>
    ))}
  </ul>
);
