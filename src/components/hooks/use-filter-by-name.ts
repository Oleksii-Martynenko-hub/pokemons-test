import { useMemo } from 'react';

import { IPokemon } from 'src/store/pokemon/reducers';
import { useInput } from './use-input';

export const useFilterByName = (
  pokemons: IPokemon[],
  defaultValue?: string
) => {
  const [value, onChange] = useInput(defaultValue || '');

  const filteredPokemons = useMemo(() => {
    if (pokemons.length === 0 || value === '') return pokemons;

    return pokemons.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
  }, [pokemons, value]);

  return [filteredPokemons, value, onChange] as const;
};
