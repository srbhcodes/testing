import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import tabsReducer from './tabsSlice';
import presetReducer from './presetSlice';

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    tabs: tabsReducer,
    preset: presetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['tokens/updatePrices'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
