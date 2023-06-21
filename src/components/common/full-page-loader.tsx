import { Box, CircularProgress, Dialog } from '@mui/material';

export const FullPageLoader = () => {
  return (
    <Dialog
      open
      sx={{
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      }}
      PaperProps={{ sx: { background: 'transparent', boxShadow: 'none' } }}
      hideBackdrop
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <CircularProgress size={70} />
      </Box>
    </Dialog>
  );
};
