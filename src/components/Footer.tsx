import styles from './Footer.module.scss';
import Image from 'next/image';
import githubIcon from '@/assets/img/github-icon.png';

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/renchester"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footer__github}
      >
        <Image
          src={githubIcon}
          alt="Github icon"
          width={20}
          className={styles.footer__icon}
        />
        <p className={styles.footer__dev}>Developed by Renchester Ramos</p>
      </a>
      <small className={styles.footer__copy}>
        &copy; Copyright {new Date().getFullYear()} Renchester Ramos. All rights
        reserved.{' '}
      </small>
    </footer>
  );
}
export default Footer;
