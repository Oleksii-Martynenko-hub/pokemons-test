import { createAsyncThunk } from '@reduxjs/toolkit';

import { getExceptionPayload } from 'src/api/ErrorHandler';

import { ThunkExtra } from 'src/store';
import { IPokemon, upsertPokemon } from 'src/store/pokemon/reducers';

export const getPokemonByNameAsync = createAsyncThunk<void, string, ThunkExtra>(
  'pokemon-details/getPokemonByNameAsync',
  async (pokemonName, { extra: { mainApi }, dispatch, rejectWithValue }) => {
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

      dispatch(upsertPokemon(pokemonData));
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  }
);
