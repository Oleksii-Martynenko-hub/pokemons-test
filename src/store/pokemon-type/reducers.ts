import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { ErrorObject } from 'src/api/ErrorHandler';
import { APIStatus } from 'src/api/MainApi';

import { pendingCase, rejectedCase } from 'src/store';
import {
  getPokemonTypeDetailsByIdAsync,
  getPokemonTypesAsync,
} from 'src/store/pokemon-type/actions';

export interface IPokemonType {
  id: string;
  name: string;
  isSelected?: boolean;
  details: { pokemonList: string[] } | null;
  status: APIStatus;
}

export interface PokemonTypeState {
  selectedTypes: string[];
  status: APIStatus;
  errors: ErrorObject[];
}

const initialState: PokemonTypeState = {
  selectedTypes: [],
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
    togglePokemonType: (state, { payload }: PayloadAction<string>) => {
      const type = pokemonTypeAdapter.getSelectors().selectById(state, payload);

      if (!type) {
        return;
      }

      pokemonTypeAdapter.updateOne(state, {
        changes: { isSelected: !type.isSelected },
        id: payload,
      });

      if (state.selectedTypes.includes(payload)) {
        state.selectedTypes = state.selectedTypes.filter((t) => t !== payload);
        return;
      }

      state.selectedTypes.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemonTypesAsync.pending, pendingCase());
    builder.addCase(getPokemonTypesAsync.rejected, rejectedCase());
    builder.addCase(getPokemonTypesAsync.fulfilled, (state, { payload }) => {
      pokemonTypeAdapter.addMany(state, payload);
      state.status = APIStatus.FULFILLED;
    });

    builder.addCase(
      getPokemonTypeDetailsByIdAsync.pending,
      (state, { meta }) => {
        pokemonTypeAdapter.updateOne(state, {
          changes: { status: APIStatus.PENDING },
          id: meta.arg,
        });
      }
    );
    builder.addCase(
      getPokemonTypeDetailsByIdAsync.rejected,
      (state, { meta }) => {
        pokemonTypeAdapter.updateOne(state, {
          changes: { status: APIStatus.REJECTED },
          id: meta.arg,
        });
      }
    );
    builder.addCase(
      getPokemonTypeDetailsByIdAsync.fulfilled,
      (state, { payload }) => {
        pokemonTypeAdapter.upsertOne(state, payload);
      }
    );
  },
});

export const { togglePokemonType } = pokemonTypeSlice.actions;

export default pokemonTypeSlice.reducer;
