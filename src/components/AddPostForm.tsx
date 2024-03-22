import { ChangeEvent, useState } from 'react';
import { addNewPost } from '../store/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAllUsers } from '../store/users/usersSlice';

const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [addPostReqStatus, setAddPostReqStatus] = useState('idle');
  const users = useAppSelector(selectAllUsers);

  const canBeSaved = [title, body].every(Boolean) && addPostReqStatus === 'idle';
  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onBodyChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(Number(e.target.value));

  const onSavePostClicked = () => {
    if (canBeSaved) {
      try {
        setAddPostReqStatus('pending');
        dispatch(addNewPost({ title, body, userId })).unwrap();
        setBody('');
        setTitle('');
        setUserId(undefined);
      } catch (error) {
        console.log('Failed to save the post', error);
      } finally {
        setAddPostReqStatus('idle');
      }
    }
  };

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
        <label htmlFor="postBody">Body:</label>
        <textarea id="postBody" name="postBody" value={body} onChange={onBodyChanged} />
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
