import { createSelector, Selector } from 'reselect';

import { APIStatus } from 'src/api/MainApi';

import { RootState } from 'src/store';
import { ErrorObject } from 'src/api/ErrorHandler';
import { IPokemon } from 'src/store/pokemon/reducers';

const selectPokemonReducer = (state: RootState) => state.pokemonReducer;

export const selectPokemonData: Selector<RootState, IPokemon[] | null> =
  createSelector(selectPokemonReducer, ({ pokemonData }) =>
    pokemonData ? Object.values(pokemonData) : null
  );

export const selectStatus: Selector<RootState, APIStatus> = createSelector(
  selectPokemonReducer,
  ({ status }) => status
);

export const selectErrors: Selector<RootState, ErrorObject[]> = createSelector(
  selectPokemonReducer,
  ({ errors }) => errors
);
