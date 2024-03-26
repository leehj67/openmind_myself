import Button from 'components/common/Button';
import { useState } from 'react';
import UserInputForm from './UserInputForm';
import { createInterviewer } from 'api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { setLocalStorage } from 'utils/useLocalStorage';

const UserBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: auto;
  margin-top: 5%;
  max-width: 400px;
  background-color: var(--gray10);
  padding: 24px;
  border-radius: 16px;

  @media (max-width: 767px) {
    width: 305px;
  }
`;

const SubmitButton = styled(Button)`
  margin: auto;
  @media (max-width: 767px) {
    width: 257px;
  }
`;

const UserBox = () => {
  const [nickName, setNickName] = useState(null);

  const navigate = useNavigate();

  const checkEmptyNickName = () => {
    return nickName;
  };

  const handleChangeNickName = e => {
    setNickName(e.target.value);
  };

  const handleQuestionClick = () => {
    const isFilled = checkEmptyNickName();

    if (isFilled) {
      createInterviewer(nickName).then(result => {
        setLocalStorage(result.id, result.name);
        navigate(`/post/${result.id}/answer`);
      });
    } else {
      alert('닉네임을 입력해주세요.');
    }
  };

  return (
    <UserBoxContainer>
      <UserInputForm onChange={handleChangeNickName} />
      <SubmitButton onClick={handleQuestionClick} width={336} minWidth={257}>
        질문 받기
      </SubmitButton>
    </UserBoxContainer>
  );
};

export default UserBox;
