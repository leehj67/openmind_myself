import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { createquestion } from 'api'; // 수정된 부분
import { useParams } from 'react-router-dom';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  font-family: Pretendard;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: ${({ $height }) => $height}px;
  padding: 16px;
  border-radius: 8px;
  background: var(--gray20, #f9f9f9);
  border: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  resize: none;
`;

const Editor = ({ placeholder, width, height, ModalClose, setPostData }) => {
  const [question, setQuestion] = useState('');
  const { postId } = useParams();

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handlePostQuestion = async () => {
    try {
      const response = await createquestion(postId, question); // 수정된 부분
      setPostData((prev) => [response, ...prev]);
      ModalClose();
    } catch (error) {
      console.error('Failed to post question', error);
    }
    setQuestion(''); // Ensure this is always reset, even if there's an error.
  };

  return (
    <EditorContainer>
      <TextArea
        placeholder={placeholder}
        $height={height}
        onChange={handleInputChange}
        value={question}
      />
      <Button
        onClick={handlePostQuestion}
        $inactive={question.trim().length === 0}
        $width={width}
      >
        질문 보내기
      </Button>
    </EditorContainer>
  );
};

export default Editor;
