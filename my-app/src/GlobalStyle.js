import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --gray10: ${({ theme }) => theme.gray10};
    --gray20: ${({ theme }) => theme.gray20};
    --gray30: ${({ theme }) => theme.gray30};
    --gray40: ${({ theme }) => theme.gray40};
    --gray50: ${({ theme }) => theme.gray50};
    --gray60: ${({ theme }) => theme.gray60};

    --brown10: ${({ theme }) => theme.brown10};
    --brown20: ${({ theme }) => theme.brown20};
    --brown30: ${({ theme }) => theme.brown30};
    --brown40: ${({ theme }) => theme.brown40};
    --brown50: ${({ theme }) => theme.brown50};

    --btColor1: ${({ theme }) => theme.btColor1};
    --btColor2: ${({ theme }) => theme.btColor2};
    --btFontColor1: ${({ theme }) => theme.btFontColor1};
    --btFontColor2: ${({ theme }) => theme.btFontColor2};
    --btBorderColor: ${({ theme }) => theme.btBorderColor};
    --feedColor: ${({ theme }) => theme.feedColor};
    --brownToGray: ${({ theme }) => theme.brownToGray};
    --gray40ToGray20: ${({ theme }) => theme.gray40ToGray20};
    --filterColor: ${({ theme }) => theme.filterColor};
    --rejectionColor: ${({ theme }) => theme.rejectionColor};

    --blue: #1877f2;
    --yellow: #fee500;
    --red: #b93333;

    --shadow-1pt: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
    --shadow-2pt: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    --shadow-3pt: 0px 16px 20px 0px rgba(48, 48, 48, 0.62);
  }


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input:focus {
    outline: none;
  }

  button {
    border: none;
    padding: unset;
    background-color: unset;
    cursor: pointer;
  }

  body {
    background-color: ${({ theme }) => theme.bgColor};
  }

`;

export default GlobalStyle;
