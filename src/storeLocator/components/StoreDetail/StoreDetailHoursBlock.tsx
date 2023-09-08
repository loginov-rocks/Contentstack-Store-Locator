import { StoreDetailPageEntryHoursBlock } from '@/contentstack/storeLocator';

interface Props {
  block: StoreDetailPageEntryHoursBlock;
}

export const StoreDetailHoursBlock = ({ block }: Props) => (
  <section>
    <h2>Hours</h2>
    <table>
      <tbody>
        {block.hours.days.map(({ day, start_time, end_time }, index) => (
          <tr key={index}>
            <th>{day}</th>
            <td>{end_time ? `${start_time} - ${end_time}` : start_time}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {block.hours.notice && (
      <div>{block.hours.notice}</div>
    )}
  </section>
);
