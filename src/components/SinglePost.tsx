import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionBtns from './ReactionBtns';
import { Post } from '../store/posts/postsSlice';
import Tags from './Tags';

const SinglePost = ({ post }: { post: Post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}...</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionBtns post={post} />
      {post.tags ? <Tags tags={post.tags} /> : ''}
    </article>
  );
};
export default SinglePost;
