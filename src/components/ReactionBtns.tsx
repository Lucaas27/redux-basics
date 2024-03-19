import { useAppDispatch } from '../store/hooks';
import { Post, reactionAdded } from '../store/posts/postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionBtns = ({ post }: { post: Post }) => {
  const dispatch = useAppDispatch();
  const reactionBtns = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const reaction = name as keyof typeof reactionEmoji; // Explicitly cast name to keyof typeof reactionEmoji

    return (
      <button
        type="button"
        key={reaction}
        className="reactionButton"
        onClick={() => {
          dispatch(reactionAdded({ postId: post.id, reaction }));
        }}
      >
        {emoji} {post.reactions[reaction]}
      </button>
    );
  });

  return <div>{reactionBtns}</div>;
};

export default ReactionBtns;
