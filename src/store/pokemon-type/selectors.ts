import { createSelector, Selector } from 'reselect';

import { APIStatus } from 'src/api/MainApi';
import { ErrorObject } from 'src/api/ErrorHandler';

import { RootState } from 'src/store';
import {
  IPokemonType,
  pokemonTypeAdapter,
} from 'src/store/pokemon-type/reducers';

const selectPokemonTypeReducer = (state: RootState) => state.pokemonTypeReducer;

const selectPokemonType = pokemonTypeAdapter.getSelectors();

export const selectPokemonTypesData: Selector<RootState, IPokemonType[]> =
  createSelector(selectPokemonTypeReducer, (state) =>
    selectPokemonType.selectAll(state)
  );

export const selectPokemonTypeById: (
  id: string
) => Selector<RootState, IPokemonType | undefined> = (id) =>
  createSelector(selectPokemonTypeReducer, (state) =>
    selectPokemonType.selectById(state, id)
  );

export const selectPokemonTypesStatus: Selector<RootState, APIStatus> =
  createSelector(selectPokemonTypeReducer, ({ status }) => status);

export const selectPokemonTypesErrors: Selector<RootState, ErrorObject[]> =
  createSelector(selectPokemonTypeReducer, ({ errors }) => errors);
