import {
  type ReactNode,
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';

type NavbarProvideProps = {
  children: ReactNode;
};

const NavbarContext = createContext<{
  isNavbarShown: boolean;
  showNavbar: () => void;
  hideNavbar: () => void;
  toggleNavbar: () => void;
} | null>(null);

export const NavbarProvider = (props: NavbarProvideProps) => {
  const { children } = props;

  const [isNavbarShown, setNavbarVisibility] = useState(false);

  const showNavbar = useCallback(() => setNavbarVisibility(true), []);
  const hideNavbar = useCallback(() => setNavbarVisibility(false), []);
  const toggleNavbar = useCallback(
    () => setNavbarVisibility((prev) => !prev),
    [],
  );

  const value = useMemo(
    () => ({
      isNavbarShown,
      showNavbar,
      hideNavbar,
      toggleNavbar,
    }),
    [isNavbarShown, showNavbar, hideNavbar, toggleNavbar],
  );

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);

  if (context === null || context === undefined) {
    throw new Error('useNavbar must be used within the NavbarProvider');
  }

  return context;
};
