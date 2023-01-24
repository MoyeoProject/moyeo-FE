import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';

import authReducer from './modules/authSlice';

const store = configureStore({
  reducer: { auth: authReducer },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
