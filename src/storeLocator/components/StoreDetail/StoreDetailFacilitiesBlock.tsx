import { StoreDetailPageEntryFacilitiesBlock } from '@/contentstack/storeLocator';

interface Props {
  block: StoreDetailPageEntryFacilitiesBlock;
}

export const StoreDetailFacilitiesBlock = ({ block }: Props) => (
  <section>
    <h2>Facilities</h2>
    <ul>
      {block.facilities.facilities.map((facility, index) => (
        <li key={index}>{facility}</li>
      ))}
    </ul>
  </section>
);
