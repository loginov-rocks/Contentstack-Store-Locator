import type { GetServerSideProps } from 'next';

import { StoreDetailPageEntry, queryStoreDetailPageEntry } from '@/contentstack/storeLocator';

interface Props {
  entry: StoreDetailPageEntry;
}

export default function StoreDetailPage(props: Props) {
  return (
    <>
      <h1>{props.entry.title}</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const entry = await queryStoreDetailPageEntry(context.resolvedUrl);

  if (!entry) {
    return { notFound: true };
  }

  return {
    props: { entry },
  };
}
