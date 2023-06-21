import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { Container, CssBaseline, SxProps, Theme } from '@mui/material';

import { store, history } from 'src/store';

import RoutesContainer from 'src/containers/routes-container';

export enum ERoutes {
  NOT_EXIST = '*',
  ROOT = '/',
  POKEMON = 'pokemon/:name',
}

const containerStyles: SxProps<Theme> = {
  paddingTop: { xs: 2, md: 4 },
  paddingX: { xs: 2, md: 4 },
  paddingBottom: { xs: 4 },
};

export function App() {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <CssBaseline />

        <Container sx={{ ...containerStyles }}>
          <RoutesContainer />
        </Container>
      </HistoryRouter>
    </Provider>
  );
}

export default App;
