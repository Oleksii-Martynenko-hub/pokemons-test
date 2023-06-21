import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Skeleton } from '@mui/material';

import { APIStatus } from 'src/api/MainApi';

import { AppDispatch } from 'src/store';
import { getPokemonTypesAsync } from 'src/store/pokemon-type/actions';
import {
  selectPokemonTypesData,
  selectPokemonTypesStatus,
} from 'src/store/pokemon-type/selectors';
import PokemonTypeItem from '../pokemon-type-item/pokemon-type-item';

export function PokemonTypesFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const typesData = useSelector(selectPokemonTypesData);
  const status = useSelector(selectPokemonTypesStatus);

  useEffect(() => {
    if (status === APIStatus.IDLE || typesData === null) {
      dispatch(getPokemonTypesAsync());
    }
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={1}
        marginBottom={{ xs: 2, md: 4 }}
        justifyContent="center"
        maxWidth={740}
        marginX="auto"
      >
        {status === APIStatus.PENDING
          ? [...Array(20).keys()].map((i) => (
              <Grid item xs="auto">
                <Skeleton
                  variant="rounded"
                  sx={{
                    width: `${Math.round(Math.random() * 35) + 45}px`,
                    height: '32px',
                    borderRadius: '32px',
                  }}
                />
              </Grid>
            ))
          : typesData?.map(({ id }) => <PokemonTypeItem key={id} id={id} />)}
      </Grid>
    </div>
  );
}

export default memo(PokemonTypesFilter);
