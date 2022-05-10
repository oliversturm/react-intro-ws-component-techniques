import { memo } from 'react';
import styles from './Button.module.css';

const Button = ({ children, type = 'default', onClick }) => {
  // Do something crazy with the `type` prop just to freak
  // out TypeScript fans. ;-)
  return (
    <div
      className={styles[type]}
      style={typeof type === 'object' ? type : {}}
      onClick={onClick}
    >
      {children || 'This button has no content'}
    </div>
  );
};

export default memo(Button);
