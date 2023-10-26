import React, { useEffect } from "react";
import styles from "./Profile.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RxAvatar } from "react-icons/rx";
import { getUserInfo } from "../../store";
import { CButton } from "../../components";
import { useNavigate } from "react-router";

export const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.users);
  const { name, number, photo, email } = userInfo;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/registration");
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <div className={styles.profile}>
      <div className="container">
        <div className={styles.profile__inner}>
          <div className={styles.profile__user}>
            <h2>Профиль</h2>

            <div className={styles.profile__avatar}>
              {photo ? <img src={photo} alt="" /> : <RxAvatar />}
            </div>

            <div className={styles.profile__title}>
              <h3>Имя: {name}</h3>
              <p>Почта: {email}</p>
              <p>Телефон: {number}</p>
            </div>

            <div className={styles.profile__actions}>
              <CButton>Редактировать</CButton>
              <CButton onClick={handleLogOut}>Выйти</CButton>
            </div>
          </div>

          <div className={styles.profile__order}>
            <h2>Ваш заказ</h2>
            <h3>На данный момент нет брони</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
