import styles from './Aside.module.scss';

type AsideTemplateProps = {
  title: string;
  description?: string;
};

function AsideTemplate(props: AsideTemplateProps) {
  const { title, description } = props;

  return (
    <aside className={styles.aside__main}>
      <h2 className={styles.aside__heading}>{title}</h2>
      <p className={styles.aside__description}>{description}</p>
    </aside>
  );
}

export default AsideTemplate;
