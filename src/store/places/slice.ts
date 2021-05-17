// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_KEY } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';
import { LatLng } from 'react-native-maps';

import Place from '@app/models/Place';
import { insertPlace, getAllPlaces } from '@app/utils/db';

const getAddressUrl = ({ latitude, longitude }: LatLng) =>
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}`;

interface State {
  places: Place[];
}

const initialState: State = {
  places: [],
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NewPlace extends Omit<Place, 'id'> {}

interface AddPlacePayload {
  place: NewPlace;
}

export const addPlace = createAsyncThunk(
  'places/addPlace',
  async ({ place }: AddPlacePayload): Promise<Place> => {
    let imageUri: string | undefined = place.imageUri;
    if (place.imageUri) {
      const fileName = place.imageUri?.split('/').pop() as string;
      const newPath = FileSystem.documentDirectory + fileName;
      try {
        await FileSystem.moveAsync({ from: place.imageUri, to: newPath });

        imageUri = newPath;
      } catch (error) {
        throw new Error(error);
      }
    }
    let address: string | undefined;
    if (place.coordinates) {
      const resp = await fetch(getAddressUrl(place.coordinates));
      if (resp.ok) {
        address = (await resp.json()).results?.[0].formatted_address;
      }
    }
    const newPlace: NewPlace = { ...place, imageUri, address };
    try {
      const placeId = await insertPlace(newPlace);
      return { ...newPlace, id: placeId };
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const loadPlaces = createAsyncThunk('places/loadPlaces', async (): Promise<Place[]> => {
  return getAllPlaces();
});

const authSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPlace.fulfilled, (state, action) => {
        state.places.push(action.payload);
      })
      .addCase(loadPlaces.fulfilled, (state, action) => {
        state.places = action.payload;
      });
  },
});

export default authSlice.reducer;
