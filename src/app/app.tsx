import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { createGlobalStyle } from 'styled-components';
import { Container, CssBaseline, SxProps, Theme } from '@mui/material';

import { store, history } from 'src/store';

import RoutesContainer from 'src/containers/routes-container';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    min-height: 100vh;
  }

  #root {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export enum ERoutes {
  NOT_EXIST = '*',
  ROOT = '/',
  POKEMON = 'pokemon/:name',
}

const containerStyles: SxProps<Theme> = {
  paddingTop: { xs: 2, md: 4 },
  paddingX: { xs: 2, md: 4 },
  marginTop: { xs: 0 },
  paddingBottom: { xs: 4 },
  flex: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  position: 'relative',
};

export function App() {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <CssBaseline />
        <GlobalStyles />

        <Container sx={{ ...containerStyles }}>
          <RoutesContainer />
        </Container>
      </HistoryRouter>
    </Provider>
  );
}

export default App;
