import { useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import styles from './SearchBox.module.css';

interface Props {
  countryCode: string;
  onClear: () => void;
  onSelect: (address: string, latitude: number, longitude: number) => void;
}

export const SearchBox = ({ countryCode, onClear, onSelect }: Props) => {
  const {
    clearSuggestions,
    ready,
    setValue,
    suggestions: { data, status },
    value,
  } = usePlacesAutocomplete({
    cache: 86400,
    debounce: 300,
    requestOptions: { componentRestrictions: { country: countryCode } },
  });

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClear = () => {
    setIsSelected(false);
    setValue('', false);
    clearSuggestions();

    onClear();
  }

  const handleInput = (event: any) => {
    setValue(event.target.value);
  };

  const handleSelect = (description: string) => async () => {
    setIsSelected(true);
    setValue(description, false);
    clearSuggestions();

    const results = await getGeocode({ address: description });
    const { lat, lng } = getLatLng(results[0]);

    onSelect(description, lat, lng);
  };

  return (
    <div className={styles.container}>
      <input
        disabled={!ready}
        onChange={handleInput}
        placeholder='Search'
        value={value}
      />
      {isSelected && (
        <input onClick={handleClear} value='Clear' type='button' />
      )}
      {status === 'OK' && (
        <ul className={styles.list}>
          {data.map((suggestion) => {
            const {
              description,
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
              <li className={styles.item} key={place_id} onClick={handleSelect(description)}>
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
