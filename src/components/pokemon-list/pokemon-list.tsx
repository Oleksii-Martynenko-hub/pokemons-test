import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';

import { IPokemon } from 'src/store/pokemon/reducers';
import {
  selectPokemonSelectedTypes,
  selectPokemonTypesData,
} from 'src/store/pokemon-type/selectors';

import usePagination from 'src/components/hooks/use-pagination';
import { useFilterByTypes } from 'src/components/hooks/use-filter-by-types';
import Pagination from 'src/components/pagination/pagination';
import PokemonItem from 'src/components/pokemon-item/pokemon-item';

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

  const { dataSlice: pokemonSlice, ...paginationProps } = usePagination(
    filteredPokemonsByTypes
  );

  return (
    <>
      <Pagination {...paginationProps} />

      <Grid container spacing={2} justifyContent="center">
        {filteredPokemonsByTypes.length === 0 ? (
          <Typography>Pokemons not found</Typography>
        ) : (
          pokemonSlice.map(({ id, name, imageUrl }) => (
            <PokemonItem key={id} name={name} imageUrl={imageUrl} />
          ))
        )}
      </Grid>

      <Pagination {...paginationProps} />
    </>
  );
}

export default memo(PokemonList);
