import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BackgroundModal = styled.div`
  background-color: rgba(0, 0, 0, 0.56);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 40px 40px 70px 40px;
  border-radius: 24px;
  background-color: var(--gray10);
  box-shadow: 0px 16px 20px 0px rgba(48, 48, 48, 0.62);
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 767px) {
    min-width: 327px;
    width: calc(100% - 48px);
    height: 568px;
    left: calc(50% - 24px);
    padding: 24px;
    margin: 0 24px;
  }
`;

const ModalTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ModalTitle = styled.h1`
  color: var(--gray60);
  font-family: 'Actor', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  line-height: 30px;

  @media (max-width: 767px) {
    font-size: 20px;
    line-height: 25px;
  }
`;

const CloseButton = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;

  @media (max-width: 767px) {
    width: 22px;
    height: 22px;
  }
`;

export const ToQuestionBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  color: var(--gray60);
  font-weight: 400;
  font-family: Actor;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 12px;
`;

export const TextStyle = styled.h2`
  color: var(--gray60);
  font-weight: 400;
  font-family: Pretendard;
  font-size: 16px;
  line-height: 22px;
`;

const Modal = ({ width, height, title, onClick, children }) => {
  const ref = useRef(null);
  const MessagesIconSize = 28;

  useEffect(() => {
    function handleClickOutside(event) {
    
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <BackgroundModal>
      <ModalContainer ref={ref} width={width} height={height}>
        <ModalTop>
          <ModalHeader>
            <img
              src="/icons/Messages.svg"
              alt="Message Icon"
              width={MessagesIconSize}
              height={MessagesIconSize}
            />
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          <CloseButton
            src="/icons/Close.svg"
            alt="Modal Close Icon"
            onClick={onClick}
          />
        </ModalTop>
        {children}
      </ModalContainer>
    </BackgroundModal>
  );
};

export default Modal;
