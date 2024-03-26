import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import * as Icons from 'components/common/Icons';
import Button from 'components/common/Button';
import KebabOptions from 'components/post/KebabOptions';
import { useTheme } from 'context/ThemeContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const KebabButton = styled(Button)`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  filter: ${({theme}) => theme === 'dark' ? 'invert(100%) sepia(0%) saturate(1881%) hue-rotate(322deg) brightness(111%) contrast(62%)' : 'none'};

  &:hover {
    border: 1px solid var(--gray30);
    background-color: var(--gray30);
  }
`;

const Kebab = ({
  onEditClick,
  onDeleteQuestionClick,
  onDeleteAnswerClick,
  onRejectClick,
}) => {
  const { themeMode } = useTheme();

  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null); // 컨테이너에 대한 참조를 생성

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  // 케밥 영역 바깥을 선택했을때 케밥옵션 메뉴 표시가 꺼지도록 설정
  useEffect(() => {
    function handleClickOutside(event) {
      // 클릭된 요소가 케밥 영역 바깥이라면 케밥의 옵션을 닫음
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClicked(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container ref={ref}>
      <KebabButton varient="icon" onClick={handleToggle} theme={themeMode}>
        <Icons.Kebab />
      </KebabButton>
      <>
        {/*기존에는 케밥 아이콘만 표시되다가, 케밥 아이콘이 클릭되면 케밥의 옵션들이 나타납니다.*/}
        {isClicked && (
          <KebabOptions
            isClick={isClicked}
            onEditClick={() => {
              onEditClick();
              setIsClicked(false);
            }}
            onDeleteQuestionClick={() => {
              onDeleteQuestionClick();
              setIsClicked(false);
            }}
            onDeleteAnswerClick={() => {
              onDeleteAnswerClick();
              setIsClicked(false);
            }}
            onRejectClick={() => {
              onRejectClick();
              setIsClicked(false);
            }}
          />
        )}
      </>
    </Container>
  );
};

export default Kebab;
