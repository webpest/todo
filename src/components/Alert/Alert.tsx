import React from 'react';
import styles from './Alert.module.css';

type Props = {
  children: React.ReactNode;
  type?: 'error' | 'success';
};

const Alert: React.FC<Props> = ({ children, type = 'error' }) => {
  const bgColor = type === 'error' ? 'red' : 'green';

  return (
    <div className={styles.alert} style={{ backgroundColor: bgColor }}>
      {children}
    </div>
  );
};

export default Alert;
