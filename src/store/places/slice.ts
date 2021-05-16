import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';

import Place from '@app/models/Place';
import { insertPlace, getPlaces } from '@app/utils/db';

interface State {
  places: Place[];
}

const initialState: State = {
  places: [],
};

interface AddPlacePayload {
  place: Omit<Place, 'id'>;
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
    try {
      const placeId = await insertPlace({ ...place, imageUri });
      return { ...place, imageUri, id: placeId };
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const loadPlaces = createAsyncThunk(
  'places/loadPlaces',
  async (): Promise<Place[]> => getPlaces()
);

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
