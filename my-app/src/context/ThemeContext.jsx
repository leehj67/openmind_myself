import { createContext, useCallback, useContext, useState } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'theme/theme';

const ThemeContext = createContext({
  themeMode: 'light',
  setThemeMode: () => {},
});

const ThemeContextProvider = ({ children }) => {
  const LocalTheme = window.localStorage.getItem('theme') || 'light';
  const [themeMode, setThemeMode] = useState(LocalTheme);
  const themeObject = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    if (themeMode === 'light') {
      setThemeMode('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      setThemeMode('light');
      window.localStorage.setItem('theme', 'light');
    }
  }, [themeMode]);

  return { themeMode, toggleTheme };
};

export { ThemeContextProvider, useTheme };
