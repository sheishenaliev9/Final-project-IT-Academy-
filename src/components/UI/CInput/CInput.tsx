import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './CInput.module.scss';

interface ICInputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const CInput = forwardRef<HTMLInputElement, ICInputProps>((props, ref) => {
  return (
    <input className={styles.customInput} ref={ref} {...props} />
  );
});
