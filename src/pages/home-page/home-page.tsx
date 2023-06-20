import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, TextField } from '@mui/material';
import styled from 'styled-components';

import { APIStatus } from 'src/api/MainApi';

import { AppDispatch } from 'src/store';
import { getPokemonDataAsync } from 'src/store/pokemon/actions';
import {
  selectPokemonData,
  selectPokemonDataStatus,
} from 'src/store/pokemon/selectors';

import { useFilterByName } from 'src/components/hooks/use-filter-by-name';
import { FullPageLoader } from 'src/components/common/FullPageLoader';
import PokemonList from 'src/components/pokemon-list/pokemon-list';
import PokemonTypesFilter from 'src/components/pokemon-types-filter/pokemon-types-filter';

/* eslint-disable-next-line */
export interface HomePageProps {}

const StyledHomePage = styled.div`
  color: #2e2e2e;
  padding: 80px 0 0;
`;

export function HomePage(props: HomePageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const pokemonData = useSelector(selectPokemonData);
  const status = useSelector(selectPokemonDataStatus);

  const [filteredPokemonData, value, OnChange] = useFilterByName(pokemonData);

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
      <AppBar
        position="fixed"
        sx={{ background: 'rgb(225, 236, 255)', padding: '20px' }}
      >
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          color="primary"
          size="small"
          fullWidth
          sx={{ maxWidth: '520px', mx: 'auto' }}
          value={value}
          onChange={OnChange}
        />
      </AppBar>

      <PokemonTypesFilter />

      {pokemonData && <PokemonList pokemons={filteredPokemonData} />}
    </StyledHomePage>
  );
}

export default memo(HomePage);
