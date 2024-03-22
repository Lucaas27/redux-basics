import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

export interface User {
  id: number | undefined;
  name: string;
}

interface InitialState {
  allUsers: User[];
}

const initialState: InitialState = {
  allUsers: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${import.meta.env.VITE_POST_API_URL}/users?limit=0`);
  const users = response.data.users;

  // Change user at index 99
  if (users.length >= 100) {
    // Ensure there are at least 100 users
    users[99] = { id: 100, firstName: 'Unknown', lastName: 'User' }; // Change the user at index 99
  } else {
    console.error('Not enough users in the array.');
  }

  // console.log( users);

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      payload.map((user: Record<string, unknown>) => {
        user.name = `${user.firstName} ${user.lastName}`;
        return user;
      });
      state.allUsers = payload;
    });
  },
});

export const selectAllUsers = (state: RootState) => state.users.allUsers;

export default usersSlice.reducer;
