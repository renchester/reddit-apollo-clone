import styles from './MasterLayout.module.scss';
import { type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import SidebarNav from '@/components/sidebar/SidebarNav';
import { useNavbar } from '@/hooks/useNavbar';

type MasterLayoutProps = {
  children: ReactNode;
};

function MasterLayout(props: MasterLayoutProps) {
  const { children } = props;
  const { isNavbarShown } = useNavbar();

  return (
    <div className={styles.layout__master}>
      <AnimatePresence>{isNavbarShown && <SidebarNav />}</AnimatePresence>
      {children}
    </div>
  );
}
export default MasterLayout;
