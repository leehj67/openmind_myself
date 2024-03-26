import styled from 'styled-components';
import { getTimeDifference } from 'utils/dateUtils';
import Avatar from 'components/common/Face';
import QuestionContent from 'components/post/QuestionContent';
import React from 'react';
import { useSubject } from 'context/subjectContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Answer = styled.div`
  display: flex;
  gap: 12px;
`;

const ProfileImage = styled(Avatar)``;

const QnAImageSize = 48;

const QnAItem = ({
  qnaData,
  isAnswerPage,
  isEdit,
  onEditCancel,
  setPostData,
}) => {
  const { currentSubject } = useSubject();

  if (!qnaData) {
    return <></>;
  }
  return (
    <>
      <Container>
        <QuestionContent
          subInformation="질문 ·"
          time={getTimeDifference(qnaData.createdAt)}
          textContents={qnaData.content}
          type="question"
        />
        {/*답변이 존재하고, 수정 모드가 아닐때, 일반적인 답변이 표시됩니다.*/}
        {qnaData.answer && !isEdit && (
          <Answer>
            <ProfileImage
              imageSrc={currentSubject.imageSource}
              width={QnAImageSize}
              height={QnAImageSize}
            />

            <QuestionContent
              subInformation={currentSubject.name}
              time={getTimeDifference(qnaData.answer.createdAt)}
              textContents={
                qnaData.answer.isRejected === true
                  ? '답변거절'
                  : qnaData.answer.content
              }
              type={
                qnaData.answer.isRejected === true
                  ? 'rejected answer'
                  : 'answer'
              }
            />
          </Answer>
        )}
        {/*답변 페이지에서, 답변이 존재하고, 수정모드일때 답변을 수정할 수 있는 Input이 표시됩니다.*/}
        {isAnswerPage && qnaData.answer && isEdit && (
          <Answer>
            <ProfileImage
              imageSrc={currentSubject.imageSource}
              width={QnAImageSize}
              height={QnAImageSize}
            />
            <QuestionContent
              subInformation={currentSubject.name}
              type="edit answer"
              textContents={qnaData.answer.content}
              answerId={qnaData.answer.id}
              isEdit={isEdit}
              onEditCancel={onEditCancel}
              setPostData={setPostData}
            />
          </Answer>
        )}
        {/*답변 페이지에서, 답변이 존재하지 않을 때, 답변을 생성할 수 있는 Input이 표시됩니다.*/}
        {isAnswerPage && !qnaData.answer && (
          <Answer>
            <ProfileImage imageSrc={currentSubject.imageSource} />
            <QuestionContent
              subInformation={currentSubject.name}
              questionId={qnaData.id}
              type="create answer"
              setPostData={setPostData}
            />
          </Answer>
        )}
      </Container>
    </>
  );
};

export default QnAItem;
