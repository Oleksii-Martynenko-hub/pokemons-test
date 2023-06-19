import { createSlice } from '@reduxjs/toolkit';

import { ErrorObject } from 'src/api/ErrorHandler';
import { APIStatus } from 'src/api/MainApi';

import { pendingCase, rejectedCase } from 'src/store';
import { getPokemonByNameAsync } from 'src/store/pokemon-details/actions';

export interface PokemonDetailsState {
  status: APIStatus;
  errors: ErrorObject[];
}

const initialState: PokemonDetailsState = {
  status: APIStatus.IDLE,
  errors: [],
};

export const pokemonDetailsSlice = createSlice({
  name: 'pokemon-details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPokemonByNameAsync.pending, pendingCase());
    builder.addCase(getPokemonByNameAsync.rejected, rejectedCase());
    builder.addCase(getPokemonByNameAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED;
    });
  },
});

export default pokemonDetailsSlice.reducer;
