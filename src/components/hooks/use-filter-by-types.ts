import { useMemo } from 'react';

import { IPokemon } from 'src/store/pokemon/reducers';
import { IPokemonType } from 'src/store/pokemon-type/reducers';

export const useFilterByTypes = (
  pokemons: IPokemon[],
  type: IPokemonType[],
  selectedTypes: string[]
) => {
  const filteredPokemons = useMemo(() => {
    if (selectedTypes.length === 0) return pokemons;

    const typesWithDetails = type.filter(
      (t) => selectedTypes.includes(t.id) && t.details
    ) as (IPokemonType & { details: { pokemonList: string[] } })[];

    if (typesWithDetails.length === 0) return pokemons;

    const listOfPokemonLists = typesWithDetails.map(
      (t) => t.details.pokemonList
    );

    const commonPokemonList = listOfPokemonLists.reduce(
      (acc, pokemonList) => acc.concat(pokemonList),
      [] as string[]
    );

    const pokemonList = commonPokemonList.reduce(
      (acc, pokemon) =>
        listOfPokemonLists.every((list) => list.includes(pokemon))
          ? acc.concat(pokemon)
          : acc,
      [] as string[]
    );

    return pokemons.filter(({ name }) => pokemonList.includes(name));
  }, [pokemons, type, selectedTypes]);

  return filteredPokemons;
};
