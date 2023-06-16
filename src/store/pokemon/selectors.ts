import { createSelector, Selector } from 'reselect';

import { APIStatus } from 'src/api/MainApi';
import { ErrorObject } from 'src/api/ErrorHandler';

import { RootState } from 'src/store';
import { IPokemon } from 'src/store/pokemon/reducers';

const selectPokemonReducer = (state: RootState) => state.pokemonReducer;

export const selectPokemonData: Selector<RootState, IPokemon[] | null> =
  createSelector(selectPokemonReducer, ({ pokemonData }) =>
    pokemonData ? Object.values(pokemonData) : null
  );

  export const selectPokemonByIdOrName: (
    idOrName: number | string
  ) => Selector<RootState, IPokemon | null> = (idOrName) =>
    createSelector(selectPokemonReducer, ({ pokemonData }) => {
      if (!pokemonData) return null;
      const isIdName = isNaN(+idOrName);
      console.log('🚀 ~ createSelector ~ idOrName:', idOrName);

      if (isIdName) {
        return pokemonData[idOrName] || null;
      }

      const pokemon = Object.values(pokemonData).find(
        (p) => p.name === idOrName
      );

      return pokemon || null;
    });

  export const selectStatus: Selector<RootState, APIStatus> = createSelector(
    selectPokemonReducer,
    ({ status }) => status
  );

  export const selectStatusPokemonDetails: Selector<RootState, APIStatus> =
    createSelector(
      selectPokemonReducer,
      ({ statusPokemonDetails }) => statusPokemonDetails
    );

export const selectErrors: Selector<RootState, ErrorObject[]> = createSelector(
  selectPokemonReducer,
  ({ errors }) => errors
);
