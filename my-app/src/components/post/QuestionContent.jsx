// 사용자의 닉네임, 질문/답변 생성 시간, 질문/답변 본문 내용을 담는 컴포넌트
import React from 'react';
import styled from 'styled-components';
import AnswerInputForm from './AnswerInputForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

const SubInformation = styled.div`
  display: flex;
  gap: 6px;
`;

const SubText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ type }) =>
    type === 'question' ? 'var(--gray40ToGray20)' : 'var(--gray60)'};
`;

const TimeText = styled(SubText)`
  color: var(--gray40ToGray20);
`;

const TextContents = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${({ type }) =>
    type === 'rejected answer' ? 'var(--rejectionColor)' : 'var(--gray60)'};
`;

// 일반적인 답변을 보여줄지, 답변 거절 UI를 보여줄지, 답변 생성 input을 보여줄지, 답변 수정 Input을 보여줄지는 type props로 구분합니다.
const QuestionContent = ({
  subInformation,
  time,
  textContents,
  type,
  questionId,
  answerId,
  isEdit,
  onEditCancel,
  setPostData,
}) => {
  return (
    <Container>
      <SubInformation>
        <SubText type={type}>{subInformation}</SubText>
        <TimeText>{time}</TimeText>
      </SubInformation>
      {type === 'create answer' ? (
        // 답변 생성일 경우에 input을 렌더링 하며, API 호출시 필요한 questionId를 추가적으로 보내줍니다.
        <AnswerInputForm
          questionId={questionId}
          placeholder="답변을 입력해주세요"
          buttonText="답변 완료"
          type={type}
          setPostData={setPostData}
        />
      ) : type === 'edit answer' ? (
        // 답변 수정일 경우에 input을 렌더링 하며, API 호출시 필요한 answerId, 수정모드인지 아닌지 상태, 수정 취소 시 실행할 함수를 추가적으로 보내줍니다.
        // originalAnswer={textContents} -> 원본 답변 내용을 prop으로 전달
        <AnswerInputForm
          buttonText="수정 완료"
          type={type}
          answerId={answerId}
          originalAnswer={textContents}
          isEdit={isEdit}
          onEditCancel={onEditCancel}
          setPostData={setPostData}
        >
          {textContents}
        </AnswerInputForm>
      ) : (
        // 이외의 경우 일반적인 답변을 보여줍니다.
        <TextContents type={type}>{textContents}</TextContents>
      )}
    </Container>
  );
};

export default QuestionContent;
