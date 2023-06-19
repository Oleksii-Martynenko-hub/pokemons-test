import { createAsyncThunk } from '@reduxjs/toolkit';

import { getExceptionPayload } from 'src/api/ErrorHandler';

import { ThunkExtra } from 'src/store';

export const getPokemonTypesAsync = createAsyncThunk<void, void, ThunkExtra>(
  'pokemon-type/getPokemonTypesAsync',
  async (_, { extra: { mainApi }, rejectWithValue }) => {
    try {
      const response = await mainApi.getPokemonData(0, 1281);
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  }
);
