import { getQuestionsById } from 'api';

export const handleAsyncOperation = (operation, postId, onSuccess, onError) => {
  const asyncHandler = () => {
    operation()
      .then(() => getQuestionsById(postId))
      .then(res => {
        const { results, count } = res;
        onSuccess(results, count);
      })
      .catch(error => {
        console.error('오류가 발생했습니다:', error);
        onError(error);
      });
  };

  return asyncHandler;
};
