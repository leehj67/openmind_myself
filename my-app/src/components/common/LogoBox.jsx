import { useTheme } from "context/ThemeContext";
import styled, { withTheme } from "styled-components";

// StyledLogo 컴포넌트에 withTheme HOC를 적용하여 theme prop을 자동으로 받을 수 있도록 함
const StyledLogo = withTheme(styled.img`
  filter: ${({ theme }) =>
    theme.mode === 'dark' // theme 객체 구조에 따라 경로를 수정할 수 있음
      ? "invert(100%) sepia(2%) saturate(3102%) hue-rotate(298deg) brightness(91%) contrast(85%)"
      : "none"};
`);

const LogoBox = ({ className }) => {
  // useTheme 훅을 사용하여 테마 모드를 가져옵니다.
  // StyledLogo에 theme prop을 직접 전달하지 않아도, withTheme를 사용하여 자동으로 theme prop이 주입됩니다.
  return (
    <StyledLogo src="/icons/logo.svg" alt="Open Mind Logo" className={className} />
  );
};

export default LogoBox;
