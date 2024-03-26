import styled from 'styled-components';

const Container = styled.div`
  padding: 10% 5%;
  margin: auto;
`;

const Empty = styled.img`
  width: 150px;
  height: 154px;
`;

const NoQuestion = () => {
  return (
    <Container>
      <Empty src="/icons/Empty.svg" />
    </Container>
  );
};

export default NoQuestion;
