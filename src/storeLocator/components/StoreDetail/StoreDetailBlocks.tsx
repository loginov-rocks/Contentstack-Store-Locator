import { StoreDetailPageEntryBlock } from '@/contentstack/storeLocator';

import { StoreDetailAboutBlock } from './StoreDetailAboutBlock';
import { StoreDetailFacilitiesBlock } from './StoreDetailFacilitiesBlock';
import { StoreDetailHoursBlock } from './StoreDetailHoursBlock';
import { StoreDetailNetworksBlock } from './StoreDetailNetworksBlock';

interface Props {
  storeDetailPageEntryBlocks: StoreDetailPageEntryBlock[];
}

export const StoreDetailBlocks = ({ storeDetailPageEntryBlocks }: Props) => {
  return storeDetailPageEntryBlocks.map((block, index) => {
    let Component = null;

    if (block.hasOwnProperty('about')) {
      Component = StoreDetailAboutBlock;
    } else if (block.hasOwnProperty('facilities')) {
      Component = StoreDetailFacilitiesBlock;
    } else if (block.hasOwnProperty('hours')) {
      Component = StoreDetailHoursBlock;
    } else if (block.hasOwnProperty('networks')) {
      Component = StoreDetailNetworksBlock;
    }

    if (Component === null) {
      console.warn('Uknown block:', JSON.stringify(block));

      return null;
    }

    return <Component block={block as any} key={index} />;
  });
}
