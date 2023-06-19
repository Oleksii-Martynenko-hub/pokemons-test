import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Grid } from '@mui/material';
import styled from 'styled-components';

import { APIStatus } from 'src/api/MainApi';

import { AppDispatch } from 'src/store';
import { getPokemonTypesAsync } from 'src/store/pokemon-type/actions';
import {
  selectPokemonTypesData,
  selectPokemonTypesStatus,
} from 'src/store/pokemon-type/selectors';

/* eslint-disable-next-line */
export interface PokemonTypesFilterProps {}

const StyledPokemonTypesFilter = styled.div`
  color: #5f5fff;
`;

export function PokemonTypesFilter(props: PokemonTypesFilterProps) {
  const dispatch = useDispatch<AppDispatch>();
  const typesData = useSelector(selectPokemonTypesData);
  const status = useSelector(selectPokemonTypesStatus);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    if (status === APIStatus.IDLE || typesData === null) {
      dispatch(getPokemonTypesAsync());
    }
  }, []);

  const handleToggleType = (value: string) => () => {
    if (selectedTypes.includes(value)) {
      setSelectedTypes((prev) => prev.filter((t) => t !== value));
      return;
    }

    setSelectedTypes((prev) => [...prev, value]);
  };

  return (
    <StyledPokemonTypesFilter>
      {status === APIStatus.PENDING ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={1} marginBottom={2}>
          {typesData?.map(({ name }) => (
            <Grid item xs="auto" key={name}>
              <Chip
                label={name}
                sx={{
                  backgroundColor: selectedTypes.includes(name)
                    ? 'rgb(28, 62, 119)'
                    : 'rgb(55, 97, 168)',
                  color: 'rgb(252, 202, 28)',
                  fontWeight: 'bold',

                  '&:hover': {
                    outline: '2px solid rgb(252, 202, 28)',
                    backgroundColor: selectedTypes.includes(name)
                      ? 'rgb(28, 62, 119)'
                      : 'rgb(55, 97, 168)',
                  },
                }}
                clickable
                onClick={handleToggleType(name)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </StyledPokemonTypesFilter>
  );
}

export default memo(PokemonTypesFilter);
