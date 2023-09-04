import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

interface Props {
  countryCode: string;
  onSelect: (address: string, latitude: number, longitude: number) => void;
}

export const SearchBox = ({ countryCode, onSelect }: Props) => {
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

  const handleInput = (event: any) => {
    setValue(event.target.value);
  };

  const handleSelect = (description: string) => async () => {
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
