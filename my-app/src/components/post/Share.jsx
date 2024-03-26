import React, { useState } from 'react';
import Button from 'components/common/Button';
import * as Icons from 'components/common/Icons';
import { CopyToClipboard } from 'react-copy-to-clipboard/src';
import { shareFacebook, shareKakao } from 'utils/shareUtils';
import styled from 'styled-components';
import Toast from 'components/common/Toast';

const Container = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;
const Share = () => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1000);
  };

  return (
    <>
      <Container>
        <CopyToClipboard
          className="CopyLink"
          text={window.location.href}
          onCopy={handleShowToast}
        >
          <Button varient="icon">
            <Icons.LinkCopy />
          </Button>
        </CopyToClipboard>
        <Button varient="icon" onClick={shareKakao}>
          <Icons.Kakao />
        </Button>
        <Button varient="icon" onClick={shareFacebook}>
          <Icons.Facebook />
        </Button>
      </Container>

      <Toast show={showToast}>클립보드에 복사되었습니다</Toast>
    </>
  );
};

export default Share;
