import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addCartToTable,
  getOneRestaurant,
  getUserInfo,
  reserveTable,
} from "../../store";
import { CButton, CInput, Loader, TableList } from "../../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICartActions, IReserveTableType } from "../../types/index.type";
import { toast } from "react-toastify";
import { textAnimation } from "../../animation";
import { motion } from "framer-motion";
import styles from "./Booking.module.scss";

export const Booking: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReserveTableType>();
  const { restaurant } = useAppSelector((state) => state.restaurants);
  const { tableNumber, tableId } = useAppSelector((state) => state.tables);
  const { userInfo } = useAppSelector((state) => state.users);
  const { plan, viewbox } = restaurant;

  useEffect(() => {
    window.scrollTo(0, 0);
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
    else if (date === "" || time === "") {
      return toast.error("Выберите время и дату.");
    } else if (tableNumber === 0) {
      return toast.error("Выберите стол для бронирования.");
    }

    dispatch(reserveTable(updatedData));
  };

  const addCartToTableFunc = () => {
    const formData = new FormData();
    formData.append("person_id", "17");
    formData.append("table_id", tableId.toString());
    formData.append("action", "transfer");

    dispatch(addCartToTable(formData as ICartActions));
  };

  if (!plan || !restaurant) return <Loader />;

  return (
    <div className={styles.booking}>
      <div className="container">
        <div className={styles.booking__inner}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            className={styles.booking__title}
          >
            <motion.h1 variants={textAnimation} custom={1}>
              Выбери столик и забронируй!
            </motion.h1>
            <motion.p variants={textAnimation} custom={2}>
              Выберите интересующий вас столик на плане ресторана, затем
              продолжите, чтобы забронировать его.
            </motion.p>
          </motion.div>

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
                    style={{ border: errors.time ? "1px solid red" : "" }}
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
