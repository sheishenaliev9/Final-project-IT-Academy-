import React from "react";
import { CButton, CInput } from "../../components";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks";
import { loginUser } from "../../store";
import { IUserType } from "../../types/index.type";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  // const { userInfo } = useAppSelector((state) => state.users);
  const { register, handleSubmit } = useForm<IUserType>();

  const onSubmit = (values: IUserType) => dispatch(loginUser(values));
  return (
    <div className={styles.login}>
      <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Войти</h2>
        <label htmlFor="name">
          <p>Name</p>
          <CInput
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("username")}
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <CInput
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
        </label>

        <CButton type="submit">Войти</CButton>

        <p className={styles.login__form__subtitle}>
          Если еще нет аккаунта: <Link to="/register">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
};
