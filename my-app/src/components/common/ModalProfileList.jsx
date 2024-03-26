import React from 'react';
import styled from 'styled-components';
import NoProfile from './NoProfile';
import { Link } from 'react-router-dom';
import { useModal } from 'hooks/useModal';

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  min-height: 270px;
  padding-bottom: 15px;
`;

const Profile = styled.div`
  text-align: center;
  width: 250px;
  padding: 10px;
  color: var(--gray60);
  font-size: 20px;
  font-weight: 400;
  line-height: 22px;

  &:hover {
    background-color: var(--brown30);
    border: none;
    border-radius: 10px;
  }
`;

const ModalProfileList = () => {
  const { handleModalClose } = useModal();

  const userInfo = localStorage.getItem('user');
  const parsedInfo = JSON.parse(userInfo);

  const userArray =
    parsedInfo &&
    Object.entries(parsedInfo).map(([id, name]) => ({
      id: id,
      name: name,
    }));

  if (!parsedInfo) {
    return (
      <>
        <NoProfile />
      </>
    );
  }

  return (
    <StyledContainer>
      {userArray.map(user => (
        <Link key={user.id} to={`/post/${user.id}/answer`} onClick={handleModalClose}>
          <Profile key={user.id}>{`${user.name}`}</Profile>
        </Link>
      ))}
    </StyledContainer>
  );
};

export default ModalProfileList;
