import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RxAvatar } from "react-icons/rx";
import { editPerson, getUserInfo } from "../../store";
import { CButton, Loader } from "../../components";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { IPersonType } from "../../types/index.type";
import { HiOutlineLogout, HiMail } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";
import styles from "./Profile.module.scss";

export const Profile: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IPersonType>();
  const { userInfo } = useAppSelector((state) => state.users);
  const { name, number, photo, email, id, user } = userInfo;

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
    };

    setValue("name", name);
    setValue("email", email);
    setValue("number", number);
    fetchUserInfo();
  }, [dispatch, name, email, number, setValue]);

  if (!name || !number) {
    return <Loader />;
  }

  return (
    <div className={styles.profile}>
      <div className="container">
        <div className={styles.profile__inner}>
          <div className={styles.profile__inner__title}>
            <h1>Профиль</h1>
          </div>
          <div className={styles.profile__block}>
            <div className={styles.profile__user}>
              <div className={styles.profile__avatar}>
                {photo ? <img src={photo} alt="" /> : <RxAvatar size={106} />}
              </div>

              <div className={styles.profile__info}>
                <input
                  type="text"
                  defaultValue={name}
                  disabled={isDisabled}
                  {...register("name")}
                />
                <div>
                  <BsTelephoneFill />
                  <input
                    type="email"
                    defaultValue={email}
                    disabled={isDisabled}
                    {...register("email")}
                  />
                </div>
                <div>
                  <HiMail />
                  <input
                    type="text"
                    defaultValue={number}
                    disabled={isDisabled}
                    {...register("number")}
                  />
                </div>
              </div>

              <div className={styles.profile__actions}>
                {isDisabled ? (
                  <CButton onClick={() => setIsDisabled(!isDisabled)}>
                    Редактировать
                  </CButton>
                ) : (
                  <CButton onClick={handleSubmit(handleChangeData)}>
                    Сохранить
                  </CButton>
                )}
                <button
                  className={styles.actions__logOut}
                  onClick={handleLogOut}
                >
                  Выйти <HiOutlineLogout />
                </button>
              </div>
            </div>
            <div className={styles.profile__order}>
              <h2>Ваш заказ</h2>
              <h3>На данный момент нет брони</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
