import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RxAvatar } from "react-icons/rx";
import {
  cancelReservedTable,
  editPerson,
  getOneRestaurant,
  getTables,
  getUserInfo,
  setReservedTables,
} from "../../store";
import { Loader } from "../../components";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { IPersonType, ITableType } from "../../types/index.type";
import { HiOutlineLogout, HiMail } from "react-icons/hi";
import { BsCheck, BsFillKeyFill, BsTelephoneFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IPersonType>();
  const { userInfo, tables } = useAppSelector((state) => ({
    userInfo: state.users.userInfo,
    tables: state.tables.reservedTables,
  }));

  const { name, number, email, id, user, tg_code } = userInfo;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/registration");
  };

  const handleChangeData = (values: IPersonType) => {
    const dataToSend = { ...values, user };

    dispatch(editPerson({ newData: dataToSend, id }));
    setIsDisabled(!isDisabled);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      await dispatch(getUserInfo());
      await dispatch(getTables());

      dispatch(setReservedTables(id));
    };

    setValue("name", name);
    setValue("email", email);
    setValue("number", number);
    fetchUserInfo();
  }, [dispatch, name, email, number, setValue, id]);

  if (!userInfo) return <Loader />;

  return (
    <div className={styles.profile}>
      <div className="container">
        <div className={styles.profile__inner}>
          <div className={styles.profile__inner__title}>
            <h1>Профиль</h1>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            className={styles.profile__block}
          >
            <div className={styles.profile__user}>
              <div className={styles.profile__avatar}>
                <RxAvatar size={106} />
              </div>

              <div className={styles.profile__info}>
                <input
                  type="text"
                  defaultValue={name}
                  disabled={isDisabled}
                  {...register("name")}
                />
                <div>
                  <HiMail />
                  <input
                    type="email"
                    defaultValue={email}
                    disabled={isDisabled}
                    {...register("email")}
                  />
                </div>
                <div>
                  <BsTelephoneFill />
                  <input
                    type="text"
                    defaultValue={number ? number : "###-###-###"}
                    disabled={isDisabled}
                    {...register("number")}
                  />
                </div>

                <p className={styles.profile__info__code}>
                  <BsFillKeyFill />
                  <span>{tg_code ? tg_code : "похоже вам не выдали код"}</span>
                </p>
              </div>

              <div className={styles.profile__actions}>
                {isDisabled ? (
                  <button onClick={() => setIsDisabled(!isDisabled)}>
                    Редактировать <BiEditAlt />
                  </button>
                ) : (
                  <button onClick={handleSubmit(handleChangeData)}>
                    Сохранить <BsCheck />
                  </button>
                )}
                <button onClick={handleLogOut}>
                  Выйти <HiOutlineLogout />
                </button>
              </div>
            </div>
            <div className={styles.profile__order}>
              <h2>Зарезервированные столы:</h2>
              <div className={styles.profile__order__list}>
                {tables ? (
                  tables.length > 0 ? (
                    tables.map((table) => (
                      <UserTable key={table.id} table={table} />
                    ))
                  ) : (
                    <h3>В данный момент нет брони</h3>
                  )
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface IUserTable {
  table: ITableType;
}

const UserTable: React.FC<IUserTable> = ({ table }) => {
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((state) => state.restaurants);

  const { name, address } = restaurant;
  const { number, reserved_time, id } = table;

  const dateTimeString = `${reserved_time}`;
  const dateTime = new Date(dateTimeString);
  
  const date = dateTime.toISOString().split("T")[0];
  
  const hours = (dateTime.getHours() < 10 ? '0' : '') + dateTime.getHours().toString();
  const minutes = (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes().toString();
  
  const time = `${hours}:${minutes}`;

  const handleCancelTable = () => {
    const updatedData: ITableType = {
      id,
      reserved_by: null,
      reserved_time: null,
      is_reserved: false,
      number: number,
      restaurant: restaurant.id,
    };

    if (updatedData) {
      toast.success(`стол ${updatedData.number} отменен в ресторане ${name}.`);
      dispatch(cancelReservedTable(updatedData));
    }
  };

  useEffect(() => {
    dispatch(getOneRestaurant(table.restaurant));
  }, [dispatch, table.restaurant]);

  return (
    <div className={styles.profile__order__item}>
      <div>
        <h3>{name}</h3>
        <p>
          <b>Адресс: </b>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              address
            )}`}
            target="blank"
          >
            {address}
          </a>
        </p>
        <p>
          <b>Номер стола:</b> {number}
        </p>
        <p>
          <b>Дата:</b> {date}
        </p>
        <p>
          <b>Время:</b> {time}
        </p>
      </div>

      <div className={styles.profile__order__item__actions}>
        <button onClick={handleCancelTable}>отменить</button>
      </div>
    </div>
  );
};

export { Profile, UserTable };
