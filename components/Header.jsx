import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => (
  <div className={styles.header}>
    <Link href="/">
      <a>Go back to home page</a>
    </Link>
  </div>
);

export default Header;
