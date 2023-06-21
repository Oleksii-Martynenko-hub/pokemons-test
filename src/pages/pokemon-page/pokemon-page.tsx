import { memo, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Grid, Typography } from '@mui/material';

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
import PokemonStats from 'src/components/pokemon-stats/pokemon-stats';

import styles from './pokemon-page.module.scss';

/* eslint-disable-next-line */
export interface PokemonPageProps {}

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
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <Link to={ERoutes.ROOT} className={styles.backLink}>
          <span>{'<'}</span> Back
        </Link>
      </header>

      <main>
        <div className={styles.mainInfo}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.idNumber}>#{id}</p>
          <ul className={styles.typesList}>
            {types?.map(({ type }) => (
              <li
                key={type.name}
                className={styles.typeItem}
                style={{ backgroundColor: typeColorMap[type.name] }}
              >
                <span>{type.name}</span>
              </li>
            ))}
          </ul>{' '}
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={imageUrl}
              alt={name}
              loading="lazy"
            />
          </div>
        </div>

        {stats && <PokemonStats stats={stats} />}
      </main>

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
    </div>
  );
}

export default memo(PokemonPage);
