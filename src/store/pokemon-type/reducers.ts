import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { ErrorObject } from 'src/api/ErrorHandler';
import { APIStatus } from 'src/api/MainApi';

import { pendingCase, rejectedCase } from 'src/store';
import { getPokemonTypesAsync } from 'src/store/pokemon-type/actions';

export interface IPokemonType {
  id: string;
  name: string;
  details: { pokemonList: string[] } | null;
}

export interface PokemonTypeState {
  total: number;

  status: APIStatus;
  errors: ErrorObject[];
}

const initialState: PokemonTypeState = {
  total: 0,

  status: APIStatus.IDLE,
  errors: [],
};

export const pokemonTypeAdapter = createEntityAdapter<IPokemonType>({
  selectId: (type) => type.name,
  sortComparer: (a, b) => +a.id - +b.id,
});

export const pokemonTypeSlice = createSlice({
  name: 'pokemon-type',
  initialState: pokemonTypeAdapter.getInitialState(initialState),
  reducers: {
    addPokemonTypesData: pokemonTypeAdapter.addMany,
    upsertPokemonType: pokemonTypeAdapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemonTypesAsync.pending, pendingCase());
    builder.addCase(getPokemonTypesAsync.rejected, rejectedCase());
    builder.addCase(getPokemonTypesAsync.fulfilled, (state, { payload }) => {
      state.status = APIStatus.FULFILLED;
    });
  },
});

export const { addPokemonTypesData, upsertPokemonType } =
  pokemonTypeSlice.actions;

export default pokemonTypeSlice.reducer;
