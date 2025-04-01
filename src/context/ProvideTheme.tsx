import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type themeOptions = 'light' | 'dark';

interface ThemeContextProps {
  theme: themeOptions;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const ProvideTheme = ({ children }: Props) => {
  const [theme, setTheme] = useState<themeOptions>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as themeOptions | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ProvideTheme');
  }

  return context;
};
