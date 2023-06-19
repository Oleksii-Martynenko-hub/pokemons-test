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
        id: url.split('/').reverse()[1],
        name,
        url,
        imageUrl: imageStorageUrl + url.split('/').reverse()[1] + '.png',
        details: null,
      }));

      return { pokemonData, total: count };
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  }
);

export const getPokemonByNameAsync = createAsyncThunk<
  IPokemon,
  string | number,
  ThunkExtra
>(
  'pokemon/getPokemonByNameAsync',
  async (pokemonName, { extra: { mainApi }, rejectWithValue }) => {
    try {
      const response = await mainApi.getPokemonById(pokemonName.toString());

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
