import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getOneRestaurant } from "../../store";
import styles from "./Booking.module.scss";
import { CButton, CInput } from "../../components";

export const Booking: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((state) => state.restaurants);
  const { plan } = restaurant;

  useEffect(() => {
    dispatch(getOneRestaurant(Number(id)));
  }, [dispatch, id]);

  return (
    <div className={styles.booking}>
      <div className="container">
        <div className={styles.booking__inner}>
          <div className={styles.booking__title}>
            <h1>Выбери столик и забронируй!</h1>
            <p>Кликни на желаемый столик</p>
          </div>

          <div className={styles.booking__block}>
            <div className={styles.booking__image}>
              <img src={plan} alt="" />
            </div>

            <div className={styles.booking__form}>
              <h2>Оформить бронь:</h2>
              <form action="">
                <label htmlFor="name">
                  <p>Имя:</p>
                  <CInput id="name" type="text" placeholder="Ваше имя" />
                </label>
                <label htmlFor="phone">
                <p>Имя:</p>
                  <CInput id="phone" type="text" placeholder="Ваш номер телефона" />
                </label>
                <label htmlFor="time">
                <p>Время:</p>
                  <CInput id="time" type="time" placeholder="Желаемое время" />
                </label>

                <CButton>Забронировать</CButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
