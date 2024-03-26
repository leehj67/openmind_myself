import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Button from 'components/common/Button';
import * as Icons from 'components/common/Icons';
import { postQuestionsReaction } from '../../api';
import {
  setDislikeLocalStorage,
  setLikeLocalStorage,
} from 'utils/useLocalStorage';

const ButtonsContainer = styled.div`
  display: flex;
  gap: 32px;
  border-top: 1px solid var(--gray40ToGray20);
  padding-top: 32px;
`;

const LikeButton = styled(Button)`
  display: flex;
  gap: 6px;
  align-items: center;
  color: ${({ $clicked }) =>
    $clicked ? 'var(--blue)' : 'var(--gray40ToGray20)'};
`;

const Reactions = ({ qnaData }) => {
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const [like, setLike] = useState(qnaData.like);
  const [dislike, setDisLike] = useState(qnaData.dislike);

  const handleLike = () => {
    if (!likeClicked) {
      postQuestionsReaction(qnaData.id, 'like');
      setLikeLocalStorage(qnaData.id);
      setLikeClicked(true);
      setLike(prev => prev + 1);
    }
  };

  const handleDislike = () => {
    if (!dislikeClicked) {
      postQuestionsReaction(qnaData.id, 'dislike');
      setDislikeLocalStorage(qnaData.id);
      setDislikeClicked(true);
      setDisLike(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem('like') &&
      localStorage.getItem('like').includes(qnaData.id)
    ) {
      setLikeClicked(true);
    }
    if (
      localStorage.getItem('dislike') &&
      localStorage.getItem('dislike').includes(qnaData.id)
    ) {
      setDislikeClicked(true);
    }
  }, []);

  if (!qnaData) return <></>;
  return (
    <ButtonsContainer>
      <LikeButton varient="icon" onClick={handleLike} $clicked={likeClicked}>
        <Icons.ThumbsUp $clicked={likeClicked} />
        좋아요 {like}
      </LikeButton>
      <LikeButton
        varient="icon"
        onClick={handleDislike}
        $clicked={dislikeClicked}
      >
        <Icons.ThumbsDown $clicked={dislikeClicked} />
        싫어요 {dislike}
      </LikeButton>
    </ButtonsContainer>
  );
};

export default Reactions;
