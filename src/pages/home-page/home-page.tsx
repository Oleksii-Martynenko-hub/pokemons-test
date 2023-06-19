import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { APIStatus } from 'src/api/MainApi';

import { AppDispatch } from 'src/store';
import { getPokemonDataAsync } from 'src/store/pokemon/actions';
import {
  selectPokemonData,
  selectPokemonDataStatus,
} from 'src/store/pokemon/selectors';

import { FullPageLoader } from 'src/components/common/FullPageLoader';
import PokemonList from 'src/components/pokemon-list/pokemon-list';
import PokemonTypesFilter from 'src/components/pokemon-types-filter/pokemon-types-filter';

/* eslint-disable-next-line */
export interface HomePageProps {}

const StyledHomePage = styled.div`
  color: pink;
`;

export function HomePage(props: HomePageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const pokemonData = useSelector(selectPokemonData);
  const status = useSelector(selectPokemonDataStatus);

  useEffect(() => {
    if (status === APIStatus.IDLE || pokemonData === null) {
      dispatch(getPokemonDataAsync());
    }
  }, []);

  if (status === APIStatus.PENDING) {
    return <FullPageLoader />;
  }
  return (
    <StyledHomePage>
      <PokemonTypesFilter />

      {pokemonData && <PokemonList pokemons={pokemonData} />}
    </StyledHomePage>
  );
}

export default memo(HomePage);
