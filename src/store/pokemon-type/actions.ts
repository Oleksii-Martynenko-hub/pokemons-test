import { createAsyncThunk } from '@reduxjs/toolkit';

import { getExceptionPayload } from 'src/api/ErrorHandler';

import { ThunkExtra } from 'src/store';
import { IPokemonType } from './reducers';

export const getPokemonTypesAsync = createAsyncThunk<
  IPokemonType[],
  void,
  ThunkExtra
>(
  'pokemon-type/getPokemonTypesAsync',
  async (_, { extra: { mainApi }, rejectWithValue }) => {
    try {
      const response = await mainApi.getPokemonTypes();

      const pokemonTypes = response.results.map(({ name, url }) => ({
        id: url.split('/').at(-2) as string,
        name,
        details: null,
      }));

      return pokemonTypes;
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  }
);
