import React from "react";
import { CButton, CInput } from "../../components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Register.module.scss";

export const Register: React.FC = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className={styles.register}>
      <form className={styles.register__form}>
        <h2>Регистрация</h2>
        <label htmlFor="name">
          <p>Name</p>
          <CInput
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
        </label>

        <label htmlFor="email">
          <p>Email</p>
          <CInput
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
        </label>

        <label htmlFor="phone">
          <p>Phone</p>
          <CInput
            id="phone"
            type="number"
            placeholder="Enter your phone"
            {...register("number", { required: true })}
          />
        </label>

        <label htmlFor="password">
          <p>Password</p>
          <CInput
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("number", { required: true })}
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
