import { useTheme } from 'context/ThemeContext';
import styled from 'styled-components';

const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--brownToGray);
`;

const StyledImg = styled.img`
  filter: ${({ theme }) =>
    theme === 'dark'
      ? 'invert(87%) sepia(0%) saturate(33%) hue-rotate(227deg) brightness(100%) contrast(84%)'
      : 'none'};
`;

const PostCount = ({ questionCount }) => {
  const { themeMode } = useTheme();

  const questionExistence = !questionCount
    ? '아직 질문이 없습니다.'
    : `${questionCount}개의 질문이 있습니다.`;

  return (
    <StyledTitle>
      <StyledImg
        theme={themeMode}
        src="/icons/Messages.svg"
        alt="Message Icon"
      />
      {questionExistence}
    </StyledTitle>
  );
};

export default PostCount;
