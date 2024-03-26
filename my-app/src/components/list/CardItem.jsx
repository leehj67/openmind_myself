import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from 'context/ThemeContext';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 186px;
  height: 187px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--gray40, #818181);
  background: var(--gray10, #fff);
  font-family: Pretendard;
  transition: all 0.1s linear;

  &:hover {
    border: 2px solid var(--brown30);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.08);
    transform: translateY(-3%);
  }

  @media (max-width: 661px) {
    min-width: 155.5px;
    padding: 16px;
  }
`;

const CardHeader = styled.div`
  width: 100%;
  margin-bottom: 12px;

  @media (max-width: 661px) {
    min-width: 123.5px;
  }
`;

const Profile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 12px;

  @media (max-width: 661px) {
    width: 48px;
    height: 48px;
  }
`;

const Title = styled.h2`
  color: var(--gray60, #000);
  font-size: 20px;
  font-weight: 400;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MessageIcon = styled.img`
  width: 18px;
  height: 18px;
  filter: ${({ theme }) => theme === 'dark' ? 'invert(100%) sepia(0%) saturate(1881%) hue-rotate(322deg) brightness(111%) contrast(62%)' : 'none'};

  @media (max-width: 661px) {
    width: 16px;
    height: 16px;
  }
`;

const Text = styled.p`
  color: var(--gray40ToGray20);
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 661px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const CardItem = ({ id, name, imageSource, questionCount }) => {
  const userInfo = localStorage.getItem('user');
  const parsedInfo = JSON.parse(userInfo);
  const { themeMode } = useTheme();

  const toAnswer = parsedInfo && Object.keys(parsedInfo).indexOf(String(id)) + 1;

  return (
    <Link to={toAnswer ? `/post/${id}/answer` : `/post/${id}`}>
      <Card>
        <CardHeader>
          <Profile src={imageSource} alt="profile" />
          <Title>{name}</Title>
        </CardHeader>
        <CardFooter>
          <CommentBox>
            <MessageIcon theme={themeMode} src="/icons/commentIcon.png" alt="comment" />
            <Text>받은 질문</Text>
          
</CommentBox>
<Text>{questionCount}</Text>
</CardFooter>
</Card>
</Link>
);
};

export default CardItem;
