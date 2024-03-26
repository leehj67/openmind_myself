import React from 'react';
import styled from 'styled-components';

const ProfileImage = styled.img`
  width: ${({ width }) => (width ? width : 136)}px;
  height: ${({ height }) => (height ? height : 136)}px;
  border-radius: 50%;

  object-fit: cover;
`;
const Avatar = ({ imageSrc, className, width, height, children }) => {
  return (
    <>
      <ProfileImage
        src={imageSrc}
        className={className}
        width={width}
        height={height}
      />
    </>
  );
};

export default Avatar;
