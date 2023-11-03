import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getOneRestaurant, getUserInfo, reserveTable } from "../../store";
import styles from "./Booking.module.scss";
import { CButton, CInput, TableList } from "../../components";
import { useForm } from "react-hook-form";

export const Booking: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const { restaurant } = useAppSelector((state) => state.restaurants);
  const { tableNumber, tableId } = useAppSelector((state) => state.tables);
  const { userInfo } = useAppSelector((state) => state.users);
  const { plan, viewbox } = restaurant;

  useEffect(() => {
    dispatch(getOneRestaurant(Number(id)));
    dispatch(getUserInfo());
  }, [dispatch, id]);

  const onSubmit = (values) => {
    const { date, time } = values;

    // Combine date and time and format it as needed
    const dateTimeString = `${date}T${time}:00.000Z`;

    // Update the values before dispatching
    const updatedData = {
      ...values,
      id: tableId,
      reserved_by: userInfo.id,
      reserved_time: dateTimeString,
      is_reserved: true,
      number: Number(tableNumber),
    };

    dispatch(reserveTable(updatedData));
  };

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
              <TableList id={Number(id)} viewbox={viewbox} />
              <img src={plan} alt="" />
            </div>

            <div className={styles.booking__form}>
              <h2>Оформить бронь:</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="number">
                  <p>Телефон:</p>
                  <CInput
                    id="number"
                    type="text"
                    value={tableNumber}
                    placeholder="Номер стола"
                    {...register("number")}
                  />
                </label>
                <label htmlFor="time">
                  <p>Время:</p>
                  <CInput
                    id="time"
                    type="time"
                    placeholder="Желаемое время"
                    {...register("time")}
                  />
                </label>
                <label htmlFor="date">
                  <p>Дата:</p>
                  <CInput
                    id="date"
                    type="date"
                    placeholder="Желаемая дата"
                    {...register("date")}
                  />
                </label>

                <CButton type="submit">Забронировать</CButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
