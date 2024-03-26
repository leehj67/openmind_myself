import Button from 'components/common/Button';
import LogoBox from '../components/common/LogoBox.jsx';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const WarnMessage = styled.h1`
  color: var(--gray50);
  font-size: 40px;
  font-weight: 600;
  font-family: Pretsendard;
`;

const Description = styled.p`
  color: var(--gray60);
  font-size: 24px;
  font-weight: 400;
  font-family: Pretendard;
`;

const SubDescription = styled(Description)`
  font-size: 18px;
`;

const MainLogo = styled(LogoBox)`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 40px;
  margin: auto;
  width: 314px;

  @media (max-width: 767px) {
    width: 248px;
  }
`;

const ToHome = styled(Link)`
  color: var(--brown40);
  font-size: 18px;
  font-weight: 400;
  font-family: Pretendard;
`;

const NotFound = () => {
  return (
    <Container>
      <Content>
        <WarnMessage>404 ERROR</WarnMessage>
        <Description>
          죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
        </Description>
        <SubDescription>
          입력하신 주소가 맞는지 다시 확인해 주세요.
        </SubDescription>
        <MainLogo />
        <ToHome to="/">
          <Button width={160} bright={true}>
            홈으로 돌아가기
          </Button>
        </ToHome>
      </Content>
    </Container>
  );
};

export default NotFound;
