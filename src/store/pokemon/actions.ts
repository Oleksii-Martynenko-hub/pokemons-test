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
      const response = await mainApi.getPokemonData();

      const { results, next, count } = response;

      const imageStorageUrl = process.env.REACT_APP_IMAGE_STORAGE_URL;

      const pokemonDataArray = results.map(({ name, url }) => ({
        id: url.split('/').reverse()[1],
        name,
        url,
        imageUrl: imageStorageUrl + url.split('/').reverse()[1] + '.png',
        details: null,
      }));

      const pokemonDataEntries = pokemonDataArray.map(
        (p) => [p.name, p] as const
      );

      const pokemonData = Object.fromEntries(pokemonDataEntries);

      return { pokemonData, nextPartOfDataUrl: next, total: count };
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  }
);

export const getPokemonByIdAsync = createAsyncThunk<
  IPokemon,
  string | number,
  ThunkExtra
>(
  'login/getPokemonByIdAsync',
  async (pokemonId, { extra: { mainApi }, rejectWithValue }) => {
    try {
      const response = await mainApi.getPokemonById(pokemonId.toString());

      const { id, name, moves, stats, types } = response;

      const pokemonData: IPokemon = {
        id: id.toString(),
        name,
        url: process.env.REACT_APP_API_URL + '/pokemon/' + id,
        imageUrl: process.env.REACT_APP_IMAGE_STORAGE_URL + id + '.png',
        details: { moves, stats, types },
      };

      return pokemonData;
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  }
);
