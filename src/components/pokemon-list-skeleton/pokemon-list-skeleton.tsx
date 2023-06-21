import { Box, Grid, Skeleton } from '@mui/material';

export function PokemonListSkeleton() {
  return (
    <Box sx={{ padding: '0 16px' }}>
      <Grid
        container
        spacing={1}
        sx={{ mt: '8px', mb: '16px' }}
        alignItems="center"
      >
        <Grid item xs={'auto'} mr="auto">
          <Skeleton
            variant="rounded"
            sx={{
              width: '52px',
              height: '45px',
            }}
          />
        </Grid>

        {[...Array(8).keys()].map((i) => (
          <Grid item xs={'auto'}>
            <Skeleton
              variant="rounded"
              sx={{
                width: '32px',
                height: '32px',
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        {[...Array(50).keys()].map((i) => (
          <Grid item xs={'auto'}>
            <Skeleton
              variant="rounded"
              sx={{
                width: '96px',
                height: '137px',
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{ mt: '8px', mb: '16px' }}
        alignItems="center"
      >
        <Grid item xs={'auto'} mr="auto">
          <Skeleton
            variant="rounded"
            sx={{
              width: '52px',
              height: '45px',
            }}
          />
        </Grid>

        {[...Array(8).keys()].map((i) => (
          <Grid item xs={'auto'}>
            <Skeleton
              variant="rounded"
              sx={{
                width: '32px',
                height: '32px',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PokemonListSkeleton;
