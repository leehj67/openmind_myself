import styled from 'styled-components';
import { useTheme } from 'context/ThemeContext';

const InputContainer = styled.div`
  position: relative;

  width: 336px;
  height: 46px;

  margin: auto;

  @media (max-width: 767px) {
    width: 257px;
    height: 46px;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 25%;
  left: 10px;
  filter: ${({theme}) => theme === 'dark' ? 'invert(28%) sepia(1%) saturate(2638%) hue-rotate(352deg) brightness(96%) contrast(80%)' : 'none'};
`;
const MainInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: var(--gray20);
  &::placeholder { color: var(--gray50); }

  border-radius: 8px;
  border: 1px solid var(--gray40);
  padding: 12px 16px;
  padding-left: 34px;
  gap: 4px;
  box-sizing: border-box;
`;

const UserInputForm = ({ onChange }) => {
  const { themeMode } = useTheme();

  return (
    <InputContainer>
      <Image theme={themeMode} src="/icons/Person.svg" />
      <MainInput onChange={onChange} placeholder="이름을 입력하세요" />
    </InputContainer>
  );
};

export default UserInputForm;
