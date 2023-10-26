import React, { useState } from "react";
import { CButton, CInput } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks";
import { loginUser } from "../../store";
import { IUserType } from "../../types/index.type";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./Login.module.scss";

export const Login: React.FC = () => {
  const [eye, setEye] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const { userInfo } = useAppSelector((state) => state.users);
  const { register, handleSubmit } = useForm<IUserType>();
  const navigate = useNavigate();

  const onSubmit = (values: IUserType) => {
    dispatch(loginUser(values));

    if (localStorage.getItem("token")) {
      navigate(`/profile`);
    }
  };
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
        <div>
          <label htmlFor="password">
            <p>Password</p>
            <CInput
              id="password"
              type={eye ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
            />
            {eye ? (
              <AiOutlineEye onClick={() => setEye(!eye)} />
            ) : (
              <AiOutlineEyeInvisible onClick={() => setEye(!eye)} />
            )}
          </label>
        </div>

        <CButton type="submit">Войти</CButton>

        <p className={styles.login__form__subtitle}>
          Если еще нет аккаунта: <Link to="/registration">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
};
