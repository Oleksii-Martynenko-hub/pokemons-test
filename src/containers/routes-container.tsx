import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { ERoutes } from 'src/app/app';
import HomePage from 'src/pages/home-page/home-page';
import PokemonPage from 'src/pages/pokemon-page/pokemon-page';

const RoutesContainer: FC = () => {
  return (
    <Routes>
      <Route path={ERoutes.ROOT} element={<HomePage />} />

      <Route path={ERoutes.POKEMON} element={<PokemonPage />} />

      <Route
        path={ERoutes.NOT_EXIST}
        element={<Navigate to={ERoutes.ROOT} replace />}
      />
    </Routes>
  );
};

export default RoutesContainer;
