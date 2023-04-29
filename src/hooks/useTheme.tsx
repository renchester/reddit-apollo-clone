import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type ContextType = {
  toggleTheme: () => void;
  setToDarkMode?: () => void;
  setToLightMode?: () => void;
  isDark: boolean;
};

const defaultContext: ContextType = {
  toggleTheme: () => {
    console.warn('Theme should have been overriden');
  },
  isDark: false,
};

const ThemeContext = createContext(defaultContext);

type ThemeProviderProps = {
  children: ReactNode;
};

const getThemeFromStorage = () => {
  const storedTheme = localStorage.getItem('RedditThemeContext');

  if (storedTheme !== undefined && storedTheme !== null) {
    return JSON.parse(storedTheme) as boolean;
  }

  return null;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  const [isDark, setIsDark] = useState(false);

  const setToDarkMode = () => setIsDark(true);
  const setToLightMode = () => setIsDark(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    const storedTheme = getThemeFromStorage();

    if (storedTheme !== null) {
      setIsDark(storedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light').matches
    ) {
      setToLightMode();
    } else {
      setToDarkMode();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('RedditThemeContext', isDark.toString());

    if (isDark) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{ isDark, setToDarkMode, setToLightMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === null || context === undefined) {
    throw new Error('useTheme must be used within the ThemeProvider');
  }

  return context;
};
