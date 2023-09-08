import Link from 'next/link';

import { StoreLocalityPageEntry } from '@/contentstack/storeLocator';

interface Props {
  storeLocalityPageEntries: StoreLocalityPageEntry[];
}

export const LocalitiesList = ({ storeLocalityPageEntries }: Props) => (
  <ul>
    {storeLocalityPageEntries.map((locality) => (
      <li key={locality.uid}>
        <Link href={locality.url}>{locality.title}</Link>
      </li>
    ))}
  </ul>
);
