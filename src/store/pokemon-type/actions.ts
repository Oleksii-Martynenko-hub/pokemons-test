import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIStatus } from 'src/api/MainApi';
import { getExceptionPayload } from 'src/api/ErrorHandler';

import { ThunkExtra } from 'src/store';
import { IPokemonType, typeColorMap } from './reducers';

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
        status: APIStatus.IDLE,
        color: typeColorMap[name],
        details: null,
      }));

      return pokemonTypes;
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  }
);

export const getPokemonTypeDetailsByIdAsync = createAsyncThunk<
  IPokemonType,
  string,
  ThunkExtra
>(
  'pokemon-type/getPokemonTypeDetailsByIdAsync',
  async (typeId, { extra: { mainApi }, rejectWithValue }) => {
    try {
      const response = await mainApi.getPokemonTypeById(typeId);

      const { id, name, pokemon } = response;

      const pokemonList = pokemon.map(({ pokemon }) => pokemon.name);

      const pokemonType = {
        id: id.toString(),
        name,
        status: APIStatus.FULFILLED,
        color: typeColorMap[name],
        details: {
          pokemonList,
        },
      };

      return pokemonType;
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  }
);
