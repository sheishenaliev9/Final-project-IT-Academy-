import React from "react";
import styles from "./Register.module.scss";
import { CButton, CInput } from "../../components";
import { Link } from "react-router-dom";

export const Register: React.FC = () => {
  return (
    <div className={styles.register}>
      <form className={styles.register__form}>
        <h2>Регистрация</h2>
        <label htmlFor="name">
          <p>Name</p>
          <CInput id="name" type="text" placeholder="Enter your name" />
        </label>

        <label htmlFor="email">
          <p>Email</p>
          <CInput id="email" type="email" placeholder="Enter your email" />
        </label>

        <label htmlFor="password">
          <p>Password</p>
          <CInput
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </label>

        <CButton>Зарегистрироваться</CButton>

        <p className={styles.register__form__subtitle}>
          Если у вас уже имеется аккаунт: <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};
