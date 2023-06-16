import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';

import MainApi, { APIStatus } from 'src/api/MainApi';
import { ErrorObject } from 'src/api/ErrorHandler';

import pokemonReducer, { PokemonState } from 'src/store/pokemon/reducers';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const mainApi = MainApi.getInstance();

export type ThunkExtra = {
  state: RootState;
  rejectValue: ErrorObject[];
  extra: {
    mainApi: MainApi;
  };
};

export const apis = {
  mainApi,
};

type CaseCallback = (
  state: CommonState,
  action: { payload: ErrorObject[] | undefined }
) => void;

export const pendingCase =
  (callback?: VoidFunction) => (state: CommonState) => {
    state.status = APIStatus.PENDING;
    if (callback) callback();
  };

export const rejectedCase =
  (callback?: CaseCallback) =>
  (state: CommonState, action: { payload: ErrorObject[] | undefined }) => {
    if (action.payload) state.errors = action.payload;

    state.status = APIStatus.REJECTED;
    if (callback) callback(state, action);
  };

export const store = configureStore({
  reducer: {
    router: routerReducer,
    pokemonReducer,
  },
  middleware: (gDM) =>
    gDM({
      thunk: { extraArgument: apis },
    }).concat(
      process.env.NODE_ENV === 'production'
        ? [routerMiddleware]
        : [routerMiddleware, logger]
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export const history = createReduxHistory(store);

export type CommonState = PokemonState;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
