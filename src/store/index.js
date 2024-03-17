import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categorySlice from './categorySlice/categorySlice';
import itemsSlice from './itemsSlice/itemsSlice';

const rootReducer = combineReducers({ category: categorySlice, items: itemsSlice });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.lastVisibleItem', 'meta.arg'],
        ignoredPaths: ['items.lastVisibleItem'],
      },
    }),
});
