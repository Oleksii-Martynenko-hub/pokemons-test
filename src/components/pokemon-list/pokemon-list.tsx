import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';

import { AppDispatch } from 'src/store';
import { IPokemon, setItemsPerPage, setPage } from 'src/store/pokemon/reducers';
import {
  selectPokemonSelectedTypes,
  selectPokemonTypesData,
} from 'src/store/pokemon-type/selectors';
import {
  selectPokemonItemsPerPage,
  selectPokemonPage,
} from 'src/store/pokemon/selectors';

import usePagination from 'src/components/hooks/use-pagination';
import { useFilterByTypes } from 'src/components/hooks/use-filter-by-types';
import Pagination from 'src/components/pagination/pagination';
import PokemonItem from 'src/components/pokemon-item/pokemon-item';

export interface PokemonListProps {
  pokemons: IPokemon[];
}

export function PokemonList({ pokemons }: PokemonListProps) {
  const dispatch = useDispatch<AppDispatch>();

  const types = useSelector(selectPokemonTypesData);
  const selectedTypes = useSelector(selectPokemonSelectedTypes);
  const storedPage = useSelector(selectPokemonPage);
  const storedItemsPerPage = useSelector(selectPokemonItemsPerPage);

  const filteredPokemonsByTypes = useFilterByTypes(
    pokemons,
    types,
    selectedTypes
  );

  const { dataSlice: pokemonSlice, ...paginationProps } = usePagination(
    filteredPokemonsByTypes,
    storedPage,
    storedItemsPerPage
  );

  const { page, itemsPerPage } = paginationProps;

  useEffect(() => {
    dispatch(setPage(page));
  }, [page]);

  useEffect(() => {
    dispatch(setItemsPerPage(itemsPerPage));
  }, [itemsPerPage]);

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
