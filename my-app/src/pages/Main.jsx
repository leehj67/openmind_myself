import UserBox from '../components/main/UserBox.jsx';
import LogoBox from '../components/common/LogoBox.jsx';
import styled from 'styled-components';
import Button from '../components/common/Button.jsx';
import { Link } from 'react-router-dom';
import ThemeToggleButton from 'components/common/ThemeToggleButton.jsx';
import { useTheme } from 'context/ThemeContext.jsx';

const StyledBody = styled.div``;

const MainContainer = styled.div`
  background: ${({ theme }) =>
      theme === 'dark'
        ? `url('/images/Background_Image_DarkMode.svg')`
        : `url('/images/background_image.svg')`}
    no-repeat center;
  background-size: contain;

  position: relative;
  width: 100%;
  height: 100vh;
`;

const MainLogo = styled(LogoBox)`
  display: flex;
  justify-content: center;
  padding-top: 10%;
  margin: auto;

  width: 456px;

  @media (max-width: 767px) {
    width: 248px;
  }
`;

const HeadButton = styled(Button)`
  position: absolute;
  top: 45px;
  right: 6%;

  @media (max-width: 767px) {
    position: static;
    display: flex;
    justify-content: center;
    margin: 10% auto;
    height: 34px;
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const Main = () => {
  const { themeMode, toggleTheme } = useTheme();
  return (
    <StyledBody>
      <MainContainer theme={themeMode}>
        <ThemeToggleButton toggle={toggleTheme} mode={themeMode} />
        <MainLogo />
        <Link to="/list?page=1&sort=createdAt">
          <HeadButton width={160} bright={true}>
            질문하러 가기 →
          </HeadButton>
        </Link>
        <UserBox />
      </MainContainer>
    </StyledBody>
  );
};

export default Main;
