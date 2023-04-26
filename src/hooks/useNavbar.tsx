import { type ReactNode, createContext, useState, useContext } from 'react';

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

  const showNavbar = () => setNavbarVisibility(true);
  const hideNavbar = () => setNavbarVisibility(false);
  const toggleNavbar = () => setNavbarVisibility((prev) => !prev);

  return (
    <NavbarContext.Provider
      value={{ isNavbarShown, showNavbar, hideNavbar, toggleNavbar }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);

  if (context === null || context === undefined) {
    throw new Error('useNavbar must be used within the NavbarProvider');
  }

  return context;
};
