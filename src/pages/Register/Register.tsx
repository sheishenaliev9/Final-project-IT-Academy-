import React, { useEffect } from "react";
import { CButton, CInput } from "../../components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks";
import styles from "./Register.module.scss";
import { registerUser } from "../../store";
import { IUserType } from "../../types/index.type";

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.users);
  // const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IUserType>();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // navigate("/");
    }
  }, [userInfo]);

  const onSubmit = (values: IUserType) => dispatch(registerUser(values));

  return (
    <div className={styles.register}>
      <form className={styles.register__form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Регистрация</h2>
        <label htmlFor="name">
          <p>Name</p>
          <CInput
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("username", { required: true })}
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

        <label htmlFor="number">
          <p>Phone</p>
          <CInput
            id="number"
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
            {...register("password")}
          />
        </label>

        <CButton type="submit">Зарегистрироваться</CButton>

        <p className={styles.register__form__subtitle}>
          Если у вас уже имеется аккаунт: <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};
