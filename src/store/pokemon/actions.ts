import { createAsyncThunk } from '@reduxjs/toolkit';

import { getExceptionPayload } from 'src/api/ErrorHandler';

import { ThunkExtra } from 'src/store';
import { IPokemon } from 'src/store/pokemon/reducers';

export const getPokemonDataAsync = createAsyncThunk<
  {
    pokemonData: { [key: string]: IPokemon };
    nextPartOfDataUrl: string | null;
    total: number;
  },
  void,
  ThunkExtra
>(
  'login/getPokemonDataAsync',
  async (_, { extra: { mainApi }, rejectWithValue }) => {
    try {
      const response = await mainApi.getData();

      const { results, next, count } = response;

      const imageStorageUrl = process.env.REACT_APP_IMAGE_STORAGE_URL;

      const pokemonDataArray = results.map(({ name, url }, i) => ({
        id: i + 1,
        name,
        url,
        imageUrl: imageStorageUrl + (i + 1) + '.png',
        details: null,
      }));

      const pokemonDataEntries = pokemonDataArray.map(
        (p) => [p.id, p] as const
      );

      const pokemonData = Object.fromEntries(pokemonDataEntries);

      return { pokemonData, nextPartOfDataUrl: next, total: count };
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  }
);
