import { useParams } from 'react-router-dom';
import NotFound from 'pages/NotFound';
import Post from 'pages/Post';

// 사용자의 게시물 접근 권한을 검사
const checkAccessToPost = postId => {
  // 로컬 스토리지에서 'user' 객체를 가져옴
  const user = JSON.parse(localStorage.getItem('user')) || {};

  // 현재 페이지의 postId가 로컬 스토리지에 저장된 게시물 ID와 일치하는지 확인
  // Object.keys(user)를 사용하여 모든 게시물 ID를 배열로 가져온 후, 현재 페이지의 postId가 이 배열에 포함되어 있는지 확인
  const hasAccess = Object.keys(user).includes(postId);

  return hasAccess;
};

const AnswerProtectedRoute = () => {
  const { postId } = useParams();
  const hasAccess = checkAccessToPost(postId);

  // 접근 권한이 없으면 NotFound 페이지를 렌더링합니다.
  if (!hasAccess) {
    return <NotFound />;
  }

  return <Post />;
};

export default AnswerProtectedRoute;
