import { type ReactNode } from 'react';
import styles from './Aside.module.scss';
import ad from '@/assets/img/aside-ad.jpg';
import Image from 'next/image';

type AsideContainerProps = {
  children: ReactNode;
};

function AsideContainer(props: AsideContainerProps) {
  const { children } = props;

  return (
    <div className={styles.aside__container}>
      <div className={styles.aside__adWrapper}>
        <Image
          src={ad}
          alt="Placeholder for advertisement"
          className={styles.aside__ad}
        />
      </div>
      {children}

      <aside className={styles.policy__main}>
        <ul className={styles.policy__list}>
          <li className={styles.policy__link}>User Agreement</li>
          <li className={styles.policy__link}>Privacy Policy</li>
          <li className={styles.policy__link}>Content Policy</li>
          <li className={styles.policy__link}>Code of Conduct</li>
        </ul>
        <ul className={styles.policy__list}>
          <li className={styles.policy__link}>English</li>
          <li className={styles.policy__link}>Deutsch</li>
          <li className={styles.policy__link}>Francais</li>
          <li className={styles.policy__link}>Espanol</li>
          <li className={styles.policy__link}>Italiano</li>
          <li className={styles.policy__link}>Portugues</li>
        </ul>
        <p className={styles.policy__copy}>
          Reddit Apollo Clone &copy; {new Date().getFullYear()}. All rights
          reserved.{' '}
        </p>
      </aside>
    </div>
  );
}
export default AsideContainer;
