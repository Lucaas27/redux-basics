import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectAllPosts, fetchPosts, getPostsError, getPostsStatus } from '../store/posts/postsSlice';
import { useEffect } from 'react';
import SinglePost from './SinglePost';

const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const postsError = useAppSelector(getPostsError);
  const postsStatus = useAppSelector(getPostsStatus);

  useEffect(() => {
    postsStatus === 'idle' ? dispatch(fetchPosts()) : '';
  }, [postsStatus, dispatch]);

  let body;
  if (postsStatus === 'loading') {
    body = <p>Loading...</p>;
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    body = orderedPosts.map((post) => <SinglePost key={post.id} post={post} />);
  } else if (postsStatus === 'failed') {
    body = <p>{postsError}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {body}
    </section>
  );
};
export default PostsList;
