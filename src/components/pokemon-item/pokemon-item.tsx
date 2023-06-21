import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Grid, Tooltip, Typography } from '@mui/material';

import { ERoutes } from 'src/app/app';
import pokemonPlaceholder from 'src/assets/images/pokemon-placeholder.svg';



export interface PokemonItemProps {
  name: string;
  imageUrl: string;
}

const StyledLink = styled(Link)`
  width: 96px;
  display: inline-block;
  color: inherit;
  text-decoration: none;
`;
const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 96px;
  height: 96px;
`;

const CardImage = styled.img`
  width: 96px;
  aspect-ratio: 1;
`;

export function PokemonItem({ name, imageUrl }: PokemonItemProps) {
  const [isImageRejected, setIsImageRejected] = useState(false);

  const handleImageError = () => setIsImageRejected(true);

  return (
    <Grid item xs={'auto'}>
      <StyledLink to={`${ERoutes.POKEMON.split(':')[0] + name}`}>
        <Card sx={{ width: '100%' }}>
          <ImageWrapper>
            <CardImage
              src={isImageRejected ? pokemonPlaceholder : imageUrl}
              alt={name}
              width={isImageRejected ? 40 : 96}
              height={isImageRejected ? 40 : 96}
              onError={handleImageError}
              loading="lazy"
            />
          </ImageWrapper>
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
      </StyledLink>
    </Grid>
  );
}

export default memo(PokemonItem);
