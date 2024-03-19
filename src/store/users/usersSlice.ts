import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = [
  {
    id: '0',
    name: 'Dude Levowski',
  },
  {
    id: '1',
    name: 'Charles Walker',
  },
  {
    id: '2',
    name: 'John Smith',
  },
];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
