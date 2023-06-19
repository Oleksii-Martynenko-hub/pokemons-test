import { memo, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { APIStatus } from 'src/api/MainApi';

import { ERoutes } from 'src/app/app';
import { AppDispatch } from 'src/store';
import { getPokemonByNameAsync } from 'src/store/pokemon-details/actions';
import {
  selectPokemonByName,
  selectPokemonDetailsStatus,
} from 'src/store/pokemon-details/selectors';

import { FullPageLoader } from 'src/components/common/FullPageLoader';

/* eslint-disable-next-line */
export interface PokemonPageProps {}

const StyledPokemonPage = styled.div`
  color: pink;
`;

export function PokemonPage(props: PokemonPageProps) {
  const params = useParams();
  const pokemonName = params.name as string;
  const dispatch = useDispatch<AppDispatch>();

  const pokemon = useSelector(selectPokemonByName(pokemonName));
  const status = useSelector(selectPokemonDetailsStatus);

  useEffect(() => {
    if ((!pokemon || !pokemon.details) && status !== APIStatus.PENDING) {
      dispatch(getPokemonByNameAsync(pokemonName));
    }
  }, []);

  return status === APIStatus.PENDING ? (
    <FullPageLoader />
  ) : (
    <StyledPokemonPage>
      <h1>Welcome to Pokemon {params.id} Page!</h1>

      <Link to={ERoutes.ROOT}>{'< Back to Home'}</Link>

      <p>{pokemon?.name}</p>
      <img loading="lazy" src={pokemon?.imageUrl} alt={pokemon?.name} />
    </StyledPokemonPage>
  );
}

export default memo(PokemonPage);
