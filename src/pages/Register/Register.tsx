import React, { useEffect, useState } from "react";
import { CButton, CInput } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { registerUser } from "../../store";
import { IUserType } from "../../types/index.type";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import styles from "./Register.module.scss";

export const Register: React.FC = () => {
  const [eye, setEye] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IUserType>();

  console.log(errorMessage);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (values: IUserType) => {
    try {
      const { payload } = await dispatch(registerUser(values));
      payload && navigate("/login");
  } catch (error) {
      toast.error("Ошибка регистрации");
    }
  };

  return (
    <div className={styles.register}>
      <form className={styles.register__form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Регистрация</h2>
        <label htmlFor="name">
          <p>Имя</p>
          <CInput
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("username", { required: true })}
          />
        </label>

        <label htmlFor="number">
          <p>Телефон</p>
          <CInput
            id="name"
            type="number"
            placeholder="Enter your number"
            {...register("number", { required: true })}
          />
        </label>

        <label htmlFor="email">
          <p>Почта</p>
          <CInput
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
            })}
          />
        </label>

        <div>
          <label htmlFor="password">
            <p>Пароль</p>
            <CInput
              id="password"
              type={eye ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { minLength: 8 })}
            />
            {eye ? (
              <AiOutlineEye onClick={() => setEye(!eye)} />
            ) : (
              <AiOutlineEyeInvisible onClick={() => setEye(!eye)} />
            )}
          </label>
        </div>

        <CButton type="submit">Зарегистрироваться</CButton>

        <p className={styles.register__form__subtitle}>
          Если у вас уже имеется аккаунт: <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};
