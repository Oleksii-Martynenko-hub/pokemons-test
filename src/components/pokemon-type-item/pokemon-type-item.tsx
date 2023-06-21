import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, CircularProgress, Grid, darken } from '@mui/material';

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
  const color = type?.color;
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
                  color: 'rgb(255, 255, 255)',
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                }}
              />
            )}
          </>
        }
        sx={{
          backgroundColor: color,
          color: isPending
            ? 'rgba(255, 255, 255, 0.2)'
            : isSelected
            ? '#222'
            : '#fff',
          fontWeight: 'bold',
          textTransform: 'capitalize',
          outline: isSelected
            ? '1px solid ' + darken(color || '#7b7b7b', 0.4)
            : 'none',

          '&:hover': {
            outline: '2px solid ' + darken(color || '#7b7b7b', 0.2),
            backgroundColor: color,
          },
        }}
        clickable
        onClick={handleToggleType}
      />
    </Grid>
  );
}

export default PokemonTypeItem;
