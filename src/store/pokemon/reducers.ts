import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { ErrorObject } from 'src/api/ErrorHandler';
import { APIStatus, IPokemonDetailsDataResponse } from 'src/api/MainApi';

import { pendingCase, rejectedCase } from 'src/store';
import {
  getPokemonByNameAsync,
  getPokemonDataAsync,
} from 'src/store/pokemon/actions';

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
  statusPokemonDetails: APIStatus;
  errors: ErrorObject[];
}

const initialState: PokemonState = {
  total: 0,

  status: APIStatus.IDLE,
  statusPokemonDetails: APIStatus.IDLE,
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
    setPokemonStatus: (state, action: { payload: APIStatus }) => {
      state.status = action.payload;
    },
    addPokemonData: pokemonAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemonDataAsync.pending, pendingCase());
    builder.addCase(getPokemonDataAsync.rejected, rejectedCase());
    builder.addCase(getPokemonDataAsync.fulfilled, (state, { payload }) => {
      pokemonAdapter.addMany(state, payload.pokemonData);

      state.total = payload.total;

      state.status = APIStatus.FULFILLED;
    });

    builder.addCase(getPokemonByNameAsync.pending, (state) => {
      state.statusPokemonDetails = APIStatus.PENDING;
    });
    builder.addCase(getPokemonByNameAsync.rejected, (state) => {
      state.statusPokemonDetails = APIStatus.REJECTED;
    });
    builder.addCase(getPokemonByNameAsync.fulfilled, (state, { payload }) => {
      pokemonAdapter.upsertOne(state, payload);

      state.statusPokemonDetails = APIStatus.FULFILLED;
    });
  },
});

export const { setPokemonStatus, addPokemonData } = pokemonSlice.actions;

export default pokemonSlice.reducer;
