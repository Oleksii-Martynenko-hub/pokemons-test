import { Dispatch, SetStateAction } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination as PaginationMUI,
  Select,
  SelectChangeEvent,
  useMediaQuery,
} from '@mui/material';

export interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  itemsPerPageOptions: number[];
}

export function Pagination({
  page,
  setPage,
  itemsPerPage,
  setItemsPerPage,
  totalPages,
  itemsPerPageOptions,
}: PaginationProps) {
  const isMobile = useMediaQuery('(max-width:495px)');

  const handleChangeItemsPerPage = (event: SelectChangeEvent) => {
    setItemsPerPage(Number(event.target.value));
  };

  const handleChangePage = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        my: { xs: 2, sm: 4 },
        px: 2,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <FormControl
        variant="standard"
        size="small"
        sx={{ mr: isMobile ? 1 : 4, minWidth: 52 }}
      >
        <InputLabel id="demo-select-small-label">Per page</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={itemsPerPage.toString()}
          label="Age"
          onChange={handleChangeItemsPerPage}
        >
          {itemsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <PaginationMUI
        variant="outlined"
        shape="rounded"
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        size={isMobile ? 'small' : 'medium'}
        sx={{ ml: 'auto' }}
      />
    </Box>
  );
}

export default Pagination;
