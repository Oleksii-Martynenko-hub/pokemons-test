import { createSlice } from '@reduxjs/toolkit';

import { ErrorObject } from 'src/api/ErrorHandler';
import { APIStatus, IPokemonDetailsDataResponse } from 'src/api/MainApi';

import { pendingCase, rejectedCase } from 'src/store';
import {
  getPokemonByIdAsync,
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
  pokemonData: { [key in string]: IPokemon } | null;
  nextPartOfDataUrl: string | null;
  total: number;
  status: APIStatus;
  statusPokemonDetails: APIStatus;
  errors: ErrorObject[];
}

const initialState: PokemonState = {
  pokemonData: null,
  nextPartOfDataUrl: null,
  total: 0,
  status: APIStatus.IDLE,
  statusPokemonDetails: APIStatus.IDLE,
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

    builder.addCase(getPokemonByIdAsync.pending, (state) => {
      state.statusPokemonDetails = APIStatus.PENDING;
    });
    builder.addCase(getPokemonByIdAsync.rejected, (state) => {
      state.statusPokemonDetails = APIStatus.REJECTED;
    });
    builder.addCase(getPokemonByIdAsync.fulfilled, (state, { payload }) => {
      if (!state.pokemonData) {
        state.pokemonData = {
          [payload.name]: payload,
        };
        state.total = 1;
        return;
      }

      if (!state.pokemonData[payload.name]) {
        state.pokemonData[payload.name] = payload;
      }

      state.statusPokemonDetails = APIStatus.FULFILLED;
    });
  },
});

export const { setPokemonStatus } = pokemonSlice.actions;

export default pokemonSlice.reducer;
