import React from "react";
import { CButton, CInput } from "../../components";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <form className={styles.login__form}>
        <h2>Войти</h2>
        <label htmlFor="name">
          <p>Name</p>
          <CInput id="name" type="text" placeholder="Enter your name" />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <CInput
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </label>

        <CButton>Войти</CButton>

        <p className={styles.login__form__subtitle}>
          Если еще нет аккаунта: <Link to="/register">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
};
