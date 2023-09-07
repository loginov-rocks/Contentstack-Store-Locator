export interface Store {
  coordinates: {
    latitude: string;
    longitude: string;
  };
  distance?: number;
  title: string;
  uid: string;
  url: string;
}
