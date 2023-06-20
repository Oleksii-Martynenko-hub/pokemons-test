import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { IPokemon } from 'src/store/pokemon/reducers';
import {
  selectPokemonSelectedTypes,
  selectPokemonTypesData,
} from 'src/store/pokemon-type/selectors';

import { useFilterByTypes } from '../hooks/use-filter-by-types';
import PokemonItem from '../pokemon-item/pokemon-item';

export interface PokemonListProps {
  pokemons: IPokemon[];
}

export function PokemonList({ pokemons }: PokemonListProps) {
  const types = useSelector(selectPokemonTypesData);
  const selectedTypes = useSelector(selectPokemonSelectedTypes);

  const filteredPokemonsByTypes = useFilterByTypes(
    pokemons,
    types,
    selectedTypes
  );

  return (
    <Grid container spacing={2} justifyContent="center">
      {filteredPokemonsByTypes.map(({ id, name, imageUrl }) => (
        <PokemonItem key={id} name={name} imageUrl={imageUrl} />
      ))}
    </Grid>
  );
}

export default memo(PokemonList);
