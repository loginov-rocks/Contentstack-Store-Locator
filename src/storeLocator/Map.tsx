import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useCallback } from 'react';

interface Props {
  markers: Array<{
    latitude: number;
    longitude: number;
  }>;
}

export const Map = ({ markers }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    if (markers.length === 1) {
      // Center to single marker.
      const { latitude, longitude } = markers[0];
      map.setCenter({ lat: latitude, lng: longitude });
      map.setZoom(15);
    } else {
      // Fit all markers.
      const bounds = new window.google.maps.LatLngBounds();

      markers.forEach(({ latitude, longitude }) => {
        bounds.extend({ lat: latitude, lng: longitude });
      });

      map.fitBounds(bounds);
    }
  }, [markers]);

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '600px' }}
      mapTypeId={window.google.maps.MapTypeId.ROADMAP}
      onLoad={onLoad}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      {markers.map(({ latitude, longitude }, index) => (
        <MarkerF key={index} position={{ lat: latitude, lng: longitude }} />
      ))}
    </GoogleMap>
  );
};
