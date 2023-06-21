import { useState, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';

export default function usePagination<T>(
  data: T[],
  defaultPage = 1,
  defaultItemsPerPage = 0,
  itemsPerPageOptions = [10, 25, 50]
) {
  const isMobile = useMediaQuery('(max-width:460px)');
  const isTablet = useMediaQuery('(max-width:767px)');

  const itemsPerPageDefault =
    itemsPerPageOptions[isMobile ? 0 : isTablet ? 1 : 2];

  const [page, setPage] = useState(defaultPage);
  const [itemsPerPage, setItemsPerPage] = useState(
    defaultItemsPerPage || itemsPerPageDefault
  );

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  const dataSlice = useMemo(() => {
    return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [data, page, itemsPerPage]);

  return {
    dataSlice,
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    itemsPerPageOptions,
  };
}
