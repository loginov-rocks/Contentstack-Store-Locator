import { jsonToHtml } from '@contentstack/json-rte-serializer';
import parse from 'html-react-parser';

import { StoreDetailPageEntryAboutBlock } from '@/contentstack/storeLocator';

interface Props {
  block: StoreDetailPageEntryAboutBlock;
}

export const StoreDetailAboutBlock = ({ block }: Props) => {
  return (
    <section>
      <h2>About</h2>
      {parse(jsonToHtml(block.about.about))}
    </section>
  );
};
