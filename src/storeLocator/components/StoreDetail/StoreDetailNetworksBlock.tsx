import { StoreDetailPageEntryNetworksBlock } from '@/contentstack/storeLocator';

interface Props {
  block: StoreDetailPageEntryNetworksBlock;
}

export const StoreDetailNetworksBlock = ({ block }: Props) => (
  <section>
    <h2>Networks</h2>
    <ul>
      {block.networks.links.map(({ href, title }, index) => (
        <li key={index}><a href={href} rel='noopener noreferrer' target='_blank'>{title}</a></li>
      ))}
    </ul>
  </section>
);
