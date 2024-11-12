import Image from 'next/image';
import { AccountCircle } from '@mui/icons-material'; // MUI icon for user
import Logo from '@/public/663da608e79463f8b60cda7f_logo-h-text.svg';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.headerStyle}>
      {/* Logo on the left */}
      <div className={styles.logoContainerStyle}>
        <Image src={Logo} alt="minimi-logo" />
      </div>

      {/* Content aligned to the right */}
      <div className={styles.rightContainerStyle}>
        {/* Dashboard text */}
        <span className={styles.dashboardTextStyle}>Dashboard</span>
        
        {/* Pipe separator */}
        <span className={styles.pipeSeparatorStyle}> | </span>

        {/* User Icon and Name */}
        <div className={styles.userContainerStyle}>
          <AccountCircle className={styles.userIconStyle} />
          {/** Name must be dynamic */}
          <span className={styles.userNameStyle}>John Doe</span>
        </div>
      </div>
    </div>
  );
};

