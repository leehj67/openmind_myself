// 현재 접속한 Subject(유저)의 상태를 관리
import React, { createContext, useContext, useState } from 'react';

const SubjectContext = createContext(undefined);

export const SubjectProvider = ({ children }) => {
  const [currentSubject, setCurrentSubject] = useState({
    id: null,
    name: '',
  });

  return (
    <SubjectContext.Provider value={{ currentSubject, setCurrentSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = () => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};
