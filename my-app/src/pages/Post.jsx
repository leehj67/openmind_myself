import React, { useCallback, useEffect, useRef, useState } from 'react';
import PostBanner from 'components/post/PostBanner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteSubject, getQuestionsById, getSubjectById } from '../api';
import Share from 'components/post/Share';
import Button from 'components/common/Button';
import styled from 'styled-components';
import PostCount from 'components/post/PostCount';
import PostList from 'components/post/PostList';
import useBrowserSize from 'hooks/useBrowserSize';
import ModalContainer from 'components/common/Modal';
import * as Modal from 'components/common/Modal';
import Editor from 'components/common/Editor';
import { useModal } from 'hooks/useModal';
import { useSubject } from 'context/subjectContext';
import { deleteLocalStorage } from 'utils/useLocalStorage';
import Avatar from 'components/common/Face';
import ThemeToggleButton from 'components/common/ThemeToggleButton';
import { useTheme } from 'context/ThemeContext';
import Loading from 'components/common/Loading';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;
  padding: 0 32px 24px;

  @media (max-width: 767px) {
    padding: 0 24px 24px;
  }
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddQuestionButton = styled(Button)`
  position: fixed;
  bottom: 10px;

  @media (max-width: 767px) {
    width: 123px;
  }
`;

const DeleteQuestionButton = styled(Button)`
  @media (max-width: 767px) {
    width: 70px;
    height: 25px;
    font-size: 10px;
  }
`;

const PostModalAvatar = styled(Avatar)``;

const Feed = styled.div`
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#7D6F5F' : '#c7bbb5')};
  border-radius: 16px;
  background-color: var(--feedColor);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const limit = 4;

const Post = () => {
  const [shortUI, setShortUI] = useState(false);
  const [postData, setPostData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const { themeMode, toggleTheme } = useTheme();
  const [subject, setSubject] = useState();
  const { currentSubject, setCurrentSubject } = useSubject();
  const { openModal, handleModalOpen, handleModalClose } = useModal();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { windowWidth } = useBrowserSize();
  const paths = pathname.split('/');
  const isAnswerPage = paths[paths.length - 1] === 'answer';
  const navigate = useNavigate();
  const target = useRef(null);
  let currentQuestionCount = currentSubject.questionCount;

  const callback = entries => {
    if (entries[0].isIntersecting && !isLoading) {
      fetchData(postId, limit, offset);
    }
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(callback, options);

  const fetchData = async (postId, limit, offset) => {
    setIsLoading(true);
    getQuestionsById(postId, limit, offset).then(res => {
      const { results } = res;
      setCount(res.count);
      setPostData([...postData, ...results]);
      setOffset(offset + limit);
      setIsLoading(false);
    });
  };

  const handleUIsize = useCallback(() => {
    if (windowWidth <= 767) {
      setShortUI(true);
      return;
    } else {
      setShortUI(false);
    }
  }, [windowWidth]);

  const handleDelete = () => {
    deleteLocalStorage(postId);
    deleteSubject(postId).then(() => navigate('/list?page=1&sort=createdAt'));
  };

  useEffect(() => {
    if (target.current && count > offset) observer.observe(target.current);
    return () => observer.disconnect();
  }, [observer]);

  useEffect(() => {
    fetchData(postId, limit, offset);
  }, [postId, limit]);

  useEffect(() => {
    getSubjectById(postId).then(setCurrentSubject);
  }, [postId, setCurrentSubject]);

  useEffect(() => {
    handleUIsize();
  }, [handleUIsize]);

  useEffect(() => {
    const fetchSubject = async () => {
      const subject = await getSubjectById(postId);
      setSubject(subject);
    };
    fetchSubject();
  }, [postId]);

  if (!subject) return <div></div>;

  return (
    <>
      <ThemeToggleButton toggle={toggleTheme} mode={themeMode} />
      {openModal && (
        <ModalContainer
          width={612}
          height={454}
          title="질문을 작성하세요"
          onClick={handleModalClose}
        >
          <Modal.ToQuestionBox>
            To.
            <PostModalAvatar
              imageSrc={subject.imageSource}
              width="28"
              height="28"
            />
            <Modal.TextStyle>{subject.name}</Modal.TextStyle>
          </Modal.ToQuestionBox>
          <Editor
            placeholder="질문을 입력해주세요"
            width={shortUI ? 279 : 530}
            height={shortUI ? 358 : 180}
            ModalClose={handleModalClose}
            setPostData={setPostData}
          />
        </ModalContainer>
      )}
      <PostBanner
        userProfileImage={subject.imageSource}
        userName={subject.name}
      />
      <PostContainer>
        <Share />
        {isAnswerPage && (
          <StyledButtonDiv>
            <DeleteQuestionButton
              varient="floating"
              width={100}
              height={35}
              onClick={handleDelete}
            >
              삭제하기
            </DeleteQuestionButton>
          </StyledButtonDiv>
        )}
        <Feed theme={themeMode}>
          <PostCount questionCount={subject.questionCount} />
          <PostList postData={postData} setPostData={setPostData} />
          {isLoading && <Loading />}
        </Feed>
        {!isAnswerPage && (
          <StyledButtonDiv>
            <AddQuestionButton
              varient="floating"
              width={208}
              onClick={() => {
                handleModalOpen();
              }}
            >
              {shortUI ? '질문작성' : '질문 작성하기'}
            </AddQuestionButton>
          </StyledButtonDiv>
        )}
      </PostContainer>
      <div ref={target}></div>
    </>
  );
};

export default Post;
