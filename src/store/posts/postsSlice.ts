import { createSlice, createAsyncThunk, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { sub } from 'date-fns';
import { User } from '../../store/users/usersSlice';
import axios from 'axios';

export interface Post {
  id: string;
  title: string;
  body: string;
  date: string;
  userId?: User['id'];
  tags?: string[];
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}
interface InitialState {
  allPosts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: InitialState = {
  allPosts: [],
  status: 'idle',
  error: undefined,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(`${import.meta.env.VITE_POST_API_URL}/posts?limit=0`);
  // console.log(response.data);
  return response.data.posts;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost: Record<string, unknown>) => {
  const defaultUserId = 100;
  const postData = {
    ...newPost,
    userId: newPost.userId || defaultUserId, // Use provided userId or defaultUserId if not provided
  };

  const response = await axios.post(`${import.meta.env.VITE_POST_API_URL}/posts/add`, postData);
  // console.log(response.data);
  return response.data;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, { payload }: PayloadAction<Post>) {
        state.allPosts.push(payload);
      },
      prepare(title: Post['title'], body: Post['body'], userId: Post['userId']) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, { payload }: PayloadAction<{ postId: Post['id']; reaction: keyof Post['reactions'] }>) {
      const { postId, reaction } = payload;
      const existingPost = state.allPosts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add date and reactions
        let min = 1;
        const loadedPosts: Post[] = action.payload.map((post: Post) => {
          post.id = nanoid();
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        console.log();

        // Add fetched posts to the array
        state.allPosts = state.allPosts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, { payload }) => {
        payload.id = nanoid();
        payload.date = new Date().toISOString();
        payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        // console.log(payload);

        state.allPosts = [...state.allPosts, payload];
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.allPosts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
