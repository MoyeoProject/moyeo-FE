import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import authReducer from './modules/authSlice';
import homeReducer from './modules/homeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
