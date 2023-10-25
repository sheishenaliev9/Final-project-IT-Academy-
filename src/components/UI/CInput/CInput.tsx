import React from 'react'
import styles from './CInput.module.scss';

interface ICInputProps {
    id?: string;
    type: string;
    placeholder?: string;
}

export const CInput: React.FC<ICInputProps> = ({ ...props }) => {
  return (
    <input className={styles.customInput} {...props} />
  )
}
