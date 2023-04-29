import styles from './Menu.module.scss';

type MenuButtonProps = {
  icon: string;
  text: string;
  label: string;
  handler?: (e?: any) => void;
};

function MenuButton(props: MenuButtonProps) {
  const { icon, text, handler, label } = props;

  return (
    <li className={styles.menu__listItem} role="menuitem">
      <button
        type="button"
        className={styles.menu__button}
        onClick={handler}
        aria-label={label}
        aria-haspopup
      >
        <i
          className={`material-symbols-outlined ${styles.menu__icon}`}
          aria-hidden
        >
          {icon}
        </i>
        <span className={styles.menu__btnText}>{text}</span>
      </button>
    </li>
  );
}
export default MenuButton;
