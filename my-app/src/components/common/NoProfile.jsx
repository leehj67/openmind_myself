import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { Link } from 'react-router-dom';

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const Tilte = styled.h2`
  color: var(--Grayscale-60, #000);
  font-family: Actor;
  font-size: 24px;
  font-weight: 400;
`;

const NoProfile = () => {
  return (
    <StyledContainer>
      <Tilte>프로필이 없습니다!</Tilte>
      <Link to="/">
        <Button>프로필 생성하기</Button>
      </Link>
    </StyledContainer>
  );
};

export default NoProfile;
