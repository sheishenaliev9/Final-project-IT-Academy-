import React, { FormEvent } from "react";
import styles from "./CButton.module.scss";

interface ICButtonProps {
  children: React.ReactNode;
  type?: "submit";
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
}

export const CButton: React.FC<ICButtonProps> = ({ children, ...props }) => {
  return (
    <button className={styles.customButton} {...props}>
      {children}
    </button>
  );
};
