import { configureStore } from '@reduxjs/toolkit';

import authReducer from './modules/authSlice';
import homeReducer from './modules/homeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
});

export default store;
