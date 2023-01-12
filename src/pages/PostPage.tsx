import PostContentForm from '../components/PostContentForm';
import TopNavBar from '../components/common/TopNavBar';

export default function PostPage() {
  return (
    <>
      <TopNavBar name={'post'} />
      <br />
      <br />

      <PostContentForm />
      <br />
      <br />
    </>
  );
}
