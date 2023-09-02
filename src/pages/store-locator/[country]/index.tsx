import type { GetServerSideProps } from 'next';

import { StoreCountryPageEntry, queryStoreCountryPageEntry } from '@/contentstack/storeLocator';

interface Props {
  entry: StoreCountryPageEntry;
}

export default function StoreContryPage(props: Props) {
  return (
    <>
      <h1>{props.entry.title}</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
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
