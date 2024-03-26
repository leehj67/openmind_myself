// 답변을 생성하고 수정하는 input 컴포넌트
import styled from 'styled-components';
import Button from 'components/common/Button';
import { useEffect, useState } from 'react';
import { createAnswer, editAnswer, getQuestionsById } from 'api';
import { useParams } from 'react-router-dom';
import { handleAsyncOperation } from 'utils/asyncUtils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;
const StyledTextArea = styled.textarea`
  width: 100%;
  height: 186px;
  background-color: var(--gray20);
  border: none;
  border-radius: 8px;
  resize: none;
  padding: 16px;

  &::-webkit-scrollbar {
    display: none;
  }

  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const StyledCompleteButton = styled(Button)`
  width: ${({ type }) => (type === 'create answer' ? '100%' : '75%')};
`;

const StyledEditButton = styled(Button)`
  width: 25%;
`;

const AnswerInputForm = ({
  placeholder,
  children,
  questionId,
  originalAnswer = '',
  buttonText,
  type,
  answerId,
  onEditCancel,
  setPostData,
}) => {
  // children prop이 전달되면 답변 수정상황으로 판단하여, children을 초기상태로 사용
  // 그렇지 않다면 답변 생성상황으로 판단하여, 빈 문자열을 초기 상태로 사용
  const [answer, setAnswer] = useState(children || '');
  const { postId } = useParams();

  // children prop이 변경될 때마다 answer 상태를 업데이트(답변 수정 시 초기 값이 원본 답변으로 설정되도록 함)
  useEffect(() => {
    setAnswer(children || '');
  }, [children]);

  const handleChange = e => {
    setAnswer(e.target.value);
  };

  const handleCreateAnswer = () => {

    const asyncHandler = handleAsyncOperation(
      () => createAnswer(questionId, answer),
      postId,
      results => setPostData(() => results),
      error => console.error('답변을 생성하는데 문제가 생겼습니다.', error),
    );

    asyncHandler();
  };

  const handleEditAnswer = () => {
    const onEditSuccess = res => {
      setPostData(() => res);
      onEditCancel();
    };
    const asyncHandler = handleAsyncOperation(
      () => editAnswer(answerId, answer),
      postId,
      onEditSuccess,
      error => console.error('답변을 수정하는데 문제가 생겼습니다', error),
    );

    asyncHandler();

  };

  // 원본 답변과 현재 답변이 동일한지 여부를 체크
  const isAnswerUnchanged = originalAnswer.trim() === answer.trim();

  return (
    <Container>
      <StyledTextArea
        placeholder={placeholder}
        value={answer}
        onChange={handleChange}
      />
      <ButtonContainer>
        <StyledCompleteButton
          type={type}
          // 답변이 비어있거나 변경되지 않았을 때 '수정 완료'버튼 비활성화
          inactive={answer.trim() === '' || isAnswerUnchanged}
          onClick={
            type === 'create answer' ? handleCreateAnswer : handleEditAnswer
          }
        >
          {buttonText}
        </StyledCompleteButton>
        {type === 'edit answer' && (
          <StyledEditButton onClick={onEditCancel}>수정 취소</StyledEditButton>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default AnswerInputForm;
