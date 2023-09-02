import type { GetServerSideProps } from 'next';

import { StoreLocalityPageEntry, queryStoreLocalityPageEntry } from '@/contentstack/storeLocator';

interface Props {
  entry: StoreLocalityPageEntry;
}

export default function StoreLocalityPage(props: Props) {
  return (
    <>
      <h1>{props.entry.title}</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const entry = await queryStoreLocalityPageEntry(context.resolvedUrl);

  if (!entry) {
    return { notFound: true };
  }

  return {
    props: { entry },
  };
}
