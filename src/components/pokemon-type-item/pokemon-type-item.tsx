import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, CircularProgress, Grid } from '@mui/material';

import { APIStatus } from 'src/api/MainApi';

import { AppDispatch } from 'src/store';
import { getPokemonTypeDetailsByIdAsync } from 'src/store/pokemon-type/actions';
import { togglePokemonType } from 'src/store/pokemon-type/reducers';
import { selectPokemonTypeById } from 'src/store/pokemon-type/selectors';

export interface PokemonTypeItemProps {
  id: string;
}

export function PokemonTypeItem({ id }: PokemonTypeItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const type = useSelector(selectPokemonTypeById(id));

  const name = type?.name;
  const isSelected = type?.isSelected;
  const isPending = type?.status === APIStatus.PENDING;

  useEffect(() => {
    if (
      type &&
      type.status !== APIStatus.PENDING &&
      type.details === null &&
      type.isSelected
    ) {
      dispatch(getPokemonTypeDetailsByIdAsync(id));
    }
  }, [isSelected]);

  const handleToggleType = () => {
    dispatch(togglePokemonType(id));
  };

  return (
    <Grid item xs="auto">
      <Chip
        label={
          <>
            {name}
            {isPending && (
              <CircularProgress
                size={16}
                sx={{
                  color: 'rgb(252, 202, 28)',
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                }}
              />
            )}
          </>
        }
        sx={{
          backgroundColor: isSelected ? 'rgb(28, 62, 119)' : 'rgb(55, 97, 168)',
          color: isPending ? 'rgba(252, 202, 28, 0.2)' : 'rgb(252, 202, 28)',
          fontWeight: 'bold',

          '&:hover': {
            outline: '2px solid rgb(252, 202, 28)',
            backgroundColor: isSelected
              ? 'rgb(28, 62, 119)'
              : 'rgb(55, 97, 168)',
          },
        }}
        clickable
        onClick={handleToggleType}
      />
    </Grid>
  );
}

export default PokemonTypeItem;
