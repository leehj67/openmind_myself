// 미답변/답변완료 뱃지, 질문&답변 본문, 좋아요&싫어요 버튼 전체를 감싸는 컴포넌트
import styled from 'styled-components';
import AnswerBadge from './AnswerBadge';
import Reactions from './Reactions';
import QnAItem from './QnAItem';
import Kebab from 'components/post/Kebab';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  createAnswer,
  deleteAnswer,
  deleteQuestion,
  editAnswer,
} from '../../api';
import { useSubject } from 'context/subjectContext';
import { handleAsyncOperation } from 'utils/asyncUtils';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 32px;

  border-radius: 16px;
  background-color: var(--gray10);
  box-shadow: 0 4px 4px 0 #8c8c8c40;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostItem = ({ qnaData, setPostData, postId }) => {
  // 현재 내가 있는 페이지가 답변하기(/answer)페이지인지 구별합니다.
  const { pathname } = useLocation();
  const paths = pathname.split('/');
  const isAnswerPage = paths[paths.length - 1] === 'answer';
  const { currentSubject, setCurrentSubject } = useSubject();

  // 수정 모드를 정하는 상태입니다.
  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteQuestion = () => {
    const onDeleteSuccess = (res, count) => {
      const updatedSubject = { ...currentSubject };
      updatedSubject.questionCount = count;

      setPostData(() => res);
      setCurrentSubject(updatedSubject);
    };

    const onDeleteError = error => {
      console.error('질문을 삭제하는데 문제가 생겼습니다.', error);
    };

    const asyncHandler = handleAsyncOperation(
      () => deleteQuestion(qnaData.id),
      postId,
      onDeleteSuccess,
      onDeleteError,
    );

    asyncHandler();
  };

  const handleDeleteAnswer = () => {
    if (!qnaData.answer) {
      alert('삭제할 답변이 없어요.😭');
      return;
    }
    const asyncHandler = handleAsyncOperation(
      () => deleteAnswer(qnaData.answer.id),
      postId,
      results => setPostData(() => results),
      error => console.error('답변을 삭제하는데 문제가 생겼습니다.', error),
    );

    asyncHandler(); //useCallback으로 생성된 콜백을 호출
  };

  const handleRejectAnswer = () => {
    // 기존에 답변이 존재하지 않는 경우에는 '답변 거절' 이라는 본문을 넣은 새로운 답변을 생성하며,
    if (!qnaData.answer) {
      const asyncHandler = handleAsyncOperation(
        () => createAnswer(qnaData.id, '답변 거절', true),
        postId,
        results => setPostData(() => results),
        error => console.error('답변을 거절하는데 문제가 생겼습니다.', error),
      );

      asyncHandler();
    }
    // 기존에 답변이 존재하는 경우에는 기존 답변의 내용을 담아 isRejected 상태만 수정하여 서버에 보냅니다.
    else {
      const asyncHandler = handleAsyncOperation(
        () => editAnswer(qnaData.answer.id, qnaData.answer.content, true),
        postId,
        results => setPostData(() => results),
        error => console.error('답변을 거절하는데 문제가 생겼습니다.', error),
      );

      asyncHandler();
    }
  };

  if (!qnaData) return <></>;

  return (
    <PostContainer>
      <HeadContainer>
        <AnswerBadge isAnswered={qnaData.answer} />
        {/*케밥은 답변하기 페이지에서만 나타납니다.*/}
        {isAnswerPage && (
          <Kebab
            onEditClick={() => {
              if (!qnaData.answer) alert('수정할 답변이 없어요.😭');
              else setIsEdit(true);
            }}
            onDeleteQuestionClick={handleDeleteQuestion}
            onDeleteAnswerClick={handleDeleteAnswer}
            onRejectClick={handleRejectAnswer}
          />
        )}
      </HeadContainer>
      <div>
        {qnaData && (
          <QnAItem
            qnaData={qnaData}
            isAnswerPage={isAnswerPage}
            isEdit={isEdit}
            onEditCancel={() => setIsEdit(false)}
            setPostData={setPostData}
          />
        )}
      </div>
      <Reactions qnaData={qnaData} />
    </PostContainer>
  );
};

export default PostItem;
