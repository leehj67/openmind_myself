import PostItem from './PostItem';
import NoQuestion from './NoQuestion';
import { useParams } from 'react-router-dom';

const PostList = ({ postData, setPostData }) => {
  const { postId } = useParams();

  // postData.results는 해당 Post 페이지 내에 존재하는 질문들을 담은 배열입니다.
  if (!postData) return <></>;
  return postData.length === 0 ? (
    <NoQuestion />
  ) : (
    postData.map(item => (
      <PostItem
        key={item.id}
        qnaData={item}
        setPostData={setPostData}
        postId={postId}
      />
    ))
  );
};

export default PostList;
