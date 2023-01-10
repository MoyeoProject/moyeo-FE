import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';

import authReducer from './modules/authSlice';
import homeReducer from './modules/homeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
