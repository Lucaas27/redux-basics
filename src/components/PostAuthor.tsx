import { useAppSelector } from '../store/hooks';
import { selectAllUsers } from '../store/users/usersSlice';

export interface PostAuthorProps {
  userId: string | undefined;
}

const PostAuthor = ({ userId }: PostAuthorProps) => {
  const users = useAppSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);
  return <span>by {author ? author.name : 'Unknown author'}</span>;
};
export default PostAuthor;
