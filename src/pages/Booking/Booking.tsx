import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addCartToTable,
  getOneRestaurant,
  getUserInfo,
  reserveTable,
} from "../../store";
import styles from "./Booking.module.scss";
import { CButton, CInput, Loader, TableList } from "../../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ICartActions, IReserveTableType } from "../../types/index.type";

export const Booking: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IReserveTableType>();
  const { restaurant } = useAppSelector((state) => state.restaurants);
  const { tableNumber, tableId } = useAppSelector((state) => state.tables);
  const { userInfo } = useAppSelector((state) => state.users);
  const { plan, viewbox } = restaurant;

  useEffect(() => {
    dispatch(getOneRestaurant(Number(id)));
    dispatch(getUserInfo());
  }, [dispatch, id]);

  const onSubmit: SubmitHandler<IReserveTableType> = (values) => {
    const { date, time } = values;

    const dateTimeString = `${date}T${time}:00.000Z`;

    const updatedData: IReserveTableType = {
      ...values,
      id: tableId,
      reserved_by: userInfo.id,
      reserved_time: dateTimeString,
      is_reserved: true,
      number: Number(tableNumber),
    };

    const token = localStorage.getItem("token");

    if (token === null) return navigate("/registration");

    dispatch(reserveTable(updatedData));
  };

  const addCartToTableFunc = () => {
    const formData = new FormData();
    formData.append("person_id", "17");
    formData.append("table_id", tableId.toString());
    formData.append("action", "transfer");

    if (tableId === 0) {
      toast.error("Выберите стол для бронирования.");
    }

    dispatch(addCartToTable(formData as ICartActions));
  };

  if (!plan || !restaurant) return <Loader />;

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
              <img src={plan} alt="tables map" />
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
              <div className={styles.booking__form__actions}>
                <CButton onClick={addCartToTableFunc}>
                  Добавить блюдо с корзины
                </CButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
