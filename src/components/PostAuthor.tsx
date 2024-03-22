import { useAppSelector } from '../store/hooks';
import { selectAllUsers, User } from '../store/users/usersSlice';

const PostAuthor = ({ userId }: { userId: User['id'] }) => {
  const users = useAppSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);
  return <span>by {author ? author.name : 'Unknown author'}</span>;
};
export default PostAuthor;
