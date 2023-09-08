import { SeoGlobalField } from '@/contentstack/storeLocator';

interface Props {
  seo: SeoGlobalField;
}

export const Seo = ({ seo }: Props) => (
  <>
    <title>{seo.meta_title}</title>
    <meta name='description' content={seo.meta_description} />
    <meta name='keywords' content={seo.keywords} />
    {!seo.enable_search_indexing && (
      <meta name='robots' content='noindex, nofollow' />
    )}
  </>
);
