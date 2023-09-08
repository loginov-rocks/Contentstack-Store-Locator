export interface Store {
  address?: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  distance?: number;
  title: string;
  uid: string;
  url: string;
}
