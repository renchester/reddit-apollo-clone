import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ContextType = {
  preferredSort: 'new' | 'popular';
  setPreferredSort: React.Dispatch<React.SetStateAction<'new' | 'popular'>>;
};

type PreferredSortProviderProps = {
  children: ReactNode;
};

const PreferredSortContext = createContext<ContextType | null>(null);

const getPreferredSortFromStorage = () => {
  const storedPreference = window.localStorage.getItem('RedditPreferredSort');

  if (storedPreference !== undefined && storedPreference !== null) {
    return JSON.parse(storedPreference) as 'new' | 'popular';
  }

  return null;
};

export const PreferredSortProvider = (props: PreferredSortProviderProps) => {
  const { children } = props;
  const [preferredSort, setPreferredSort] = useState<'new' | 'popular'>(
    'popular',
  );

  useEffect(() => {
    const storedPreference = getPreferredSortFromStorage();

    if (storedPreference !== null) {
      setPreferredSort(storedPreference);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      'RedditPreferredSort',
      JSON.stringify(preferredSort),
    );
  }, [preferredSort]);

  const value = useMemo(
    () => ({ preferredSort, setPreferredSort }),
    [preferredSort, setPreferredSort],
  );

  return (
    <PreferredSortContext.Provider value={value}>
      {children}
    </PreferredSortContext.Provider>
  );
};

export const usePreferredSort = () => {
  const context = useContext(PreferredSortContext);

  if (context === null || context === undefined) {
    throw new Error(
      'usePreferredSort must be used within the PreferredSortProvider',
    );
  }

  return context;
};
