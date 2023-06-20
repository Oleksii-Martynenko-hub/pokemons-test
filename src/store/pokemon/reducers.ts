import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { ErrorObject } from 'src/api/ErrorHandler';
import { APIStatus, IPokemonDetailsDataResponse } from 'src/api/MainApi';

import { pendingCase, rejectedCase } from 'src/store';
import { getPokemonDataAsync } from 'src/store/pokemon/actions';

export interface IPokemon {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
  details: Omit<IPokemonDetailsDataResponse, 'id' | 'name'> | null;
}

export interface PokemonState {
  total: number;

  status: APIStatus;
  errors: ErrorObject[];
}

const initialState: PokemonState = {
  total: 0,

  status: APIStatus.IDLE,
  errors: [],
};

export const pokemonAdapter = createEntityAdapter<IPokemon>({
  selectId: (pokemon) => pokemon.name,
  sortComparer: (a, b) => +a.id - +b.id,
});

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: pokemonAdapter.getInitialState(initialState),
  reducers: {
    upsertPokemon: pokemonAdapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemonDataAsync.pending, pendingCase());
    builder.addCase(getPokemonDataAsync.rejected, rejectedCase());
    builder.addCase(getPokemonDataAsync.fulfilled, (state, { payload }) => {
      pokemonAdapter.addMany(state, payload.pokemonData);

      state.total = payload.total;

      state.status = APIStatus.FULFILLED;
    });
  },
});

export const { upsertPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
