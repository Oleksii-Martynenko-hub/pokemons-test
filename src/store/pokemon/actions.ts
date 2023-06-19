import { createAsyncThunk } from '@reduxjs/toolkit';

import { getExceptionPayload } from 'src/api/ErrorHandler';

import { ThunkExtra } from 'src/store';
import { IPokemon } from 'src/store/pokemon/reducers';

export const getPokemonDataAsync = createAsyncThunk<
  {
    pokemonData: IPokemon[];
    total: number;
  },
  void,
  ThunkExtra
>(
  'pokemon/getPokemonDataAsync',
  async (_, { extra: { mainApi }, rejectWithValue }) => {
    try {
      const response = await mainApi.getPokemonData(0, 1281);

      const { results, count } = response;

      const imageStorageUrl = process.env.REACT_APP_IMAGE_STORAGE_URL;

      const pokemonData = results.map(({ name, url }) => ({
        id: url.split('/').at(-2) as string,
        name,
        url,
        imageUrl: imageStorageUrl + url.split('/').at(-2) + '.png',
        details: null,
      }));

      return { pokemonData, total: count };
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  }
);
