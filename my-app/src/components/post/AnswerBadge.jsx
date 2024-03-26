import styled from 'styled-components';

// const [isAnswered, setIsAnswered] = useState(false);

const StyledBadge = styled.div`
  display: inline;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isAnswered }) =>
    $isAnswered ? 'var(--brown40)' : 'var(--gray40ToGray20)'};
  border-radius: 8px;
  border: 1px solid
    ${({ $isAnswered }) => ($isAnswered ? 'var(--brown40)' : 'var(--gray40ToGray20)')};
  padding: 4px 12px;
  height: 26px;
`;

const AnswerBadge = ({ isAnswered }) => {
  return (
    <StyledBadge $isAnswered={isAnswered}>
      {isAnswered ? '답변 완료' : '미답변'}
    </StyledBadge>
  );
};

export default AnswerBadge;
