import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../store/posts/postsSlice';
import usersReducer from '../store/users/usersSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
