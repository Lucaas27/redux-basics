import { Post } from '../store/posts/postsSlice';

const Tags = ({ tags }: { tags: Post['tags'] }) => {
  return (
    <div className="tags">
      {tags?.map((tag, i) => {
        return <p key={`tag_${i}_${tag}`}>{tag}</p>;
      })}
    </div>
  );
};
export default Tags;
