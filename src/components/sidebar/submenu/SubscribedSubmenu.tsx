import styles from './Submenu.module.scss';
import SidebarLink from '../SidebarLink';
import SidebarSubmenu from './SidebarSubmenu';
import SidebarListItemAlpha from '../SidebarListItemAlpha';

function SubscribedSubmenu() {
  return (
    <SidebarSubmenu headingTitle="Subscriptions">
      {/* subscriptions.map(sub => sidebarLink) */}

      <ul className={styles.hi}>
        <SidebarListItemAlpha letter="A" />
        <SidebarListItemAlpha letter="B" />
      </ul>
    </SidebarSubmenu>
  );
}
export default SubscribedSubmenu;
