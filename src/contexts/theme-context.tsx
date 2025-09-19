import React, { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = use(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Helper function to determine initial theme
  const getInitialTheme = (): Theme => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem('theme') as Theme | null;

    if (storedTheme) {
      return storedTheme;
    }

    // Check system preference
    const systemPrefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  };

  // Use lazy initial state to avoid calling getInitialTheme on every render
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.classList.toggle('dark', newTheme === 'dark');
  };

  // Apply theme to DOM whenever theme state changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);

  const value: ThemeContextType = useMemo(() => ({
    theme,
    toggleTheme,
    setTheme,
  }), [theme, toggleTheme, setTheme]);

  return (
    <ThemeContext value={value}>
      {children}
    </ThemeContext>
  );
}
