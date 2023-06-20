import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import styled from 'styled-components';

import { APIStatus } from 'src/api/MainApi';

import { AppDispatch } from 'src/store';
import { getPokemonTypesAsync } from 'src/store/pokemon-type/actions';
import {
  selectPokemonTypesData,
  selectPokemonTypesStatus,
} from 'src/store/pokemon-type/selectors';
import PokemonTypeItem from '../pokemon-type-item/pokemon-type-item';

/* eslint-disable-next-line */
export interface PokemonTypesFilterProps {}

const StyledPokemonTypesFilter = styled.div``;

export function PokemonTypesFilter(props: PokemonTypesFilterProps) {
  const dispatch = useDispatch<AppDispatch>();
  const typesData = useSelector(selectPokemonTypesData);
  const status = useSelector(selectPokemonTypesStatus);

  useEffect(() => {
    if (status === APIStatus.IDLE || typesData === null) {
      dispatch(getPokemonTypesAsync());
    }
  }, []);

  return (
    <StyledPokemonTypesFilter>
      {status === APIStatus.PENDING ? (
        <p>Loading...</p>
      ) : (
        <Grid
          container
          spacing={1}
          marginBottom={{ xs: 2, md: 4 }}
          justifyContent="center"
          maxWidth={740}
          marginX="auto"
        >
          {typesData?.map(({ id }) => (
            <PokemonTypeItem key={id} id={id} />
          ))}
        </Grid>
      )}
    </StyledPokemonTypesFilter>
  );
}

export default memo(PokemonTypesFilter);
