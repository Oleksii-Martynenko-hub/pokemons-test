import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { APIStatus } from 'src/api/MainApi';

import { ERoutes } from 'src/app/app';
import { AppDispatch } from 'src/store';
import { getPokemonByIdAsync } from 'src/store/pokemon/actions';
import {
  selectPokemonByIdOrName,
  selectStatusPokemonDetails,
} from 'src/store/pokemon/selectors';

import { FullPageLoader } from 'src/components/common/FullPageLoader';

/* eslint-disable-next-line */
export interface PokemonPageProps {}

const StyledPokemonPage = styled.div`
  color: pink;
`;

export function PokemonPage(props: PokemonPageProps) {
  const params = useParams<{ id: string }>();
  const pokemonId = params.id || '-1';
  const dispatch = useDispatch<AppDispatch>();

  const pokemon = useSelector(selectPokemonByIdOrName(pokemonId));
  const status = useSelector(selectStatusPokemonDetails);

  useEffect(() => {
    if ((!pokemon || !pokemon.details) && status !== APIStatus.PENDING) {
      dispatch(getPokemonByIdAsync(pokemonId));
    }
  }, []);

  return status === APIStatus.PENDING ? (
    <FullPageLoader />
  ) : (
    <StyledPokemonPage>
      <h1>Welcome to Pokemon {params.id} Page!</h1>

      <Link to={ERoutes.ROOT}>{'< Back to Home'}</Link>

      <p>{pokemon?.name}</p>
      <img src={pokemon?.imageUrl} alt={pokemon?.name} />
    </StyledPokemonPage>
  );
}

export default PokemonPage;
