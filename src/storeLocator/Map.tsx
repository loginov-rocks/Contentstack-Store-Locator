import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  markers: Array<{
    latitude: number;
    longitude: number;
  }>;
  onLoad?: () => void;
}

export const Map = ({ markers, onLoad }: Props) => {
  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (markers.length === 0 || map === null) {
      return;
    }

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
  }, [markers, map]);

  const handleLoad = useCallback((map: google.maps.Map) => {
    setMap(map);

    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  const handleUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '600px' }}
      mapTypeId={window.google.maps.MapTypeId.ROADMAP}
      onLoad={handleLoad}
      onUnmount={handleUnmount}
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
