import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Place from '@app/models/Place';

interface State {
  places: Place[];
}

const initialState: State = {
  places: [],
};

interface AddPlacePayload {
  place: Omit<Place, 'id'>;
}

const authSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addPlace: (state, { payload }: PayloadAction<AddPlacePayload>) => {
      state.places.push({ ...payload.place, id: new Date().toString() });
    },
  },
});

export const { addPlace } = authSlice.actions;

export default authSlice.reducer;
