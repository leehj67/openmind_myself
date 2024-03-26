import React from 'react';
import styled from 'styled-components';
import CardList from 'components/list/CardList';
import LogoBox from 'components/common/LogoBox';
import Button from 'components/common/Button';
import Title from 'components/list/Title';
import Filter from 'components/list/Filter';
import { Link } from 'react-router-dom';
import { useModal } from 'hooks/useModal';
import ModalContainer from 'components/common/Modal';
import ModalProfileList from 'components/common/ModalProfileList';
import { useTheme } from 'context/ThemeContext';
import ThemeToggleButton from 'components/common/ThemeToggleButton';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1020px;
  min-width: 375px;
  padding: 40px 40px;
  margin: 0 auto;

  @media (max-width: 661px) {
    flex-direction: column;
    padding: 40px 40px 52px;
    gap: 20px;
  }
`;

const MainLogo = styled(LogoBox)`
  display: flex;
  width: 146px;
  min-height: 57.625px;
  justify-content: center;
  align-items: center;
`;

const HeadButton = styled(Button)`
  @media (max-width: 661px) {
    width: 130px;
    height: 42px;
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const Section = styled.section`
  margin: 0 32px;

  @media (max-width: 661px) {
    min-width: 331px;
    margin: 0 24px;
  }
`;

const TitleFilterArea = styled.div`
  width: 341px;
  min-height: 95.5px;
  margin: 0 auto 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  @media (max-width: 661px) {
    width: auto;
    min-height: 36px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 18px;
  }
`;

const List = () => {
  const { openModal, handleModalOpen, handleModalClose } = useModal();
  const { themeMode, toggleTheme } = useTheme();

  return (
    <>
      <ThemeToggleButton toggle={toggleTheme} mode={themeMode} />
      {openModal && (
        <ModalContainer
          width={540}
          height={400}
          title="어떤 프로필로 이동할까요?"
          onClick={handleModalClose}
        >
          <ModalProfileList></ModalProfileList>
        </ModalContainer>
      )}
      <Header>
        <Link to="/">
          <MainLogo />
        </Link>
        <HeadButton
          width={160}
          bright={true}
          onClick={() => {
            handleModalOpen();
          }}
        >
          답변하러 가기 →
        </HeadButton>
      </Header>
      <Section>
        <TitleFilterArea>
          <Title />
          <Filter />
        </TitleFilterArea>
        <CardList />
      </Section>
    </>
  );
};

export default List;
