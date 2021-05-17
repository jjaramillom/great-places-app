import { LatLng } from 'react-native-maps';

export default interface Place {
  id: string;
  title: string;
  address?: string;
  imageUri?: string;
  coordinates?: LatLng;
}
