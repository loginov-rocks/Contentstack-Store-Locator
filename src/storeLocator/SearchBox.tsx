import { useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

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
    <div>
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
        <ul>
          {data.map((suggestion) => {
            const {
              description,
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
              <li key={place_id} onClick={handleSelect(description)}>
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
