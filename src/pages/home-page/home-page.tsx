import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Divider, TextField } from '@mui/material';

import { APIStatus } from 'src/api/MainApi';

import { AppDispatch } from 'src/store';
import { getPokemonDataAsync } from 'src/store/pokemon/actions';
import {
  selectPokemonData,
  selectPokemonDataStatus,
} from 'src/store/pokemon/selectors';

import { useFilterByName } from 'src/components/hooks/use-filter-by-name';
import PokemonList from 'src/components/pokemon-list/pokemon-list';
import PokemonTypesFilter from 'src/components/pokemon-types-filter/pokemon-types-filter';
import PokemonListSkeleton from 'src/components/pokemon-list-skeleton/pokemon-list-skeleton';

import styles from './home-page.module.scss';

export function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const pokemonData = useSelector(selectPokemonData);
  const status = useSelector(selectPokemonDataStatus);

  const [filteredPokemonData, value, OnChange] = useFilterByName(pokemonData);

  useEffect(() => {
    if (status === APIStatus.IDLE || pokemonData === null) {
      dispatch(getPokemonDataAsync());
    }
  }, []);

  return (
    <div className={styles.homePage}>
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

      <main>
        <PokemonTypesFilter />

        <Divider sx={{ mx: 2 }} />

        {status === APIStatus.PENDING ? (
          <PokemonListSkeleton />
        ) : (
          pokemonData && <PokemonList pokemons={filteredPokemonData} />
        )}
      </main>
    </div>
  );
}

export default memo(HomePage);
