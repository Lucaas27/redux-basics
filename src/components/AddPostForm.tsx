import { SetStateAction, useState } from 'react';
import { postAdded } from '../store/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAllUsers } from '../store/users/usersSlice';

const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const users = useAppSelector(selectAllUsers);

  const onTitleChanged = (e: { target: { value: SetStateAction<string> } }) => setTitle(e.target.value);
  const onContentChanged = (e: { target: { value: SetStateAction<string> } }) => setContent(e.target.value);
  const onAuthorChanged = (e: { target: { value: SetStateAction<string> } }) => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
    }
  };

  const canBeSaved = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
        <label htmlFor="postAuthor">Author:</label>
        <select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <button type="button" onClick={onSavePostClicked} disabled={!canBeSaved}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
