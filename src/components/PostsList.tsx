import { useAppSelector } from '../store/hooks';
import { selectAllPosts } from '../store/posts/postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionBtns from './ReactionBtns';

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => {
    return (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
        <p className="postCredit">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionBtns post={post} />
      </article>
    );
  });
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
export default PostsList;
