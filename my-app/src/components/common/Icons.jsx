import styled, { css } from 'styled-components';

// 공통 아이콘 크기 정의
const iconSizes = {
  social: css`
    width: 40px;
    height: 40px;
  `,
  thumbs: css`
    width: 16px;
    height: 16px;
  `,
  kebab: css`
    width: 26px;
    height: 26px;
  `,
  edit: css`
    width: 14px;
    height: 14px;
  `,
  delete: css`
    width: 10px;
    height: 10px;
  `,
  answerDelete: css`
    width: 14px;
    height: 14px;
  `,
  rejection: css`
    width: 12px;
    height: 12px;
  `
};

// 공통 아이콘 스타일 정의
const Icon = styled.div`
  background: ${({ iconName }) => `url('/icons/${iconName}.svg')`} no-repeat center;
  ${({ iconType }) => iconSizes[iconType]}
`;

// 필터에 대한 스타일을 조건부로 적용하기 위한 CSS Helper
const filterCSS = css`
  filter: ${({ $clicked }) =>
    $clicked
      ? 'invert(33%) sepia(96%) saturate(1804%) hue-rotate(201deg) brightness(95%) contrast(99%)'
      : 'var(--gray40)'};
`;

// 개별 아이콘 컴포넌트 정의
export const LinkCopy = styled(Icon).attrs({ iconName: 'Link', iconType: 'social' })``;
export const Facebook = styled(Icon).attrs({ iconName: 'Facebook', iconType: 'social' })``;
export const Kakao = styled(Icon).attrs({ iconName: 'Kakao', iconType: 'social' })``;

// ThumbsUp과 ThumbsDown에 filterCSS 적용
export const ThumbsUp = styled(Icon).attrs({ iconName: 'thumbs-up', iconType: 'thumbs' })`${filterCSS}`;
export const ThumbsDown = styled(Icon).attrs({ iconName: 'thumbs-down', iconType: 'thumbs' })`${filterCSS}`;

export const Kebab = styled(Icon).attrs({ iconName: 'More', iconType: 'kebab' })``;
export const Edit = styled(Icon).attrs({ iconName: 'Edit', iconType: 'edit' })``;
export const DeleteQuestion = styled(Icon).attrs({ iconName: 'Delete', iconType: 'delete' })``;
export const DeleteAnswer = styled(Icon).attrs({ iconName: 'AnswerDelete', iconType: 'answerDelete' })``;
export const Rejection = styled(Icon).attrs({ iconName: 'Rejection', iconType: 'rejection' })``;
