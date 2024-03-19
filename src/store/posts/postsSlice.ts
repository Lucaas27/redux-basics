import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { sub } from 'date-fns';
import { PostAuthorProps } from '../../components/PostAuthor';

export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  userId?: PostAuthorProps['userId'];
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}

const initialState: Post[] = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '2',
    title: 'Slices...',
    content: 'The more I say slice, the more I want pizza.',
    date: sub(new Date(), { minutes: 20 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, { payload }: PayloadAction<Post>) {
        state.push(payload);
      },
      prepare(title: string, content: string, userId: PostAuthorProps['userId']) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
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
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
