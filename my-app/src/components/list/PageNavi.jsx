import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PaigeNation = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0 100px;

  @media (max-width: 661px) {
    margin: 30px 0 40px;
  }
`;

const PageBox = styled(Link)`
  display: flex;
  width: 40px;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Arrow = styled.p`
  color: var(--gray40, #818181);
  text-align: center;
  font-size: 20px;
  font-weight: 400;
`;

const Number = styled(Arrow)``;

const SelectNumber = styled(Arrow)`
  color: var(--brown40, #542f1a);
  text-align: center;
  font-size: 30px;
  font-family: 'Actor', sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const PagiNation = ({
  pageCount,
  currentPage,
  onPageChange,
  selectPageNumber,
  sort,
  totalPages,
}) => {
  const [start, setStart] = useState(1); // 시작 페이지 //1
  const noPrev = start === 1; // 이전 페이지가 없는 경우
  const noNext = start + pageCount - 1 >= totalPages; // 다음 페이지가 없는 경우

  useEffect(() => {
    if (currentPage >= start + pageCount) setStart(prev => prev + pageCount);
    if (currentPage < start) setStart(prev => prev - pageCount);
  }, [currentPage, pageCount, start]);

  const handleClick = page => {
    onPageChange(page);
  };

  return (
    <PaigeNation>
      {noPrev === false && (
        <PageBox
          onClick={() => handleClick(currentPage - 1)}
          to={`?page=${start - 1}&sort=${sort}`}
        >
          <Arrow>{'<'}</Arrow>
        </PageBox>
      )}
      {[...Array(pageCount)].map(
        (page, index) =>
          start + index <= totalPages && (
            <PageBox
              key={start + index}
              to={`?page=${start + index}&sort=${sort}`}
              onClick={() => handleClick(start + index)}
            >
              {+selectPageNumber === start + index ? (
                <SelectNumber>{start + index}</SelectNumber>
              ) : (
                <Number>{start + index}</Number>
              )}
            </PageBox>
          ),
      )}
      {noNext === false && (
        <PageBox
          onClick={() => handleClick(start + pageCount)}
          to={`?page=${start + pageCount}&sort=${sort}`}
        >
          <Arrow>{`>`}</Arrow>
        </PageBox>
      )}
    </PaigeNation>
  );
};

export default PagiNation;
