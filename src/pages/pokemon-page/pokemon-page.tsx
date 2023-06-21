import { memo, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, Grid, Typography } from '@mui/material';
import styled from 'styled-components';

import { APIStatus } from 'src/api/MainApi';

import { ERoutes } from 'src/app/app';
import { AppDispatch } from 'src/store';
import { getPokemonByNameAsync } from 'src/store/pokemon-details/actions';
import {
  selectPokemonByName,
  selectPokemonDetailsStatus,
} from 'src/store/pokemon-details/selectors';
import { typeColorMap } from 'src/store/pokemon-type/reducers';

import { FullPageLoader } from 'src/components/common/FullPageLoader';

/* eslint-disable-next-line */
export interface PokemonPageProps {}

const StyledLink = styled(Link)`
  display: block;
  color: #242c4c;
  text-decoration: none;
  font-size: 20px;
  padding: 10px;
  border-radius: 4px;

  &:hover {
    background: #eee;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;

  @media (min-width: 600px) {
    width: 280px;
  }
`;

export function PokemonPage(props: PokemonPageProps) {
  const params = useParams();
  const pokemonName = params.name as string;
  const dispatch = useDispatch<AppDispatch>();

  const pokemon = useSelector(selectPokemonByName(pokemonName));
  const status = useSelector(selectPokemonDetailsStatus);

  const id = pokemon?.id;
  const name = pokemon?.name;
  const details = pokemon?.details;
  const imageUrl = pokemon?.imageUrl;
  const types = details?.types;
  const stats = details?.stats;
  const moves = details?.moves;

  useEffect(() => {
    if ((!pokemon || !pokemon.details) && status !== APIStatus.PENDING) {
      dispatch(getPokemonByNameAsync(pokemonName));
    }
  }, []);

  return status === APIStatus.PENDING ? (
    <FullPageLoader />
  ) : (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item xs="auto">
        <StyledLink to={ERoutes.ROOT}>{'< Back'}</StyledLink>
      </Grid>

      <Grid item xs={9}>
        <Typography variant="h3" textTransform="capitalize" align="right">
          {name}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm="auto">
            <Image loading="lazy" src={imageUrl} alt={name} />
          </Grid>
          <Grid item xs={6} sm="auto">
            <Typography variant="h5" marginBottom={2}>
              #{id}
            </Typography>

            <Box component="ul">
              {types?.map(({ type }) => (
                <Chip
                  key={type.name}
                  label={type.name}
                  component="li"
                  sx={{
                    background: typeColorMap[type.name],
                    color: '#fff',
                    mr: 1,
                  }}
                />
              ))}
            </Box>

            <Box component="ul">
              {stats?.map(({ stat, base_stat, effort }) => (
                <li key={stat.name}>
                  <span>{stat.name}: </span>
                  <span>
                    {base_stat} / {effort}
                  </span>
                </li>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" marginBottom={2}>
          Moves
        </Typography>

        <Grid container spacing={1} justifyContent="space-between">
          {moves?.map(({ move }) => (
            <Grid item xs={6} sm={4} md={3} key={move.name}>
              <Chip label={move.name} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default memo(PokemonPage);
