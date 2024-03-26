const findKeyByValue = (object, name) => {
  return Object.keys(object).find(key => object[key] === name);
};

const existKeyById = (object, id) => {
  return Object.keys(object).includes(id);
};

// id 로컬스토리지에 저장하는 함수
export const setLocalStorage = (id, name) => {
  // localStorage에 user property 값이 없을 때,
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({ [id]: name }));
  } else {
    // localStorage에 user property 값이 있을 때,
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('user')),
        [id]: name,
      }),
    );
  }
};

// user name으로 로컬스토리지에 저장된 id 가져오는 함수
export const getLocalStorage = name => {
  const userInfo = localStorage.getItem('user');
  let userId;
  if (!userInfo) {
    // localStorage의 user property가 null 값일 때
    userId = '';
  } else {
    // localStorage의 user property에 값이 있을 때
    const parsedInfo = JSON.parse(userInfo);
    userId = findKeyByValue(parsedInfo, name)
      ? findKeyByValue(parsedInfo, name)
      : null;
  }
  return userId;
};

// id값을 이용해 로컬스토리지에 저장된 id를 삭제
export const deleteLocalStorage = id => {
  const userObject = { ...JSON.parse(localStorage.getItem('user')) };
  delete userObject[id];

  //결과가 빈배열이라면
  if (Object.keys(userObject).length === 0) {
    localStorage.removeItem('user');
  } else {
    localStorage.setItem('user', JSON.stringify(userObject));
  }
};

export const checkLocalStorageById = id => {
  const userInfo = localStorage.getItem('user');
  let userId;
  if (!userInfo) {
    // localStorage의 user property가 null 값일 때
    userId = false;
  } else {
    // localStorage의 user property에 값이 있을 때
    const parsedInfo = JSON.parse(userInfo);
    userId = existKeyById(parsedInfo, id);
  }
  return userId;
};

// 좋아요 정보를 로컬스토리지에 저장하는 함수
export const setLikeLocalStorage = id => {
  // localStorage에 like property 값이 없을 때,
  if (!localStorage.getItem('like')) {
    localStorage.setItem('like', JSON.stringify([id]));
  } else {
    // localStorage에 like property 값이 있을 때,
    localStorage.setItem(
      'like',
      JSON.stringify([...JSON.parse(localStorage.getItem('like')), id]),
    );
  }
};

// 싫어요 정보를 로컬스토리지에 저장하는 함수
export const setDislikeLocalStorage = id => {
  // localStorage에 dislike property 값이 없을 때,
  if (!localStorage.getItem('dislike')) {
    localStorage.setItem('dislike', JSON.stringify([id]));
  } else {
    // localStorage에 dislike property 값이 있을 때,
    localStorage.setItem(
      'dislike',
      JSON.stringify([...JSON.parse(localStorage.getItem('dislike')), id]),
    );
  }
};
