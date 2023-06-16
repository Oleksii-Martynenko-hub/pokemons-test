import { createSlice } from '@reduxjs/toolkit';

import { ErrorObject } from 'src/api/ErrorHandler';
import { APIStatus, IPokemonDetailsDataResponse } from 'src/api/MainApi';

import { pendingCase, rejectedCase } from 'src/store';
import { getPokemonDataAsync } from 'src/store/pokemon/actions';

export interface IPokemon {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
  details: IPokemonDetailsDataResponse | null;
}

export interface PokemonState {
  pokemonData: { [key in string]: IPokemon } | null;
  nextPartOfDataUrl: string | null;
  total: number;
  status: APIStatus;
  errors: ErrorObject[];
}

const initialState: PokemonState = {
  pokemonData: null,
  nextPartOfDataUrl: null,
  total: 0,
  status: APIStatus.IDLE,
  errors: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonStatus: (state, action: { payload: APIStatus }) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemonDataAsync.pending, pendingCase());
    builder.addCase(getPokemonDataAsync.rejected, rejectedCase());
    builder.addCase(getPokemonDataAsync.fulfilled, (state, { payload }) => {
      state.pokemonData = payload.pokemonData;
      state.nextPartOfDataUrl = payload.nextPartOfDataUrl;
      state.total = payload.total;

      state.status = APIStatus.FULFILLED;
    });
  },
});

export const { setPokemonStatus } = pokemonSlice.actions;

export default pokemonSlice.reducer;
