import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Tooltip, Typography } from '@mui/material';

import { ERoutes } from 'src/app/app';
import pokemonPlaceholder from 'src/assets/images/pokemon-placeholder.svg';

import styles from './pokemon-item.module.scss';

export interface PokemonItemProps {
  name: string;
  imageUrl: string;
}

export function PokemonItem({ name, imageUrl }: PokemonItemProps) {
  const [isImageRejected, setIsImageRejected] = useState(false);

  const handleImageError = () => setIsImageRejected(true);

  return (
    <Grid item xs={'auto'}>
      <Link
        to={`${ERoutes.POKEMON.split(':')[0] + name}`}
        className={styles.link}
      >
        <Card sx={{ width: '100%' }}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.cardImage}
              src={isImageRejected ? pokemonPlaceholder : imageUrl}
              alt={name}
              width={isImageRejected ? 40 : 96}
              height={isImageRejected ? 40 : 96}
              onError={handleImageError}
              loading="lazy"
            />
          </div>
          <Tooltip
            title={name}
            followCursor
            PopperProps={{
              sx: { textTransform: 'capitalize' },
            }}
          >
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                textTransform: 'capitalize',
                padding: '0 10px 10px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {name}
            </Typography>
          </Tooltip>
        </Card>
      </Link>
    </Grid>
  );
}

export default memo(PokemonItem);
