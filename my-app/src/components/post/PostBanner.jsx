import React from 'react';
import LogoBox from 'components/common/LogoBox';
import Avatar from 'components/common/Face';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from 'context/ThemeContext';

const BannerContainer = styled.div`
  height: 234px;
  margin-bottom: 90px;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  background: ${({ theme }) =>
      theme === 'dark'
        ? `url('/images/Banner_DarkMode.svg')`
        : `url('/images/Banner.svg')`}
    no-repeat center;
  background-size: contain;

  @media (max-width: 767px) {
    height: 177px;
  }
`;

const PostLogo = styled(LogoBox)`
  margin-top: 30px;
  width: 170px;

  @media (max-width: 767px) {
    width: 124px;
  }
`;

const PostAvatar = styled(Avatar)`
  position: absolute;
  bottom: -36px;
  left: 0;
  right: 0;
  margin: auto;

  @media (max-width: 767px) {
    width: 104px;
    height: 104px;
  }
`;

const PostUserName = styled.div`
  position: absolute;
  bottom: -80px;
  color: var(--gray60);
  font-size: 32px;
  font-weight: 400;
`;

const PostBanner = ({ userProfileImage, userName }) => {
  const { themeMode } = useTheme();
  return (
    <BannerContainer theme={themeMode}>
      <Link to="/list?page=1&sort=createdAt">
        <PostLogo />
      </Link>
      <PostAvatar imageSrc={userProfileImage} />
      <PostUserName>{userName}</PostUserName>
    </BannerContainer>
  );
};

export default PostBanner;
