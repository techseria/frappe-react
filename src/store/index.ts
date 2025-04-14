import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import uiReducer from './uiSlice';

const rootReducer = combineReducers({
  ui: uiReducer
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: import.meta.env.MODE !== 'production'
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
