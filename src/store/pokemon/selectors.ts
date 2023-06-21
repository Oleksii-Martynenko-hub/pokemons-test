import { createSelector, Selector } from 'reselect';

import { APIStatus } from 'src/api/MainApi';
import { ErrorObject } from 'src/api/ErrorHandler';

import { RootState } from 'src/store';
import { IPokemon, pokemonAdapter } from 'src/store/pokemon/reducers';

const selectPokemonReducer = (state: RootState) => state.pokemonReducer;

const selectPokemon = pokemonAdapter.getSelectors();

export const selectPokemonData: Selector<RootState, IPokemon[]> =
  createSelector(selectPokemonReducer, (state) =>
    selectPokemon.selectAll(state)
  );

export const selectPokemonPage: Selector<RootState, number> = createSelector(
  selectPokemonReducer,
  ({ page }) => page
);

export const selectPokemonItemsPerPage: Selector<RootState, number> =
  createSelector(selectPokemonReducer, ({ itemsPerPage }) => itemsPerPage);

export const selectPokemonDataStatus: Selector<RootState, APIStatus> =
  createSelector(selectPokemonReducer, ({ status }) => status);

export const selectPokemonDataErrors: Selector<RootState, ErrorObject[]> =
  createSelector(selectPokemonReducer, ({ errors }) => errors);
