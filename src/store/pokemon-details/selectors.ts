import { createSelector, Selector } from 'reselect';

import { APIStatus } from 'src/api/MainApi';
import { ErrorObject } from 'src/api/ErrorHandler';

import { RootState } from 'src/store';
import { IPokemon, pokemonAdapter } from 'src/store/pokemon/reducers';

const selectPokemonReducer = (state: RootState) => state.pokemonReducer;
const selectPokemonDetailsReducer = (state: RootState) =>
  state.pokemonDetailsReducer;

const selectPokemon = pokemonAdapter.getSelectors();

export const selectPokemonByName: (
  name: string
) => Selector<RootState, IPokemon | undefined> = (name) =>
  createSelector(selectPokemonReducer, (state) =>
    selectPokemon.selectById(state, name)
  );

export const selectPokemonDetailsStatus: Selector<RootState, APIStatus> =
  createSelector(selectPokemonDetailsReducer, ({ status }) => status);

export const selectPokemonDetailsErrors: Selector<RootState, ErrorObject[]> =
  createSelector(selectPokemonDetailsReducer, ({ errors }) => errors);
