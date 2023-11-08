import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Loader } from "../../components";
import { IRestaurantType } from "../../types/index.type";
import { getRestaurants } from "../../store/actions/restaurantsActions";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { textAnimation } from "../../animation";
import styles from "./Restaurants.module.scss";
import { motion } from "framer-motion";

export const Restaurants: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurants } = useAppSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  if (!restaurants) return <Loader />;

  return (
    <div className={styles.restaurants}>
      <div className="container">
        <div className={styles.restaurants__inner}>
          <motion.div
            className={styles.restaurants__title}
            initial="hidden"
            whileInView="visible"
          >
            <motion.h1 variants={textAnimation} custom={1}>
              Все рестораны
            </motion.h1>
            <motion.p variants={textAnimation} custom={2}>
              Выбери ресторан и забронируй столик!
            </motion.p>
          </motion.div>
          <div className={styles.restaurants__list}>
            {restaurants ? (
              restaurants.map((restaurant) => (
                <RestaurantItem key={restaurant.id} item={restaurant} />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface IRestaurantItemProps {
  item: IRestaurantType;
}

export const RestaurantItem: React.FC<IRestaurantItemProps> = ({ item }) => {
  const { name, photo_1, description, address, tables, id, available_tables } =
    item;
  return (
    <Link to={`/restaurants/${id}`}> 
    <div className={styles.restaurant}>
      <div className={styles.restaurant__info}>
        <div className={styles.info__image}>
          <img src={photo_1} alt={name} />
        </div>
        <div className={styles.info__title}>
          <h3>{name}</h3>
          <p>
            Описание: <span>{description}</span>
          </p>
          <p>
            Адресс: <span>{address}</span>
          </p>
          <p>
            Кол-во столов: <span>{tables}</span>
          </p>
          <p>
            Свободные столы: <span>{available_tables}</span>
          </p>
        </div>
      </div>
      <div className={styles.restaurant_actions}>
        <Link to={`/restaurants/${id}`}>
          <AiOutlineArrowRight />
        </Link>
      </div>
    </div>
    </Link>
  );
};
