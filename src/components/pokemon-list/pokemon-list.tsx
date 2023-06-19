import { Link } from 'react-router-dom';
import { IPokemon } from 'src/store/pokemon/reducers';
import styled from 'styled-components';
import { Card, CardMedia, Grid, Tooltip, Typography } from '@mui/material';
import { ERoutes } from 'src/app/app';
import { memo } from 'react';
import PokemonItem from '../pokemon-item/pokemon-item';

/* eslint-disable-next-line */
export interface PokemonListProps {
  pokemons: IPokemon[];
}

export function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {pokemons.map(({ id, name, imageUrl }) => (
        <PokemonItem key={id} name={name} imageUrl={imageUrl} />
      ))}
    </Grid>
  );
}

export default memo(PokemonList);
